import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  async getAllUsers(){
    return await this.usersService.getAllUsers();
  }

  @Get('fairs')
  async getAllFairs() {
    return await this.usersService.getAllFairs();
  }

  @Post(':userId/register/fair/:id')
  async registerUserFair(@Param('id') fairId: string, @Param('userId') userId: string) {
    return await this.usersService.registerUserFair(fairId, userId);
  }

}
