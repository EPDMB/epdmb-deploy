import { Module } from '@nestjs/common';
import { SellerController } from './sellers.controller';
import { SellerService } from './sellers.service';
import { User } from '../users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerRepository } from './sellers.repository';
import { Seller } from './sellers.entity';
import { UserRepository } from '../users/users.repository';
import { Product } from '../products/products.entity';
import { SKU } from '../products/entities/SKU.entity';
import { Fair } from '../fairs/fairs.entity';
import { UserFairRegistration } from '../user_fair_registration/userFairRegistration.entity';
import { FairsRepository } from '../fairs/fairs.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Seller, Product, SKU, Fair, UserFairRegistration])
    ],
    controllers: [SellerController],
    providers: [SellerService, SellerRepository, UserRepository, FairsRepository]
})
export class SellerModule { }
