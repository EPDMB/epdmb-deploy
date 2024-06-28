import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/users/roles/roles.guard';
import { RegisterUserDto } from './users.dto';
import { ApiTags } from '@nestjs/swagger';
import { deleteUserSwagger, getAllUserSwagger, getUserByIdSwagger, registerUserFairSwagger, updateUserSwagger } from './user.swagger';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @getAllUserSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async getAllUsers(){
    return await this.usersService.getAllUsers();
  }

  @registerUserFairSwagger()
  @UseGuards(AuthGuard)
  @Post(':userId/register/fair/:id')
  async registerUserFair(@Param('id') fairId: string, @Param('userId') userId: string) {
    return await this.usersService.registerUserFair(fairId, userId);
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
  async updateUser(@Param('id') id: string, @Body() user: Partial<RegisterUserDto>) {
    return await this.usersService.updateUser(id, user);
  }

  @deleteUserSwagger()  
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
