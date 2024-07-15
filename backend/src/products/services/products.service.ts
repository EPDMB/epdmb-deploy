import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../products.repository';
import { ProductsDto } from '../dtos/products.dto';
import { Product } from '../entities/products.entity';
import { ProductStatusDescription } from '../enum/productStatus.enum';
import { UpdateProductDTO } from '../dtos/UpdateStatus.dto';

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository
    ) {}

    async createProducts(products: ProductsDto[], sellerId: string, fairId: string, category: string) {
        const pRequestId = await this.productsRepository.createProducts(products, sellerId, fairId, category);
        return {pRequestId}
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

    async getProductById(id: string): Promise<Product> {
        return await this.productsRepository.getProductById(id);
    }
}
