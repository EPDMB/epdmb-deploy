import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from '../users/users.dto';
import { RegisterSellerDto } from '../sellers/sellers.dto';
import {
  SignInSwagger,
  SignUpSellerSwagger,
  SignUpUserSwagger,
  getAuthSwagger,
} from './auth.swagger';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get('login')
  async login(@Req() req, @Res() res) {
    await this.authService.validateUser(req.oidc.user);
    const user = await this.userService.findByEmail(req.oidc.user.email);
    const jwtToken = await this.authService.createJwtToken(user);
    res.redirect(`http://localhost:3000?token=${jwtToken}`);
  }

  @SignUpUserSwagger()
  @Post('register/user')
  async registerUser(@Body() userDto: RegisterUserDto) {
    return await this.authService.registerUser(userDto);
  }

  @SignUpSellerSwagger()
  @Post('register/seller')
  async registerSeller(@Body() sellerData: RegisterSellerDto) {
    return await this.authService.registerSeller(sellerData);
  }

  @getAuthSwagger()
  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token: string) {
    return await this.authService.verifyEmail(token);
  }

  @SignInSwagger()
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.loginUser(loginUserDto);
    return user;
  }

  
  @Get('protected')
  getAuthProtected(@Req() req: Request) {
    return JSON.stringify(req.oidc.user);
  }
}
