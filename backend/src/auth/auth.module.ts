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
import { SellerFairRegistration } from '../fairs/entities/sellerFairRegistration.entity';
import { FairsService } from '../fairs/fairs.service';
import { FairsRepository } from '../fairs/fairs.repository';
import { IsDniValidConstraint } from './auth.validator';
import { BuyerCapacity } from 'src/fairs/entities/buyersCapacity.entity';
import { FairDay } from 'src/fairs/entities/fairDay.entity';
import { Category } from 'src/categories/categories.entity';
import { FairCategory } from 'src/fairs/entities/fairCategory.entity';
import { UserToSellerService } from 'src/users/changeRole';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Seller, UserFairRegistration, Fair, SellerFairRegistration, BuyerCapacity, FairDay, Category, FairCategory]),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"FERIAS EL PLAC" <' + process.env.EMAIL + '>',
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
    FairsService,
    FairsRepository,
    IsDniValidConstraint,
    UserToSellerService
  ],
  exports: [AuthService, MailerModule],
})
export class AuthModule {}
