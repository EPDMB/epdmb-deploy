import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  LoginUserDto,
  RegisterUserDto,
  ResetPasswordDto,
} from '../users/users.dto';
import { User } from '../users/users.entity';
import { SellerRepository } from '../sellers/sellers.repository';
import { RegisterSellerDto } from '../sellers/sellers.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../users/roles/roles.enum';
import { MailerService } from '@nestjs-modules/mailer';
import { config as dotenvConfig } from 'dotenv';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { runWithTryCatchBadRequestE } from '../errors/errors';

dotenvConfig({ path: '.env' });

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly sellerRepository: SellerRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService,
  ) {}

  async registerUser(user: RegisterUserDto): Promise<string> {
    const userFound = await this.userService.findByEmail(user.email);
    if (userFound) throw new NotFoundException('El mail del usuario ya existe');
    const userDni = await this.userService.findByDni(user.dni);
    if (userDni) throw new NotFoundException('El dni del usuario ya existe');
    // const userPhone = await this.userService.findByPhone(user.phone);
    // if (userPhone)
    //   throw new NotFoundException('El teléfono del usuario ya existe');
    const newUser = await this.userService.registerUser(user);

    const token = this.jwtService.sign(
      { email: newUser.email },
      { secret: process.env.JWT_SECRET },
    );
    await this.sendEmailVerification(newUser.email, token);
    return 'Usuario registrado, revise su correo para verificar el registro';
  }

  async registerSeller(sellerData: RegisterSellerDto): Promise<string> {
    const sellerFound = await this.userService.findByEmail(sellerData.email);
    if (sellerFound) throw new NotFoundException('El usuario ya existe');
    const sellerDni = await this.userService.findByDni(sellerData.dni);
    if (sellerDni) throw new NotFoundException('El dni del usuario ya existe');
    const sellerPhone = await this.sellerRepository.findByPhone(sellerData.phone);
    if (sellerPhone)
      throw new NotFoundException('El teléfono del usuario ya existe');
    await this.sellerRepository.sellerRegister(sellerData);

    const token = this.jwtService.sign(
      { email: sellerData.email },
      { secret: process.env.JWT_SECRET },
    );
    await this.sendEmailVerification(sellerData.email, token);
    return 'Vendedor registrado, revise su correo para verificar el registro';
  }

  async verifyEmail(token: string, res: Response) {
    try {
      const { email } = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      }) as { email: string };

      const user = await this.userService.findByEmail(email);
      if (!user) throw new UnauthorizedException('Usuario no encontrado');

      user.status = true;
      await this.userService.saveUser(user);

      const redirectUrl = `${process.env.FRONTEND_URL}/login`;

      return res.redirect(redirectUrl);
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  async sendEmailVerification(email: string, token: string) {
    const url = `${process.env.URL}/auth/verify-email/${token}`;
    await this.mailService.sendMail({
      to: email,
      subject: 'Confirma tu cuenta',
      template: 'mail',
      context: { url },
    });
  }

  async loginUser({ email, password }: LoginUserDto) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales Invalidas');

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid)
      throw new UnauthorizedException('Credenciales Invalidas');

    if (user.status === false)
      throw new UnauthorizedException(
        'Verifica tu cuenta para poder iniciar sesión',
      );

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { message: 'usuario logueado exitosamente', token };
  }

  async googleLogin(payload: any, role: string) {
    return runWithTryCatchBadRequestE(async () => {
      const user = await this.userService.findByEmail(payload.email);
      if (user) {
        return user;
      }
      const newUser = new User();
      newUser.email = payload.email;
      newUser.name = payload.firstName || '';
      newUser.lastname = payload.lastName || '';
      newUser.dni = '';
      // newUser.phone = '';
      // newUser.address = '';
      newUser.password = '';
      newUser.role = role === 'seller' ? Role.SELLER : Role.USER;
      newUser.registration_date = new Date();
      newUser.status = true;
      newUser.profile_picture =
        payload.picture ||
        'https://res.cloudinary.com/dpso5fsug/image/upload/v1719432779/el_placard_de_mi_bebot/scuh9cj2v97xflgtahm8.png';

      return await this.userService.createUserAuth0(newUser);
    });
  }

  async createJwtToken(user: any) {
    return runWithTryCatchBadRequestE(async () => {
      const userId = await this.userService.findByEmail(user.email);
      const payload = { id: userId.id, email: user.email, role: user.role };
      return this.jwtService.sign(payload);
    });
  }

  async sendPasswordResetLink(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const token = this.jwtService.sign(
      { userId: user.id },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );
    await this.sendEmailResetPassword(user.email, token);
  }

  async sendEmailResetPassword(email: string, token: string) {
    const url = `${process.env.URL}/auth/reset-password/${token}`;
    try {
      await this.mailService.sendMail({
        to: email,
        subject: 'Solicitud de restablecimiento de contraseña',
        template: 'passwordmail',
        context: { url },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al enviar el correo de restablecimiento de contraseña',
      );
    }
  }

  async resetPassword(
    token: string,
    resetPasswordDto: ResetPasswordDto,
    res: Response,
  ): Promise<void> {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decoded.userId;
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      await this.userService.resetPassword(user, resetPasswordDto);

      const redirectUrl = `${process.env.URL_FRONT}/login`;
      return res.redirect(redirectUrl);
    } catch (error) {
      throw new InternalServerErrorException('Token inválido o expirado');
    }
  }
}
