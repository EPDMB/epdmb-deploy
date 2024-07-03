import { Seller } from '../sellers/sellers.entity';
import { Role } from './roles/roles.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserFairRegistration } from '../fairs/entities/userFairRegistration.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string = uuid();

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  dni: string;

  @Column({ unique: true })
  email: string;

  // @Column()
  // phone: string;

  // @Column()
  // address: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: 'user' })
  role: Role;

  @Column({ default: new Date() })
  registration_date: Date;

  @Column({ default: false })
  status: boolean;

  @Column({
    default:
      'https://res.cloudinary.com/dpso5fsug/image/upload/v1719432779/el_placard_de_mi_bebot/scuh9cj2v97xflgtahm8.png',
  })
  profile_picture?: string;

  @OneToOne(() => Seller)
  @JoinColumn()
  seller: Seller;

  @OneToMany(() => UserFairRegistration, (registration) => registration.user)
  @JoinColumn()
  registrations: UserFairRegistration[];
}
