import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Fair } from "./fairs.entity";
import { Repository } from "typeorm";
import { FairDto } from "./fairs.dto";

@Injectable()
export class FairsRepository {

    constructor(
        @InjectRepository(Fair) private readonly  fairsRepository: Repository<Fair>,
    ){}

    async createFair(fair: FairDto){
        return await this.fairsRepository.save(fair)
    }

}