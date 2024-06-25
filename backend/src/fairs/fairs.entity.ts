import { ApiHideProperty } from "@nestjs/swagger";
import { Product } from "../products/products.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { UserFairRegistration } from "../user_fair_registration/userFairRegistration.entity";
import { SellerFairRegistration } from "../seller_fair_registration/sellerFairRegistration.entity";
import { PaymentTransaction } from "../payment_transaction/paymentTransaction.entity";

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
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    entryFee: number;

    @Column({ nullable: true })
    entryFeeDescription: string;

    @Column()
    maxSellers: number;

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