import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Fair } from "./fairs.entity";

@Entity()
export class BuyerCapacity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    capacity: number;

    @Column()
    hour: number;

    @ManyToOne(()=> Fair, fair => fair.buyerCapacities)
    fair: Fair
}