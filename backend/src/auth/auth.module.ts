import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Seller } from '../sellers/sellers.entity';
import { UserRepository } from '../users/users.repository';
import { SellerRepository } from '../sellers/sellers.repository';
import { UsersService } from '../users/users.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { GoogleStrategy } from './auth.google.strategy.js';
import { UserFairRegistration } from '../fairs/entities/userFairRegistration.entity';
import { Fair } from '../fairs/entities/fairs.entity';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Seller, UserFairRegistration, Fair]),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"El Plac" <' + process.env.EMAIL + '>',
      },
      template: {
        dir: join(__dirname, '..', '../templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    SellerRepository,
    UsersService,
    GoogleStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
