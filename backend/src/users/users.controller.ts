import {
  Body,
  Controller,
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
import {
  RegisterUserDto,
  RegisterUserFairDto,
  UpdatePasswordDto,
} from './users.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  adminToUserSwagger,
  blockUserSwagger,
  getAllUserSwagger,
  getUserByEmailAndDniSwagger,
  getUserByIdSwagger,
  registerUserFairSwagger,
  unblockUserSwagger,
  updatePasswordSwagger,
  updateUserSwagger,
  userToAdminSwagger,
  userToSellerSwagger,
} from './user.swagger';
import { User } from './users.entity';
import { Seller } from '../sellers/sellers.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @getAllUserSwagger()
  //@Roles(Role.ADMIN)
  //@UseGuards(AuthGuard, RoleGuard)
  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @getUserByEmailAndDniSwagger()
  //@Roles(Role.ADMIN)
  //@UseGuards(AuthGuard, RoleGuard)
  @Get('uniquedata')
  async getUserByEmailAndDni(): Promise<{userInfo: User[]; sellerInfo: Seller[]}> {
    return await this.usersService.getUserByEmailAndDni();
  }

  @updatePasswordSwagger()
  //@UseGuards(AuthGuard)
  @Put('update-password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() data: UpdatePasswordDto,
  ):Promise<string> {
    return await this.usersService.updatePassword(id, data);
  }

  @registerUserFairSwagger()
  //@UseGuards(AuthGuard)
  @Post(':userId/register/fair/:fairId')
  async registerUserFair(
    @Param('fairId') fairId: string,
    @Param('userId') userId: string,
    @Body() selectedHour: RegisterUserFairDto,
  ): Promise<string> {
    return await this.usersService.registerUserFair(
      fairId,
      userId,
      selectedHour,
    );
  }

  @getUserByIdSwagger()
  //@UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUserById(id);
  }

  @userToSellerSwagger()
  //@UseGuards(AuthGuard)
  @Put('changeRole/:id')
  async changeRole(@Param('id') id: string, @Body('role') role: Role): Promise<{message: string,}> {
    await this.usersService.changeRole(id, role);
    return {message: "Tu rol ha sido cambiado"}
  }

  @updateUserSwagger()
  //@UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: Partial<RegisterUserDto>,
  ):Promise<string> {
    return await this.usersService.updateUser(id, user);
  }

  @blockUserSwagger()
  //@Roles(Role.ADMIN)
  //@UseGuards(AuthGuard, RoleGuard)
  @Put('block/:id')
  async blockUser(@Param('id') id: string) {
    return await this.usersService.blockUser(id);
  }

  @unblockUserSwagger()
  //@Roles(Role.ADMIN)
  //@UseGuards(AuthGuard, RoleGuard)
  @Put('unblock/:id')
  async unblockUser(@Param('id') id: string) {
    return await this.usersService.unblockUser(id);
  }
}
