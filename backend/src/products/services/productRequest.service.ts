import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductRequestDto } from '../dtos/createProductRequest.dto';
import { SellerRepository } from '../../sellers/sellers.repository';
import { ProductRequest } from '../entities/productRequest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Fair } from '../../fairs/entities/fairs.entity';
import { ProductStatus } from '../enum/productStatus.enum';
import { Category } from '../../categories/categories.entity';
import { FairCategory } from '../../fairs/entities/fairCategory.entity';
import { Product } from '../entities/products.entity';
import { StatusProductRequest } from '../enum/statusProductRequest.enum';

@Injectable()
export class ProductRequestService {
  constructor(
    private readonly sellerRepository: SellerRepository,
    private readonly productsService: ProductsService,
    @InjectRepository(ProductRequest)
    private readonly productRequestRepository: Repository<ProductRequest>,
    @InjectRepository(Fair) private readonly fairRepository: Repository<Fair>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(FairCategory)
    private readonly fairCategoryRepository: Repository<FairCategory>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async createProductRequest(createProductRequestDto: CreateProductRequestDto) {
    const { sellerId, products, fairId, category } = createProductRequestDto;
    return await this.productsService.createProducts(products, sellerId, fairId, category);
  }

  async updateProductRequest(id: string, productId: string, status: ProductStatus) {

    const productRequest = await this.productRequestRepository.findOne({where: { id: id },relations: { seller: true, fair: true, products: true }});
    if(!productRequest)throw new BadRequestException(`La solicitud de producto ${id} no existe`);

    const fair = await this.fairRepository.findOne({where: { id: productRequest.fair.id }});
    if(!fair) throw new BadRequestException(`La feria ${productRequest.fair.id} no existe`);

    const product = await this.productsRepository.findOne({where: { id: productId, productRequest: productRequest }});
    if(!product) throw new BadRequestException(`El producto ${productId} no existe`);

    const category = await this.categoryRepository.findOne({where: { name: product.category }});
    if(!category) throw new BadRequestException(`La categoria ${product.category} no existe`);

    const fairCategory = await this.fairCategoryRepository.findOne({where: { fair: fair },relations: { products: true, category: true }});
    if(!fairCategory) throw new BadRequestException(`La categoria ${product.category} no existe en la feria ${productRequest.fair.id}`);

    product.status = status;
    await this.productsRepository.save(product);

    if (product.status === ProductStatus.ACCEPTED) {
      
      if (fairCategory.maxProducts < 1) {
        throw new BadRequestException(`No hay mas cupos de productos para esta categoria`,);
      } else {
        fairCategory.products.push(product);
        fairCategory.maxProducts--;
        await this.fairCategoryRepository.save(fairCategory);
      }
    }

    const allProductsNotPending = productRequest.products.every((product) => product.status !== ProductStatus.PENDINGVERICATION);
    
    if (allProductsNotPending) {
      productRequest.status = StatusProductRequest.CHECKED;
      await this.productRequestRepository.save(productRequest);
    }
  }

  async getAllProductRequest() {
    return await this.productRequestRepository.find({relations: { seller: true, fair: true, products: true }});
  }

  async getProductRequestById(id: string) {
    return await this.productRequestRepository.findOne({where: { id: id },relations: { seller: true, fair: true, products: true }});
  }
}
