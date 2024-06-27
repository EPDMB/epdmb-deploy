import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { Fair } from '../fairs/fairs.entity';
import { UserFairRegistration } from '../user_fair_registration/userFairRegistration.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Fair) private readonly fairRepository: Repository<Fair>,
    @InjectRepository(UserFairRegistration) private readonly userFair: Repository<UserFairRegistration>,
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

  async getAllFairs(){
    return await this.fairRepository.find()
  }

  async registerUserFair(fairId: string, userId: string) {
    const fair = await this.fairRepository.findOneBy({ id: fairId });
    if (!fair) throw new NotFoundException('Feria no encontrada');

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    if (fair.maxBuyers <= 0) {
      return 'No hay cupos disponibles en la feria';
    }

    const registration = new UserFairRegistration();
    registration.user = user;
    registration.fair = fair;
    registration.registrationDate = new Date();

    await this.userFair.save (registration);

    fair.maxBuyers -= 1;
    await this.fairRepository.save(fair)

    return 'Registro exitoso'
}

  async getUserById(id: string) {
    try {
      const user = await this.userRepository.findOneBy({
        id: id,
      });

      if (!user) {
        throw new NotFoundException('El usuario no existe');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async updateUser(id: string, user: Partial<RegisterUserDto>) {
    try {
      const userFound = await this.userRepository.findOneBy({
        id: id,
      });
      console.log('User' + user);
      console.log('userFound' + userFound);

      if (!userFound) {
        throw new NotFoundException('El usuario no existe');
      }
      Object.assign(userFound, user);
      return await this.userRepository.save(userFound);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

}
