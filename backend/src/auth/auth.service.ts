import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from '../users/users.dto';
import { User } from '../users/users.entity';
import { UserRepository } from '../users/users.repository';
import { SellerRepository } from '../sellers/sellers.repository';
import { RegisterSellerDto } from 'src/sellers/sellers.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/roles.enum';
import { MailerService } from '@nestjs-modules/mailer';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sellerRepository: SellerRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService,
  ) {}

  async sendEmailVerification(email: string, token: string) {
    const url = `http://localhost:3000/auth/verify-email?token=${token}`;
    this.mailService.sendMail({
      from: '"El Placard de mi Bebot" <' + process.env.EMAIL + '>',
      to: email,
      subject: 'Confirma tu cuenta',
      html: `<p>Confirma tu cuenta haciendo click en el siguiente enlace: <a href="${url}">Confirmar Cuenta</a></p>`,
    });
  }

  async registerUser(
    user: RegisterUserDto,
  ): Promise<{ token: string; message: string }> {
    try {
      const userFound = await this.userRepository.findByEmail(user.email);
      if (userFound) throw new NotFoundException('El usuario ya existe');
      const newUser = await this.userRepository.registerUser(user);

      const token = this.jwtService.sign(
        { email: newUser.email },
        { secret: process.env.JWT_SECRET },
      );
      await this.sendEmailVerification(newUser.email, token);

      const payload = { id: newUser.id, email: newUser.email, role: Role.USER };
      const authToken = this.jwtService.sign(payload);

      return {
        message:
          'Usuario registrado, revise su correo para verificar el registro',
        token: authToken,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async registerSeller(
    sellerData: RegisterSellerDto,
  ): Promise<{ token: string; message: string }> {
    try {
      const sellerFound = await this.sellerRepository.getByEmail(
        sellerData.email,
      );
      if (sellerFound) throw new NotFoundException('El usuario ya existe');

      const newSeller = await this.sellerRepository.sellerRegister(sellerData);

      const token = this.jwtService.sign(
        { email: newSeller.user.email },
        { secret: process.env.JWT_SECRET },
      );
      await this.sendEmailVerification(newSeller.user.email, token);

      const payload = {
        id: newSeller.id,
        email: newSeller.user.email,
        role: Role.SELLER,
      };
      const authToken = this.jwtService.sign(payload);

      return {
        message:
          'Vendedor registrado, revise su correo para verificar el registro',
        token: authToken,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
  }

  async loginUser({ email, password }: LoginUserDto) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new UnauthorizedException('Credenciales Invalidas');

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid)
        throw new UnauthorizedException('Credenciales Invalidas');

      const payload = { id: user.id, email: user.email, role: user.role };
      const token = this.jwtService.sign(payload);

      return { message: 'usuario logueado exitosamente', token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
  async verifyEmail(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      }) as { email: string };
      const email = decoded.email;
      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new UnauthorizedException('Usuario no encontrado');

      user.isVerified = true;
      await this.userRepository.saveUser(user);

      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
  async validateUser(payload: any) {
    try {
      const user = await this.userRepository.findByEmail(payload.email);
      if (user) {
        return user;
      }

      const newUser = new User();
      newUser.email = payload.email;
      newUser.name = payload.name || '';
      newUser.lastname = payload.family_name || '';
      newUser.dni = 0; // Placeholder, you should collect this later
      newUser.phone = 0; // Placeholder, you should collect this later
      newUser.address = ''; // Placeholder, you should collect this later
      newUser.password = ''; // Placeholder, you should handle this securely
      newUser.role = Role.USER;
      newUser.registration_date = new Date();
      newUser.status = true;
      newUser.profile_picture =
        payload.picture ||
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

      return await this.userRepository.createUserAuth0(newUser);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async createJwtToken(user: any) {
    try {
      const payload = { email: user.email, sid: user.sid, role: user.role };
      return this.jwtService.sign(payload);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
