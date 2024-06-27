import { Module } from '@nestjs/common';
import { FileController } from './files.controller';
import { FileService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { Seller } from '../sellers/sellers.entity';

import { CloudinaryConfig } from 'src/config/cloudinary';
import { UsersModule } from 'src/users/users.module';
import { Fair } from '../fairs/fairs.entity';
import { UserFairRegistration } from '../user_fair_registration/userFairRegistration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Seller, Fair, UserFairRegistration]), UsersModule],
  controllers: [FileController],
  providers: [FileService, UsersService, CloudinaryConfig, UserRepository],
  exports: [FileService],
})
export class FileModule {}
