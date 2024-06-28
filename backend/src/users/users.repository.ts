import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto, ResetPasswordDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { Fair } from '../fairs/entities/fairs.entity';
import { UserFairRegistration } from '../fairs/entities/userFairRegistration.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Fair) private readonly fairRepository: Repository<Fair>,
    @InjectRepository(UserFairRegistration)
    private readonly userFair: Repository<UserFairRegistration>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find({
      relations: { seller: true },
    });
  }

  async registerUserFair(fairId: string, userId: string) {
    const fair = await this.fairRepository.findOneBy({ id: fairId });
    if (!fair) throw new NotFoundException('Feria no encontrada');
    const user = await this.getUserById(userId);

    if (fair.maxBuyers <= 0) return 'No hay cupos disponibles en la feria';

    const registration = new UserFairRegistration();
    registration.user = user;
    registration.fair = fair;
    registration.registrationDate = new Date();
    await this.userFair.save(registration);

    fair.maxBuyers -= 1;
    await this.fairRepository.save(fair);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) throw new NotFoundException('El usuario no existe');
    return user;
  }

  async updateUser(id: string, user: Partial<RegisterUserDto>) {
    const userFound = await this.getUserById(id);
    Object.assign(userFound, user);
    await this.userRepository.save(userFound);
  }

  async resetPassword(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async createUserAuth0(newUser: Partial<User>) {
    await this.userRepository.save(newUser);
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async registerUser(newUser: Partial<RegisterUserDto>): Promise<User> {
    return await this.userRepository.save(newUser);
  }

  async deleteUser(id: string) {
     const user = await this.getUserById(id);
      let statusUser = user.status;
      statusUser = false;
      await this.userRepository.save(user);
  }
}
