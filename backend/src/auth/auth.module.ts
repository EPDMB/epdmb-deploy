import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Seller } from '../sellers/sellers.entity';
import { UserRepository } from '../users/users.repository';
import { SellerRepository } from '../sellers/sellers.repository';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Seller])],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, SellerRepository, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
