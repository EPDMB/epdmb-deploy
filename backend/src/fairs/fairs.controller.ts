import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { FairsService } from './fairs.service';
import { FairDto } from './fairs.dto';
import { CreateFairsSwagger, deleteFairSwagger, getFairByIdSwagger, getFairsSwagger, updateFairSwagger } from './fairs.swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/users/roles/roles.guard';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';

@Controller('fairs')
export class FairsController {
    constructor(private readonly fairsSerivce: FairsService){}

    @CreateFairsSwagger()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Post()
    async createFair(@Body()fair : FairDto){
        return await this.fairsSerivce.createFair(fair)
    }

    @getFairsSwagger()
    @Get()
    async getAllFairs(){
        return await this.fairsSerivce.getAllFairs()
    }

    @updateFairSwagger()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Put(':id')
    async updateFair(@Body()fair : FairDto, @Param('id') fairId: string){
        return await this.fairsSerivce.updateFair(fair, fairId)
    }

    @deleteFairSwagger()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Delete(':id')
    async deleteFair(@Param('id') fairId: string){
        return await this.fairsSerivce.deleteFair(fairId)
    }

    @getFairByIdSwagger()    
    @Get(':id')
    async getFairById(@Param('id') fairId: string){
        return await this.fairsSerivce.getFairById(fairId)
    }
}
