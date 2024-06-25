import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { SKU } from './entities/SKU.entity';
import { Seller } from '../sellers/sellers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, SKU, Seller])],
  controllers: [ProductsController],
  providers: [ProductsRepository, ProductsService],
})
export class ProductsModule {}
