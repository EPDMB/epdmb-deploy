import { BadRequestException, Injectable } from '@nestjs/common';
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
    const hashedPassword = await bcrypt.hash(user.password, 12);
    if (!hashedPassword) {
      throw new BadRequestException('Error al encriptar la clave');
    }
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
  }
  async registerUser(user: Partial<RegisterUserDto>): Promise<User> {
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

    return newUser;
  }
  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({
      email: email,
    });
  }
}
