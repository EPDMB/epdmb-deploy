import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { RegisterUserDto, ResetPasswordDto } from './users.dto.js';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { runWithTryCatchBadRequestE, runWithTryCatchNotFoundE } from '../errors/errors';

@Injectable()
export class UsersService {
  
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(){
    return runWithTryCatchNotFoundE(async()=>{
      return await this.userRepository.getAllUsers();
    })
  }

  async registerUserFair(fairId: string, userId: string) {
    runWithTryCatchNotFoundE(async()=>{
      await this.userRepository.registerUserFair(fairId, userId);
    })
    return 'Se ha registrado el usuario en la feria';
  }

  async findByEmail(email: string)  {
    return runWithTryCatchNotFoundE(async()=>{
      return await this.userRepository.findByEmail(email);
    })
  }

  async getUserById(id: string) {
    return runWithTryCatchNotFoundE(async()=>{
      return await this.userRepository.getUserById(id);
    })
  }

  async updateUser(id: string, user: Partial<RegisterUserDto>) {
    runWithTryCatchNotFoundE(async()=>{
      await this.userRepository.updateUser(id, user);
    })
    return 'Se ha actualizado el usuario';
  }

  async resetPassword(user: User, newPassword: ResetPasswordDto) {
    const { password, confirmPassword } = newPassword;
    if (password !== confirmPassword) throw new BadRequestException('Las contraseñas no coinciden');
  
    const hashedPassword = await bcrypt.hash(password, 12);
    if (!hashedPassword) throw new BadRequestException('Error al encriptar la clave');
    user.password = hashedPassword;
    runWithTryCatchBadRequestE(async()=>{
      await this.userRepository.resetPassword(user);
    })
    return 'contraseña actualizada';
  }

  async createUserAuth0(user: Partial<User>) {
    return runWithTryCatchBadRequestE(async ()=>{
      return await this.userRepository.createUserAuth0(user);
    })
  }

  async saveUser(user: User) {
    return runWithTryCatchBadRequestE(async ()=>{
      return await this.userRepository.saveUser(user);

    })
  }

  async registerUser(user: Partial<RegisterUserDto>) {
    if (user.password !== user.confirmPassword) throw new BadRequestException('Las contraseñas no coinciden');
    const hashedPassword = await bcrypt.hash(user.password, 12);
    if (!hashedPassword) throw new BadRequestException('Error al encriptar la clave');
    
    const newUser = { ...user, password: hashedPassword }
    return runWithTryCatchBadRequestE(async ()=>{
      return await this.userRepository.registerUser(newUser);
    })
  }

  async deleteUser(id: string) {
    runWithTryCatchNotFoundE(async ()=> {
      await this.userRepository.deleteUser(id);
    })
    return 'Usuario dado de baja'
  }

}