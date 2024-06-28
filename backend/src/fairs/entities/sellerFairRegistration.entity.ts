import { Fair } from './fairs.entity';
import { Seller } from '../../sellers/sellers.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';

@Entity()
export class SellerFairRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  registrationDate: Date;

  @Column()
  entryFee: number;
  
  @ManyToOne(() => Seller, seller => seller.registrations)
  @JoinColumn()
  seller: Seller;

  @ManyToOne(() => Fair, fair => fair.sellerRegistrations)
  @JoinColumn()
  fair: Fair;
}