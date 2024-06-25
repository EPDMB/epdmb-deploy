import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from '../products.entity';

@Entity()
export class SKU {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @OneToOne(() => Product, producto => producto.sku)
  @JoinColumn()
  product: Product;
}
