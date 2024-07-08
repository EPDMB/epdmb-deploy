import { User } from 'src/users/users.entity';
import { Fair } from '../fairs/entities/fairs.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

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

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  collection_id: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  collection_status: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  payment_id: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  status: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  external_reference: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  payment_type: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  merchant_order_id: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  preference_id: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  site_id: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  processing_mode: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  merchant_account_id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Fair, (fair) => fair.transactions)
  @JoinColumn()
  fair: Fair;
}
