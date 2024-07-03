import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { SellerFairRegistration } from "../../fairs/entities/sellerFairRegistration.entity";
import { PaymentTransaction } from "../../payment_transaction/paymentTransaction.entity";
import { UserFairRegistration } from "./userFairRegistration.entity";
import { Product } from "../../products/entities/products.entity";
import { Category } from 'src/categories/categories.entity';
import { ProductRequest } from 'src/products/entities/productRequest.entity';

@Entity({ name: 'fair' })
export class Fair {
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string = uuid();

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  dateStartFair: Date;

  @Column()
  dateEndFair: Date;

  @Column()
  hourStartFair: number;

  @Column()
  hourEndFair: number;

  @Column()
  entryPrice: number;

  @Column()
  entryDescription: string;

  @Column()
  maxSellers: number;

  @Column()
  maxBuyers: number;

  @Column({ type: 'jsonb', nullable: true })
  buyerCapacities: { hour: number, capacity: number }[];

  @ManyToOne(() => Category , (category) => category.fairs)
  category: Category

  @OneToMany(() => UserFairRegistration, registrations => registrations.fair)
  @JoinColumn()
  userRegistrations: UserFairRegistration[];

  @OneToMany(() => SellerFairRegistration, registrations => registrations.fair)
  @JoinColumn()
  sellerRegistrations: SellerFairRegistration[];

  @OneToMany(() => Product, product => product.fair)
  @JoinColumn()
  products: Product[];

  @OneToMany(() => PaymentTransaction, transaction => transaction.fair)
  @JoinColumn()
  transactions: PaymentTransaction[];

  @OneToMany(()=> ProductRequest, productRequest => productRequest.fair)
  productRequests: ProductRequest[]

}
