import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { BuyerCapacity } from './buyersCapacity.entity';
import { Fair } from './fairs.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'fair_day' })
export class FairDay {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  day: Date;

  @ManyToOne(() => Fair, fair => fair.fairDays)
  @Exclude()
  fair: Fair;

  @OneToMany(() => BuyerCapacity, buyerCapacity => buyerCapacity.fairDay)
  buyerCapacities: BuyerCapacity[];
}
