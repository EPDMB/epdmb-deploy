import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from 'src/categories/categories.entity';
import { Fair } from './fairs.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'fair_category' })
export class FairCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => Fair, (fair) => fair.fairCategories)
  @JoinColumn()
  @Exclude()
  fair: Fair;

  @ManyToOne(() => Category, (category) => category.fairCategories)
  @JoinColumn()
  category: Category;

  @Column()
  maxProductsSeller: number;

  @Column()
  minProductsSeller: number;

  @Column()
  maxSellers: number;
}
