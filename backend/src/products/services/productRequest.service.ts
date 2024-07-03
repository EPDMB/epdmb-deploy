import { Injectable } from '@nestjs/common';
import { CreateProductRequestDto } from '../dtos/createProductRequest.dto';
import { SellerRepository } from '../../sellers/sellers.repository';
import { ProductRequest } from '../entities/productRequest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { UpdateProductRequestDto } from '../dtos/updateProductRequest.dto';

@Injectable()
export class ProductRequestService {

    constructor(private readonly sellerRepository: SellerRepository,
        private readonly productsService: ProductsService,
        @InjectRepository(ProductRequest) private readonly productRequestRepository: Repository<ProductRequest>
    ){}

    async createProductRequest(createProductRequestDto: CreateProductRequestDto) {
        const {seller, products} = createProductRequestDto
        const getseller = await this.sellerRepository.getSellerById(seller.id)
        const productRequest = new ProductRequest
        productRequest.products = products
        productRequest.seller = getseller
        return await this.productRequestRepository.save(productRequest)
    }

    async updateProductRequest(id: string, updateProductRequestDto: UpdateProductRequestDto) {
        const productRequest = await this.productRequestRepository.findOneBy({id})
        productRequest.status = updateProductRequestDto.status
        await this.productRequestRepository.save(productRequest)
        const products = productRequest.products
        const sellerId = productRequest.seller.id
        const fairId = productRequest.fair.id
        if (productRequest.status === 'APPROVED') {
            await this.productsService.createProducts(products, sellerId, fairId)
        }
        return productRequest
    }


}
