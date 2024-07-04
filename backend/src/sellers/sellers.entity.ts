import { ApiHideProperty } from "@nestjs/swagger";
import { Product } from "../products/entities/products.entity";
import { SellerFairRegistration } from "../fairs/entities/sellerFairRegistration.entity";
import { User } from "../users/users.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { ProductRequest } from "../products/entities/productRequest.entity";

@Entity({ name: 'sellers'})
export class Seller {
    @PrimaryGeneratedColumn('uuid')
    @ApiHideProperty()
    id: string = uuid()

    @Column({ unique: true })
    bank_account: string

    @Column()
    social_media?: string 
  
    @Column()
    phone: string;

    @Column()
    address: string;

    @OneToOne(()=> User, user => user.seller)
    user: User

    @Column({ default: false })
    isVerified: boolean;

    @OneToMany(() => Product, product => product.seller)
    @JoinColumn()
    products: Product[];

    @OneToMany(() => SellerFairRegistration, registration => registration.seller)
    @JoinColumn()
    registrations: SellerFairRegistration[];

    @OneToMany(()=> ProductRequest, productRequests => productRequests.seller)
    productRequests: ProductRequest
}
