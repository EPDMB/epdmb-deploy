import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from '../sellers/sellers.entity';
import { RegisterSellerDto } from './sellers.dto.js';
import { Role } from '../users/roles/roles.enum';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { FairsRepository } from '../fairs/fairs.repository';
import { SellerFairRegistration } from '../fairs/entities/sellerFairRegistration.entity';

@Injectable()
export class SellerRepository {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
    private readonly userService: UsersService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly fairRepository: FairsRepository,
    @InjectRepository(SellerFairRegistration) private readonly sellerFairRegistrationRepository: Repository<SellerFairRegistration>,
  ) {}
  async sellerRegister(
    sellerData: RegisterSellerDto,
  ): Promise<Partial<Seller>> {
    const {
      name,
      lastname,
      email,
      confirmPassword,
      password,
      dni,
      phone,
      address,
      profile_picture,
    } = sellerData;

    const sellerX = this.sellerRepository.create();
    sellerX.bank_account = sellerData.bank_account;
    sellerX.social_media = sellerData.social_media;
    await this.sellerRepository.save(sellerX);

    const userRegistered = await this.userService.registerUser({
      name,
      lastname,
      email,
      confirmPassword,
      password,
      dni,
      // phone,
      // address,
      profile_picture,
      role: Role.SELLER,
    });
    userRegistered.seller = sellerX;
    await this.usersRepository.save(userRegistered);
    return sellerX;
  }

  async registerFair(sellerId: string, fairId: string){
    const fair = await this.fairRepository.getFairById(fairId);

    const seller = await this.sellerRepository.findOneBy({id: sellerId});
    if (!seller) throw new NotFoundException('Vendedor no encontrado');

    const sellerVerify = seller.isVerified;
    if (sellerVerify === false) throw new BadRequestException('Vendedor no autorizado');
    
    const verifedSeller = seller.isVerified;
    if (verifedSeller === false) throw new BadRequestException('Vendedor no autorizado');
    
    if (fair.maxSellers <= 0) throw new BadRequestException('No hay cupos disponibles en la feria');

    const entryFair = fair.entryPrice;

    const sellerRegisted = new SellerFairRegistration()
    sellerRegisted.registrationDate = new Date();
    sellerRegisted.entryFee = entryFair;
    sellerRegisted.seller = seller;
    sellerRegisted.fair = fair;
    await this.sellerFairRegistrationRepository.save(sellerRegisted);

    fair.maxSellers -= 1;
    await this.fairRepository.saveFair(fair);

    return 'Vendedor registrado correctamente';
  }

  async updateIsVerifySeller(sellerId: string){
    const seller = await this.getSellerById(sellerId)
    seller.isVerified = true;
    await this.sellerRepository.save(seller);
    return 'Vendedor verificado correctamente';
  }

  async getSellerById(sellerId: string) {
    const seller = this.sellerRepository.findOneBy({id: sellerId})
    if (!seller) throw new NotFoundException('Vendedor no encontrado');
    return seller
  }

  async findByPhone(phone: string) {
    return await this.sellerRepository.findOneBy({ phone: phone });
  }
}