import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Fair } from "./fairs.entity";
import { Repository } from "typeorm";
import { FairDto } from "./fairs.dto";

@Injectable()
export class FairsRepository {

    constructor(
        @InjectRepository(Fair) private readonly  fairRepository: Repository<Fair>,
    ){}

    async createFair(fairDto: FairDto): Promise<Fair> {
        const { name, address, dateStartFair, dateEndFair, hourStartFair, hourEndFair, entryPrice, entryDescription, maxSellers, maxBuyers } = fairDto;
    
        const newFair = new Fair();
        newFair.name = name;
        newFair.address = address;
        newFair.dateStartFair = dateStartFair;
        newFair.dateEndFair = dateEndFair;
        newFair.hourStartFair = hourStartFair;
        newFair.hourEndFair = hourEndFair;
        newFair.entryPrice = entryPrice;
        newFair.entryDescription = entryDescription;
        newFair.maxSellers = maxSellers;
        newFair.maxBuyers = maxBuyers;
    
        return await this.fairRepository.save(newFair);
      }

}