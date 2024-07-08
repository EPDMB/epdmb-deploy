import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FairsRepository } from 'src/fairs/fairs.repository';
import { RegisterSellerDto } from 'src/sellers/sellers.dto';
import { Seller } from 'src/sellers/sellers.entity';
import { SellerRepository } from 'src/sellers/sellers.repository';
import { Role } from 'src/users/roles/roles.enum';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class PrechargeService implements OnModuleInit {
    constructor(
        private readonly userService: UsersService,
        private readonly fairRepository: FairsRepository,
        @InjectRepository(Seller) private readonly sellerRepo: Repository<Seller>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) {}
    
    async onModuleInit() {
        await this.sellersPrecharge({
            "name": "Juan",
            "lastname": "Perez",
            "dni": "25293711",
            "email": "juanperez@ejemplo.com",
            "address": "Calle Siempre Viva 123",
            "phone": "1156229166",
            "password": "Password1!",
            "confirmPassword": "Password1!",
            "bank_account": "123456789",
            "social_media": "instagram"
          });
        await this.fairPrecharge();
    }

    async productsPrecharge() {
        
    }

    async sellersPrecharge(
        sellerData: RegisterSellerDto,
      ): Promise<Partial<Seller>> {
        const {name,lastname,email,confirmPassword,password,dni,profile_picture} = sellerData;
    
        const sellerX = this.sellerRepo.create();
        sellerX.bank_account = sellerData.bank_account;
        sellerX.social_media = sellerData.social_media;
        sellerX.phone = sellerData.phone;
        sellerX.address = sellerData.address;
        sellerX.isVerified = true;
        sellerX.sku = '';
        await this.sellerRepo.save(sellerX);
    
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
        userRegistered.status = true;
        await this.userRepo.save(userRegistered);
    
        const user = await this.userService.findByEmail(email);
    
        const skuId = user.id[0] + user.id[1];
        const splitname = user.name.split(' ');
        splitname.push(user.lastname);
        const initials = splitname.map((element) => {
          return element[0];
        });
        const joinedInitials = initials.join('');
    
        sellerX.sku = `${joinedInitials}${skuId}`;
        await this.sellerRepo.save(sellerX);
    
        return sellerX;
      }
    
    
    async buyersPrecharge() {

    }

    async fairPrecharge() {
        await this.fairRepository.createFair({
            "name": "Feria de Verano",
            "address": "Avenida Principal 123",
            "entryPriceBuyer": 100,
            "entryPriceSeller": 1000,
            "entryDescription": "Entrada gratis // lo recaudado es para entidad benéfica ...",
            "fairDays": [
              {
                "day": "Lunes",
                "buyerCapacities": [
                  {
                    "hour": "10:00",
                    "capacity": 100
                  },
                  {
                    "hour": "11:00",
                    "capacity": 150
                  }
                ]
              },
              {
                "day": "Martes",
                "buyerCapacities": [
                  {
                    "hour": "10:00",
                    "capacity": 120
                  },
                  {
                    "hour": "11:00",
                    "capacity": 130
                  }
                ]
              }
            ],
           "category": [
              {"name": "0-12 mujer",
                "maxSellers": 120
              },
               {"name": "0-12 Varon",
                "maxSellers": 120
              }
              ]
          })
    }

}
