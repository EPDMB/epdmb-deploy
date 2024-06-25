import { Injectable } from '@nestjs/common';
import { FairDto } from './fairs.dto';
import { FairsRepository } from './fairs.repository';

@Injectable()
export class FairsService {

    constructor(private readonly fairsRepository: FairsRepository){}

    createFair(fair: FairDto) {
        return this.fairsRepository.createFair(fair)
    }
}
