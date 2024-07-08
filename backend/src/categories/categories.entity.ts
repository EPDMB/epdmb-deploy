import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Fair } from '../fairs/entities/fairs.entity';
import { Product } from '../products/entities/products.entity';
import { FairCategory } from '../fairs/entities/fairCategory.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  name: string;

  @OneToMany(() => Product, product => product.category)
  products: Product[];

  @OneToMany(() => FairCategory, fairCategory => fairCategory.category)
  fairCategories: FairCategory[] | FairCategory;
}
