import { ApiHideProperty } from '@nestjs/swagger';
import { Fair } from '../fairs/entities/fairs.entity';
import { Seller } from '../sellers/sellers.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { SKU } from './entities/SKU.entity';
import { ProductStatus } from './enum/productStatus.enum';


@Entity({ name: 'products'})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string = uuid()

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  photoUrl: string;

  @OneToOne(() => SKU, sku => sku.product)
  sku: SKU;

  @Column({default: ProductStatus.AMARILLO})
  status: ProductStatus;

  @ManyToOne(() => Seller, seller => seller.products)
  @JoinColumn()
  seller: Seller;

  @ManyToOne(() => Fair, fair => fair.products)
  @JoinColumn()
  fair: Fair;
}