import { ApiHideProperty } from "@nestjs/swagger";
import { PaymentTransaction } from "../payment_transaction/paymentTransaction.entity";
import { Product } from "../products/products.entity";
import { SellerFairRegistration } from "../fairs/entities/sellerFairRegistration.entity";
import { User } from "../users/users.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';



@Entity({ name: 'sellers'})
export class Seller {
    @PrimaryGeneratedColumn('uuid')
    @ApiHideProperty()
    id: string = uuid()

    @Column({ unique: true })
    bank_account: string

    @Column()
    social_media?: string 

    @OneToOne(()=> User, user => user.seller)
    user: User

    @OneToMany(() => Product, product => product.seller)
    @JoinColumn()
    products: Product[];

    @OneToMany(() => SellerFairRegistration, registration => registration.seller)
    @JoinColumn()
    registrations: SellerFairRegistration[];

    @OneToMany(() => PaymentTransaction, transaction => transaction.seller)
    @JoinColumn()
    transactions: PaymentTransaction[];
}
