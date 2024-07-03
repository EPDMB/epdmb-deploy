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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Seller,
      Product,
      SKU,
      Fair,
      UserFairRegistration,
      SellerFairRegistration
    ]),
  ],
  controllers: [],
  providers: [SellerRepository, UsersService, FairsRepository, FairsService, UserRepository],
})
export class SellerModule {}
