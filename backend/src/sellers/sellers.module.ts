import { Module } from '@nestjs/common';
import { User } from '../users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerRepository } from './sellers.repository';
import { Seller } from './sellers.entity';
import { Product } from '../products/products.entity';
import { SKU } from '../products/entities/SKU.entity';
import { Fair } from '../fairs/entities/fairs.entity';
import { UserFairRegistration } from '../fairs/entities/userFairRegistration.entity';
import { FairsRepository } from '../fairs/fairs.repository';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/users.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Seller, Product, SKU, Fair, UserFairRegistration])
    ],
    controllers: [],
    providers: [SellerRepository, UsersService, FairsRepository, UserRepository],
})
export class SellerModule { }
