import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Seller } from '../sellers/sellers.entity';
import { UserRepository } from '../users/users.repository';
import { SellerRepository } from '../sellers/sellers.repository';
import { UsersService } from 'src/users/users.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Seller]),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
        // tls: {
        //   rejectUnauthorized: true, // <--- Esta línea es importante
        // },
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, SellerRepository, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
