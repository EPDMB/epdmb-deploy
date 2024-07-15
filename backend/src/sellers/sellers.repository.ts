import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { Seller } from '../sellers/sellers.entity';
import { RegisterSellerDto } from './sellers.dto.js';
import { Role } from '../users/roles/roles.enum';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { FairsRepository } from '../fairs/fairs.repository';
import { SellerFairRegistration } from '../fairs/entities/sellerFairRegistration.entity';
import { SellerStatus } from './sellers.enum';
import { FairCategory } from 'src/fairs/entities/fairCategory.entity';
import { Fair } from 'src/fairs/entities/fairs.entity';

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
    @InjectRepository(FairCategory)
    private readonly fairCategoryRepository: Repository<FairCategory>,
    @InjectRepository(Fair) private readonly fairRepositoryDB: Repository<Fair>,
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

    sellerX.sku = `${joinedInitials}${skuId}${'-'}`;
    await this.sellerRepository.save(sellerX);

    return sellerX;
  }

  async registerFair(sellerId: string, fairId: string, fairCategoryId: string): Promise<string> {
    try {
        console.log(`registerFair called with sellerId: ${sellerId}, fairId: ${fairId}, fairCategoryId: ${fairCategoryId}`);

        const fair = await this.fairRepositoryDB.findOneBy({ id: fairId });
        if (!fair) {
            throw new NotFoundException('Feria no encontrada');
        }
        if(fair.isActive === false) {
            throw new BadRequestException('Feria cerrada');
        }

        const seller = await this.sellerRepository.findOneBy({id: sellerId});
        if (!seller) {
            throw new NotFoundException('Vendedor no encontrado');
        }

        const fairCategory = await this.fairCategoryRepository.findOne({
            where: { id: fairCategoryId },
            relations: ['category'], 
        });
        if (!fairCategory) {
            throw new NotFoundException('Categoría no encontrada');
        }
        console.log(`Categoría de feria encontrada:`, fairCategory);

        if (!fairCategory.category || !fairCategory.category.name) {
            throw new BadRequestException('La categoría no tiene nombre');
        }

        if (fairCategory.maxSellers <= 0) {
            throw new BadRequestException('Categoría llena');
        }

        // Asignar fairCategory a sellerRegistration.categoryFair
        const sellerRegistration = new SellerFairRegistration();
        sellerRegistration.registrationDate = new Date();
        sellerRegistration.entryFee = fair.entryPriceSeller;
        sellerRegistration.seller = seller;
        sellerRegistration.fair = fair;
        sellerRegistration.categoryFair = fairCategory; // Asignación de fairCategory a categoryFair

        await this.sellerFairRegistrationRepository.save(sellerRegistration);

        console.log(`Vendedor registrado correctamente en la feria:`, sellerRegistration);
        seller.status = SellerStatus.ACTIVE;
        await this.sellerRepository.save(seller);

        return 'Vendedor registrado correctamente';
    } catch (error) {
        if (
            error instanceof NotFoundException ||
            error instanceof BadRequestException
        ) {
            throw error;
        }
        console.log(error);
        throw new Error('Error al registrar vendedor en la feria');
    }
}


  async getSellerById(sellerId: string) {
    const seller = await this.sellerRepository.findOne({
      where: { id: sellerId },
      relations: {
        products: true,
        registrations: {
          fair: true,
          categoryFair: {
            category: true,  
          },
        },
      },
    });
  
    if (!seller) throw new NotFoundException('Vendedor no encontrado');
    return seller;
  }
  

  async findByPhone(phone: string) {
    return await this.sellerRepository.findOneBy({ phone: phone });
  }

  async updateNoVerifySeller(sellerId: string) {
    const seller = await this.getSellerById(sellerId);
    seller.status = SellerStatus.NO_ACTIVE;
    await this.sellerRepository.save(seller);
    return 'Vendedor rechazado correctamente';
  }

  async getSellerByIdWithProducts(sellerId: string) {
    const seller = await this.sellerRepository.findOne({
      where: { id: sellerId },
      relations: { products: true, registrations: { fair: true } },
    });
    if (!seller) throw new NotFoundException('Vendedor no encontrado');
    return seller;
  }

  async getAllSellers() {
    const sellers = await this.sellerRepository.find({
      relations: {
        user: true,
        products: true,
        registrations: {
          fair: true,
          categoryFair: {
            category: true,
          }
        },
      },
    });
    return sellers;
  }
  

  async update(id: string, seller: any) {
    const sellerToUpdate = await this.sellerRepository.findOneBy({ id });
    if (!sellerToUpdate) throw new NotFoundException('Vendedor no encontrado');
    Object.assign(sellerToUpdate, seller);
    return await this.sellerRepository.save(sellerToUpdate);
  }
}
