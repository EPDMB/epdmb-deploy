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
    @InjectRepository(SellerFairRegistration)
    private readonly sellerFairRegistrationRepository: Repository<SellerFairRegistration>,
  ) {}

  async createProducts(
    products: ProductsDto[],
    sellerId: string,
    fairId: string,
  ): Promise<Product[]> {
    const user = await this.sellerRepository.findOne({
      where: { id: sellerId },
      relations: { user: true },
    });

    const fair = await this.fairService.getFairById(fairId);

    //VERFICIAR QUE EL STATUS DEL VENDEDOR ESTE ACTIVE PARA PODER CARGAR LOS PRODUCTOS??
    const sellerActivate = user.user.seller.status;
    if (sellerActivate === 'NO_ACTIVE' || sellerActivate === 'PENDING') {
      throw new NotFoundException('Vendedor no autorizado a cargar los productos');
    }

    const fairRegistration =
      await this.sellerFairRegistrationRepository.findOne({
        where: { seller: user, fair: fair },
      });
    if (!fairRegistration) {
      throw new NotFoundException('Vendedor no registrado en la feria');
    }

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const productArray: Product[] = [];

    for (const product of products) {
      const productEntity = new Product();
      productEntity.name = product.name;
      productEntity.description = product.description;
      productEntity.price = product.price;
      productEntity.photoUrl = product.photoUrl;
      productEntity.seller = user;

      const savedProduct = await this.productRepository.save(productEntity);
      productArray.push(savedProduct);

      const skuCount = await this.skuRepository.count();
      const code = `${user.sku}-${(skuCount + 1).toString().padStart(3, '0')}`;

      const sku = new SKU();
      sku.code = code;
      sku.product = savedProduct;

      await this.skuRepository.save(sku);
    }
    return productArray;
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['sku'] });
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
}
