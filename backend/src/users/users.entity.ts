import { Seller } from "../sellers/sellers.entity";
import { Role } from "../roles/roles.enum";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { UserFairRegistration } from "../user_fair_registration/userFairRegistration.entity";
import { ApiHideProperty } from "@nestjs/swagger";


@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiHideProperty()
    id: string = uuid()

    @Column()
    name: string

    @Column()
    lastname: string

    @Column({ unique: true })
    dni: number

    @Column({ unique: true })
    email: string

    @Column({ unique: true })
    phone: number

    @Column()
    address: string

    @Column()
    password: string

    @Column({ default: 'user'})
    role: Role

    @Column({ default: new Date() })
    registration_date: Date

    @Column({ default: false })
    status: boolean

    @Column({ default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'})
    profile_picture?: string;

    @Column({ default: false })
    isVerified: boolean;

    @OneToOne(() => Seller)
    @JoinColumn()
    seller: Seller;

    @OneToMany(() => UserFairRegistration, registration => registration.user)
    @JoinColumn()
    registrations: UserFairRegistration[];
}
