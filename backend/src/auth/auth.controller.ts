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
    return jwtToken;
  }

  @SignUpUserSwagger()
  @Post('register/user')
  async registerUser(@Body() userDto: RegisterUserDto) {
    const user = await this.authService.registerUser(userDto);
    try {
      return {
        message:
          'Usuario registrado exitosamente, revise su correo para verificar el registro',
        user,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new BadRequestException('Error en el registro de usuario');
      }
    }
  }

  @SignUpSellerSwagger()
  @Post('register/seller')
  async registerSeller(@Body() sellerData: RegisterSellerDto) {
    const seller = await this.authService.registerSeller(sellerData);
    return {
      message:
        'Vendedor solicitado, nos pondremos en contacto a la brevedad para autorizar su solicitud.',
      seller,
    };
  }
  @getAuthSwagger()
  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token: string) {
    try {
      const user = await this.authService.verifyEmail(token);
      return {
        message: 'Email verificado exitosamente',
        user,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
