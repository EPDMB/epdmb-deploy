import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find({
      relations: { seller: true },
    });
  }
  async createUserAuth0(user: Partial<User>) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      if (!hashedPassword) {
        throw new BadRequestException('Error al encriptar la clave');
      }
      const newUser = this.userRepository.create({
        ...user,
        password: hashedPassword,
      });
      await this.userRepository.save(newUser);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
  async registerUser(user: Partial<RegisterUserDto>): Promise<User> {
    try {
      if (user.password !== user.confirmPassword) {
        throw new BadRequestException('Los Passwords no coinciden');
      }
      const userFound = await this.userRepository.findOneBy({
        email: user.email,
      });
      if (userFound) {
        throw new BadRequestException('El Usuario ya Existe');
      }
      const hashedPassword = await bcrypt.hash(user.password, 12);
      if (!hashedPassword) {
        throw new BadRequestException('Error al encriptar la clave');
      }
      const newUser = this.userRepository.create({
        ...user,
        password: hashedPassword,
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
  async saveUser(user: User): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({
        email: email,
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
