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

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Seller, Product, SKU])
    ],
    controllers: [SellerController],
    providers: [SellerService, SellerRepository, UserRepository]
})
export class SellerModule {}
