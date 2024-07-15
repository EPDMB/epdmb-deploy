import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginUserDto,
  RegisterUserDto,
  ResetPasswordDto,
} from '../users/users.dto';
import { RegisterSellerDto } from '../sellers/sellers.dto';
import {
  SignInSwagger,
  SignUpSellerSwagger,
  SignUpUserSwagger,
  forgotPasswordSwagger,
  getAuthSwagger,
  getProtectedSwagger,
  getWithGooleSwagger,
  resetPasswordSwagger,
} from './auth.swagger';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { ApiTags } from '@nestjs/swagger';
import { config as dotenvConfig } from 'dotenv';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

dotenvConfig({ path: '.env' });

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @getWithGooleSwagger()
  @Get('googleLogin')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req, @Query('role') role: string) {
    req.role = role;
  }

  @getWithGooleSwagger()
  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const role = req.role || 'user';
    await this.authService.googleLogin(req.user, role);
    const user = await this.userService.findByEmail(req.user.email);
    const jwtToken = await this.authService.createJwtToken(user);
    res
      .status(HttpStatus.OK)
      .redirect(
        `${process.env.FRONTEND_URL}/auth/success/?token=${jwtToken}`,
      );
    return;
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
  async verifyEmail(@Param('token') token: string, @Res() res: Response): Promise<void> {
    return await this.authService.verifyEmail(token, res);
  }

  @SignInSwagger()
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.loginUser(loginUserDto);
    return user;
  }

  //LOGOUT

  @getProtectedSwagger()
  @Get('protected')
  getAuthProtected(@Req() req: Request) {
    return JSON.stringify(req.oidc.user);
  }

  @forgotPasswordSwagger()
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string): Promise<void> {
    return await this.authService.sendPasswordResetLink(email);
  }

  @resetPasswordSwagger()
  @Put('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.authService.resetPassword(token, resetPasswordDto, res);
    res
      .status(HttpStatus.OK)
      .json({ message: 'Contraseña actualizada exitosamente' });
  }
}
