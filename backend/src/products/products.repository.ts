import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { SKU } from './entities/SKU.entity';
import { Seller } from '../sellers/sellers.entity';
import { ProductsDto } from './dtos/products.dto';
import { UpdateProductDTO } from './dtos/UpdateStatus.dto';
import { FairsService } from '../fairs/fairs.service';
import { SellerFairRegistration } from '../fairs/entities/sellerFairRegistration.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(SKU)
    private readonly skuRepository: Repository<SKU>,
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
    private readonly fairService: FairsService,
    @InjectRepository(SellerFairRegistration) private readonly sellerFairRegistrationRepository: Repository<SellerFairRegistration>,
  ) {}

  async createProducts(products: ProductsDto[], sellerId: string, fairId: string): Promise<Product[]> {
    const user = await this.sellerRepository.findOne({where: {id: sellerId}, relations: {user: true}});
    const fair = await this.fairService.getFairById(fairId);
    const fairRegistration = await this.sellerFairRegistrationRepository.findOne({where: {seller: user, fair: fair}});
    if (!fairRegistration) {
      throw new NotFoundException('Vendedor no autorizado');
    }

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const skuId = user.id[0] + user.id[1]
    const productArray: Product[] = [];
    const splitname = user.user.name.split(' ')
    splitname.push(user.user.lastname)
    const initials = splitname.map((element)=>{
      return element[0]
    } )
    const joinedInitials = initials.join('');

    for (const product of products) {
      const productEntity = new Product();
      productEntity.name = product.name;
      productEntity.description = product.description;
      productEntity.price = product.price;
      productEntity.photoUrl = product.photoUrl;
      productEntity.seller = user;
      productEntity.fair = fair;

      const savedProduct = await this.productRepository.save(productEntity);
      productArray.push(savedProduct);

      const skuCount = await this.skuRepository.count();
      const code = `${joinedInitials+skuId}-${(skuCount + 1).toString().padStart(3, '0')}`;

      const sku = new SKU();
      sku.code = code;
      sku.product = savedProduct;

      await this.skuRepository.save(sku);
    }
    return productArray;
  }


  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find({relations: ['sku']});
  }

  
  async updateStatus(id: string, updateProduct: UpdateProductDTO) {

    const { status } = updateProduct;
    const product = await this.productRepository.findOneBy({id});

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    product.status = status;
    await this.productRepository.save(product);

    return product;
  }
}
