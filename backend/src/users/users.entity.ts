import { Seller } from "../sellers/sellers.entity";
import { Role } from "./roles/roles.enum";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { UserFairRegistration } from "../fairs/entities/userFairRegistration.entity";
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

    @Column({ default: 'https://res.cloudinary.com/dpso5fsug/image/upload/v1719432779/el_placard_de_mi_bebot/scuh9cj2v97xflgtahm8.png'})
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
