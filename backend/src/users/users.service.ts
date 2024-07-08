import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import {
  RegisterUserDto,
  RegisterUserFairDto,
  ResetPasswordDto,
  UpdatePasswordDto,
} from './users.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import {
  runWithTryCatchBadRequestE,
  runWithTryCatchNotFoundE,
} from '../errors/errors';
import { Role } from './roles/roles.enum';
import { UserToSellerService } from './services/userToSeller.service';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository
    , private readonly userToSellerService: UserToSellerService
  ) {}
  
  async getAllUsers() {
    return runWithTryCatchNotFoundE(async () => {
      return await this.userRepository.getAllUsers();
    });
  }
  async getUserByEmailAndDni() {
    return await this.userRepository.getUserByEmailAndDni();
  }
  
  async registerUserFair(
    fairId: string,
    userId: string,
    selectedHour: RegisterUserFairDto,
  ) {
    
    return await this.userRepository.registerUserFair(
        fairId,
        userId,
        selectedHour,
      );
      ;
    }
    
    async findByEmail(email: string) {
      return runWithTryCatchNotFoundE(async () => {
        return await this.userRepository.findByEmail(email);
      });
    }
    
    async getUserById(id: string) {
      return runWithTryCatchNotFoundE(async () => {
        return await this.userRepository.getUserById(id);
      });
    }
    
    async userToSeller(id: string, role: Role) {
      return runWithTryCatchBadRequestE(async () => {
        await this.userToSellerService.userToSeller(id, role);
      });
    }
    
    async updateUser(id: string, user: Partial<RegisterUserDto>) {
      runWithTryCatchNotFoundE(async () => {
        await this.userRepository.updateUser(id, user);
      });
      return 'Se ha actualizado el usuario';
    }

  async resetPassword(user: User, newPassword: ResetPasswordDto) {
    const { password, confirmPassword } = newPassword;
    if (password !== confirmPassword)
      throw new BadRequestException('Las contraseñas no coinciden');

    const hashedPassword = await bcrypt.hash(password, 12);
    if (!hashedPassword)
      throw new BadRequestException('Error al encriptar la clave');
    user.password = hashedPassword;
    runWithTryCatchBadRequestE(async () => {
      await this.userRepository.resetPassword(user);
    });
    return 'contraseña actualizada';
  }

  async createUserAuth0(user: Partial<User>) {
    return runWithTryCatchBadRequestE(async () => {
      return await this.userRepository.createUserAuth0(user);
    });
  }

  async saveUser(user: User) {
    return runWithTryCatchBadRequestE(async () => {
      return await this.userRepository.saveUser(user);
    });
  }

  async registerUser(user: Partial<RegisterUserDto>) {
    if (user.password !== user.confirmPassword)
      throw new BadRequestException('Las contraseñas no coinciden');
    const hashedPassword = await bcrypt.hash(user.password, 12);
    if (!hashedPassword)
      throw new BadRequestException('Error al encriptar la clave');

    const newUser = { ...user, password: hashedPassword };
    return runWithTryCatchBadRequestE(async () => {
      return await this.userRepository.registerUser(newUser);
    });
  }

  async updateStatusUser(id: string) {
    runWithTryCatchNotFoundE(async () => {
      await this.userRepository.updateStatusUser(id);
    });
    return 'Usuario dado de baja';
  }
  async updatePassword(id: string, data: UpdatePasswordDto) {
    return await this.userRepository.updatePassword(id, data);
  }
  async findByDni(dni: string) {
    return await this.userRepository.findByDni(dni);
  }
}
