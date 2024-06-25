import { ApiHideProperty } from '@nestjs/swagger';
import { Fair } from '../fairs/fairs.entity';
import { User } from '../users/users.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';


@Entity({ name: 'user_fair_registration' })
export class UserFairRegistration {
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string = uuid()

  @Column()
  registrationDate: Date;

  @Column()
  slotTime: string;
 
  @ManyToOne(() => User, user => user.registrations)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Fair, fair => fair.userRegistrations)
  @JoinColumn()
  fair: Fair;
}