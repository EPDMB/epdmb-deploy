import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductsDto } from './products.dto';
import { Product } from './products.entity';
import { ProductStatusDescription } from './enum/productStatus.enum';
import { UpdateProductDTO } from './dtos/UpdateStatus';

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository
    ) {}

    async createProducts(products: ProductsDto[], usuarioId: string): Promise<Product[]> {
        return await this.productsRepository.createProducts(products, usuarioId);
    }

    async getProducts(): Promise<Product[]> {
        
        const products = await this.productsRepository.getProducts();

        return products.map(product => ({
            ...product, 
            statusDescription: ProductStatusDescription[product.status]
          }));
    }

    async updateStatus(id: string, updateProduct: UpdateProductDTO){
        return await this.productsRepository.updateStatus(id, updateProduct);
    }
}
