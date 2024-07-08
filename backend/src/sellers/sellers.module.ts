import { Module } from '@nestjs/common';
import { User } from '../users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerRepository } from './sellers.repository';
import { Seller } from './sellers.entity';
import { Product } from '../products/entities/products.entity';
import { SKU } from '../products/entities/SKU.entity';
import { Fair } from '../fairs/entities/fairs.entity';
import { UserFairRegistration } from '../fairs/entities/userFairRegistration.entity';
import { FairsRepository } from '../fairs/fairs.repository';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { FairsService } from '../fairs/fairs.service';
import { SellerFairRegistration } from '../fairs/entities/sellerFairRegistration.entity';
import { BuyerCapacity } from '../fairs/entities/buyersCapacity.entity';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { Category } from 'src/categories/categories.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { FairDay } from 'src/fairs/entities/fairDay.entity';
import { FairCategory } from 'src/fairs/entities/fairCategory.entity';
import { UserToSellerService } from 'src/users/services/userToSeller.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Seller,
      Product,
      SKU,
      Fair,
      UserFairRegistration,
      SellerFairRegistration,
      BuyerCapacity,
      Category,
      FairDay,
      FairCategory
    ]),
  ],
  controllers: [],
  providers: [SellerRepository, UsersService, FairsRepository, FairsService, UserRepository, CategoriesRepository, CategoriesService, UserToSellerService],
})
export class SellerModule {}
