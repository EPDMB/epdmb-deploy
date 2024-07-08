import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from '../sellers/sellers.entity';
import { RegisterSellerDto } from './sellers.dto.js';
import { Role } from '../users/roles/roles.enum';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { FairsRepository } from '../fairs/fairs.repository';
import { SellerFairRegistration } from '../fairs/entities/sellerFairRegistration.entity';
import { CategoryDto } from 'src/categories/categories.dto';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/categories.entity';
import { SellerStatus } from './sellers.enum';
import { FairCategory } from 'src/fairs/entities/fairCategory.entity';

@Injectable()
export class SellerRepository {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
    private readonly userService: UsersService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly fairRepository: FairsRepository,
    @InjectRepository(SellerFairRegistration)
    private readonly sellerFairRegistrationRepository: Repository<SellerFairRegistration>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(FairCategory) private readonly fairCategoryRepository: Repository<FairCategory>,
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
      profile_picture,
    } = sellerData;

    const sellerX = this.sellerRepository.create();
    sellerX.bank_account = sellerData.bank_account;
    sellerX.social_media = sellerData.social_media;
    sellerX.phone = sellerData.phone;
    sellerX.address = sellerData.address;
    sellerX.sku = '';
    await this.sellerRepository.save(sellerX);

    const userRegistered = await this.userService.registerUser({
      name,
      lastname,
      email,
      confirmPassword,
      password,
      dni,
      profile_picture,
      role: Role.SELLER,
    });
    userRegistered.seller = sellerX;
    await this.usersRepository.save(userRegistered);

    const user = await this.userService.findByEmail(email);

    const skuId = user.id[0] + user.id[1];
    const splitname = user.name.split(' ');
    splitname.push(user.lastname);
    const initials = splitname.map((element) => {
      return element[0];
    });
    const joinedInitials = initials.join('');

    sellerX.sku = `${joinedInitials}${skuId}`;
    await this.sellerRepository.save(sellerX);

    return sellerX;
  }

  async registerFair(sellerId: string, fairId: string, fairCategoryId: string) {
    console.log(`registerFair called with sellerId: ${sellerId}, fairId: ${fairId}, fairCategoryId: ${fairCategoryId}`);
    
    const fair = await this.fairRepository.getFairById(fairId);
    console.log(`Fair retrieved:`, fair);
  
    const seller = await this.sellerRepository.findOneBy({ id: sellerId });
    if (!seller) throw new NotFoundException('Vendedor no encontrado');
    console.log(`Seller retrieved:`, seller);
  
    const fairCategory = await this.fairCategoryRepository.findOne({
      where: { id: fairCategoryId },
      relations: ['category'],
    });
    if (!fairCategory) throw new NotFoundException('Categoría no encontrada');  
    console.log(`Fair Category retrieved:`, fairCategory);
  
    // Verificar que la categoría tenga nombre
    if (!fairCategory.category || !fairCategory.category.name) {
      throw new Error('La categoría no tiene nombre');
    }
  
    if (fairCategory.maxSellers == 0) throw new BadRequestException('Categoría llena');
  
    fairCategory.maxSellers -= 1;
    await this.fairCategoryRepository.save(fairCategory);
  
    const sellerRegisted = new SellerFairRegistration();
    sellerRegisted.registrationDate = new Date();
    sellerRegisted.entryFee = fair.entryPriceSeller;
    sellerRegisted.seller = seller;
    sellerRegisted.fair = fair;
    await this.sellerFairRegistrationRepository.save(sellerRegisted);
  
    seller.status = SellerStatus.PENDING;
    await this.sellerRepository.save(seller);
  
    return 'Vendedor registrado correctamente';
  }
  
  
  

  async updateIsVerifySeller(sellerId: string) {
    const seller = await this.getSellerById(sellerId);
    seller.status = SellerStatus.ACTIVE;
    await this.sellerRepository.save(seller);
    return 'Vendedor verificado correctamente';
  }

  async getSellerById(sellerId: string) {
    const seller = this.sellerRepository.findOneBy({ id: sellerId });
    if (!seller) throw new NotFoundException('Vendedor no encontrado');
    return seller;
  }

  async findByPhone(phone: string) {
    return await this.sellerRepository.findOneBy({ phone: phone });
  }

  async updateNoVerifySeller(sellerId: string){
    const seller = await this.getSellerById(sellerId);
    seller.status = SellerStatus.NO_ACTIVE;
    await this.sellerRepository.save(seller);
    return 'Vendedor rechazado correctamente';
  }

  async getSellerByIdWithProducts(sellerId: string){
    const seller = await this.sellerRepository.findOne({where: { id: sellerId }, relations: { products: true } });
    if (!seller) throw new NotFoundException('Vendedor no encontrado');
    return seller;
  }

  async getAllSellers() {
    return await this.sellerRepository.find({ relations: {products: true} });
  }
}
