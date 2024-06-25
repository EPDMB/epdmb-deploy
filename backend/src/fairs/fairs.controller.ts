import { Body, Controller, Post } from '@nestjs/common';
import { FairsService } from './fairs.service';
import { FairDto } from './fairs.dto';
import { CreateFairsSwagger } from './fairs.swagger';

@Controller('fairs')
export class FairsController {
    constructor(private readonly fairsSerivce: FairsService){}

    @CreateFairsSwagger()
    @Post()
    async createFair(@Body()fair : FairDto){
        return await this.fairsSerivce.createFair(fair)
    }



}
