import { ApiHideProperty } from "@nestjs/swagger";
import { Product } from "../../products/products.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { SellerFairRegistration } from "../../fairs/entities/sellerFairRegistration.entity";
import { PaymentTransaction } from "../../payment_transaction/paymentTransaction.entity";
import { UserFairRegistration } from "./userFairRegistration.entity";

@Entity({ name: 'fair'})
export class Fair{
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

    @Column({ nullable: true })
    entryDescription: string;

    @Column()
    maxSellers: number;
    
    @Column()
    maxBuyers: number;

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
}