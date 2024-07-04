import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FairsService } from './fairs.service';
import { FairDto } from './fairs.dto';
import {
  CreateFairsSwagger,
  deleteFairSwagger,
  getFairByIdSwagger,
  getFairsSwagger,
  updateFairSwagger,
} from './fairs.swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/users/roles/roles.guard';
import { Roles } from '../users/roles/roles.decorator';
import { Role } from '../users/roles/roles.enum';

@Controller('fairs')
export class FairsController {
  constructor(private readonly fairsService: FairsService) {}

  @CreateFairsSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  async createFair(@Body() fair: FairDto) {
    return await this.fairsService.createFair(fair);
  }

  @getFairsSwagger()
  @Get()
  async getAllFairs() {
    return await this.fairsService.getAllFairs();
  }

  @updateFairSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Put(':id')
  async updateFair(@Body() fair: FairDto, @Param('id') fairId: string) {
    return await this.fairsService.updateFair(fair, fairId);
  }

  @deleteFairSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  async deleteFair(@Param('id') fairId: string) {
    return await this.fairsService.deleteFair(fairId);
  }

  @getFairByIdSwagger()
  @UseGuards(AuthGuard)
  @Get(':id')
  async getFairById(@Param('id') fairId: string) {
    return await this.fairsService.getFairById(fairId);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Put('close/:id')
  async closeFair(@Param('id') fairId: string) {
    return await this.fairsService.closeFair(fairId);
  }
}
