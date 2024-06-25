import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductsDto } from './products.dto';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository
    ) {}

    async createProducts(products: ProductsDto[], usuarioId: string): Promise<Product[]> {
        return await this.productsRepository.createProducts(products, usuarioId);
    }

    async getProducts(): Promise<Product[]> {
        return await this.productsRepository.getProducts();
    }
}
