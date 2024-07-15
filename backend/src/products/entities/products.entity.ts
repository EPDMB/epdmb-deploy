import { ApiHideProperty } from '@nestjs/swagger';
import { Seller } from '../../sellers/sellers.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ProductStatus } from '../enum/productStatus.enum';
import { ProductRequest } from './productRequest.entity';
import { FairCategory } from 'src/fairs/entities/fairCategory.entity';


@Entity({ name: 'products'})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string = uuid()

  @Column()
  brand: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  size: string;

  @Column()
  photoUrl: string;

  @Column({default: false})
  liquidation: boolean;

  @Column()
  code: string;

  @Column({default: ProductStatus.PENDINGVERICATION})
  status: ProductStatus;

  @Column({default: 'sin categoria'})
  category: string;

  @ManyToOne(() => Seller, seller => seller.products)
  @JoinColumn()
  seller: Seller;

  @ManyToOne(() => ProductRequest, productRequest => productRequest.products)
  @JoinColumn()
  productRequest: ProductRequest;

  @ManyToOne(() => FairCategory, fairCategory => fairCategory.products )
  @JoinColumn()
  fairCategory: FairCategory

}