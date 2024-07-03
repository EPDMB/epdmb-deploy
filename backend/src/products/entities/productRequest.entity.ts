import { Seller } from "../../sellers/sellers.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Product } from "./products.entity";
import { Fair } from "../../fairs/entities/fairs.entity";

@Entity({ name: 'product_request' })
export class ProductRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid() 

    @Column({default:'PENDING'})
    status: 'PENDING' | 'APPROVED' | 'REJECTED';    

    @ManyToOne(()=> Seller, seller => seller.productRequests)
    seller: Seller;

    @OneToMany(()=> Product, product => product.productRequest)
    products: Product[]

    @ManyToOne(()=> Fair, fair => fair.productRequests)
    fair: Fair


}
