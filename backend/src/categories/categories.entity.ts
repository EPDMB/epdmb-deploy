import { Fair } from "../fairs/entities/fairs.entity";
import { Product } from "../products/entities/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]

    @OneToMany(() => Fair , (fair) => fair.category)
    fairs: Fair[]
}