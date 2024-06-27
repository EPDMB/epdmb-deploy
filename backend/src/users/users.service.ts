import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { RegisterUserDto } from './users.dto.js';

@Injectable()
export class UsersService {
  
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(){
    return await this.userRepository.getAllUsers();
  }

  async getAllFairs() {
    return await this.userRepository.getAllFairs();
  }

  async registerUserFair(fairId: string, userId: string) {
    return await this.userRepository.registerUserFair(fairId, userId);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async getUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }

  async updateUser(id: string, user: Partial<RegisterUserDto>) {
    return await this.userRepository.updateUser(id, user);
  }

}
