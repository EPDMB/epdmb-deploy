import { Fair } from '../fairs/fairs.entity';
import { Seller } from '../sellers/sellers.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class PaymentTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  transactionDate: Date;

  @Column()
  transactionType: string;
  
  @ManyToOne(() => Seller, seller => seller.transactions)
  @JoinColumn()
  seller: Seller;

  @ManyToOne(() => Fair, fair => fair.transactions)
  @JoinColumn()
  fair: Fair;

}