import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }
  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
