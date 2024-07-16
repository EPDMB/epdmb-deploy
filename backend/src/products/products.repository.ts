import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { Seller } from '../sellers/sellers.entity';
import { ProductsDto } from './dtos/products.dto';
import { UpdateProductDTO } from './dtos/UpdateStatus.dto';
import { Category } from '../categories/categories.entity';
import { Fair } from '../fairs/entities/fairs.entity';
import { SellerFairRegistration } from 'src/fairs/entities/sellerFairRegistration.entity';
import { ProductRequest } from './entities/productRequest.entity';
import { StatusProductRequest } from './enum/statusProductRequest.enum';


@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Fair)
    private readonly fairRepository: Repository<Fair>,
    @InjectRepository(SellerFairRegistration)
    private readonly sellerFairRegistrationRepository: Repository<SellerFairRegistration>,
    @InjectRepository(ProductRequest) private readonly productRequestRepository: Repository<ProductRequest>,
  ) {}

  async createProducts(products: ProductsDto[], sellerId: string, fairId: string, category: string) {

    const seller = await this.sellerRepository.findOne({where: { id: sellerId },relations: { products: true },});
    const productSku = seller?.sku
    const searchFair = await this.fairRepository.findOneBy({ id: fairId });
    if(searchFair.isActive === false) {
      throw new NotFoundException('Feria inactiva');
    }
    const foundCategory = await this.categoryRepository.findOneBy({name: category})
    
    
    const productRequest = new ProductRequest();
    productRequest.seller = seller;
    productRequest.fair = searchFair;
    productRequest.status = StatusProductRequest.PENDING;
    productRequest.category = category;
    
    const sellerActivate = seller.status;
    if (sellerActivate === 'no_active' ) {
      throw new NotFoundException(
        'Vendedor no autorizado a cargar los productos',
      );
    }
    
    // const fairRegistration = await this.sellerFairRegistrationRepository.findOne({where: { seller: seller, fair: searchFair }});
    // if (!fairRegistration) {
      //   throw new NotFoundException('Vendedor no registrado en la feria');
      // }
      
      if (!seller) {
        throw new NotFoundException('Usuario no encontrado');
      }
      
      const arrayProducts: Product[] = [];
      
      for (const product of products) {
        const productEntity = new Product();
        productEntity.brand = product.brand;
        productEntity.description = product.description;
        productEntity.price = product.price;
        productEntity.size = product.size
        productEntity.category = product.category;
        productEntity.liquidation = product.liquidation;
        // LOGICA DEL SKU
        const number = seller.products?.length + 1;
        const newCode = productSku + number;
        // LOGICA DEL SKU
        productEntity.code = newCode;
        const savedProduct = await this.productRepository.save(productEntity);
        seller.products.push(savedProduct)
        await this.sellerRepository.save(seller)
        arrayProducts.push(savedProduct);
        await this.categoryRepository.save(foundCategory);
      }
      productRequest.products = arrayProducts;
      const newProductRequest = await this.productRequestRepository.save(productRequest);
      return newProductRequest.id
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async updateStatus(id: string, updateProduct: UpdateProductDTO) {
    const { status } = updateProduct;
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    product.status = status;
    await this.productRepository.save(product);

    return product;
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }

  async getSellerProducts(sellerId: string) {
    const sellerX = await this.sellerRepository.findOneBy({id:sellerId})
    return await this.productRepository.find({where:{seller:sellerX}})
}
}
