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
  getAllUserSwagger,
  getUserByIdSwagger,
  registerUserFairSwagger,
  updatePasswordSwagger,
  updateStatusUserSwagger,
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

  @Get('uniquedata')
  async getUserByEmailAndDni() {
    return await this.usersService.getUserByEmailAndDni();
  }

  @updatePasswordSwagger()
  @UseGuards(AuthGuard)
  @Put('update-password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() data: UpdatePasswordDto,
  ) {
    return await this.usersService.updatePassword(id, data);
  }

  @registerUserFairSwagger()
  //@UseGuards(AuthGuard)
  @Post(':userId/register/fair/:fairId')
  async registerUserFair(
    @Param('fairId') fairId: string,
    @Param('userId') userId: string,
    @Body() selectedHour: RegisterUserFairDto,
  ) {
    return await this.usersService.registerUserFair(
      fairId,
      userId,
      selectedHour,
    );
  }

  @getUserByIdSwagger()
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Put('userToSeller/:id')
  async userToSeller(@Param('id') id: string, @Body('role') role: Role) {
    const ola = await this.usersService.userToSeller(id, role);
    return {message: "userToSeller", ola}
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

  @updateStatusUserSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Put(':id')
  async updateStatusUser(@Param('id') id: string) {
    return await this.usersService.updateStatusUser(id);
  }
}
