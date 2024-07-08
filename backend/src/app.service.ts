/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Role } from './users/roles/roles.enum';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly userService: UsersService) {}

  async onModuleInit() {
    const admin = {
      name: 'admincito',
      lastname: 'admin',
      dni: '1111111111',
      address: 'admin',
      phone: '1111111111',
      email: 'admin@email.com',
      password: 'Admin!123456',
      confirmPassword: 'Admin!123456',
      registration_date: new Date(),
      role: 'admin' as Role,
      status: true,
      isVerified: true,
    };

    const existingAdmin = await this.userService.findByEmail(admin.email);
    if (!existingAdmin) {
      await this.userService.registerUser(admin);
    }
  }
}
