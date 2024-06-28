/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/users.entity';
import { Role } from './users/roles/roles.enum';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async onModuleInit() {
    const admin = {
      name: 'admin',
      lastname: 'admin',
      dni: 11111111,
      email: 'admin@email.com',
      address: 'admin',
      phone: 1111111111,
      password: 'Admin!123456',
      registration_date: new Date(),
      role: 'admin' as Role,
      status: true,
      isVerified: true,
    };

    const existingAdmin = await this.userRepository.findOne({ where: { email: admin.email } });
    if (!existingAdmin) {
      await this.userRepository.save(admin);
    }
  }
}
