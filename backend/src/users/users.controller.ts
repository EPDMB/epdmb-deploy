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
import { UsersService } from './users.service';

import { Roles } from '../users/roles/roles.decorator';
import { Role } from '../users/roles/roles.enum';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../users/roles/roles.guard';

import { RegisterUserDto, RegisterUserFairDto, UpdatePasswordDto } from './users.dto';

import { ApiTags } from '@nestjs/swagger';
import {
  deleteUserSwagger,
  getAllUserSwagger,
  getUserByIdSwagger,
  registerUserFairSwagger,
  updatePasswordSwagger,
  updateUserSwagger,
} from './user.swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @getAllUserSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @updatePasswordSwagger()
  @Put('update-password/:id')
  @UseGuards(AuthGuard)
  async updatePassword(
    @Param('id') id: string,
    @Body() data: UpdatePasswordDto,
  ) {
    return await this.usersService.updatePassword(id, data);
  }

  @Post(':userId/register/fair/:fairId')
  async registerUserFair(
    @Param('fairId') fairId: string,
    @Param('userId') userId: string,
    @Body() registerUserFairDto: RegisterUserFairDto,
  ) {
    return await this.usersService.registerUserFair(fairId, userId, registerUserFairDto);
  }

  @getUserByIdSwagger()
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @updateUserSwagger()
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: Partial<RegisterUserDto>,
  ) {
    return await this.usersService.updateUser(id, user);
  }

  @deleteUserSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Put(':id')
  async updateStatusUser(@Param('id') id: string) {
    return await this.usersService.updateStatusUser(id);
  }
}
