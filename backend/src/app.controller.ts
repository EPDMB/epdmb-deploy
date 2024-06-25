/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get a greeting message' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user')
  getUser(): object {
    return this.appService.getUser();
  }
}
