import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Seller } from '../sellers/sellers.entity';
import { FairsService } from 'src/fairs/fairs.service';
import { Fair } from '../fairs/entities/fairs.entity';
import { FairsRepository } from '../fairs/fairs.repository';
import { SellerFairRegistration } from '../fairs/entities/sellerFairRegistration.entity';
import { ProductRequestController } from './controllers/productRequest.controller';
import { ProductRequestService } from './services/productRequest.service';
import { NotificationService } from './services/notification.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SellerRepository } from '../sellers/sellers.repository';
import { ProductRequest } from './entities/productRequest.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { UserRepository } from '../users/users.repository';
import { UserFairRegistration } from '../fairs/entities/userFairRegistration.entity';
import { BuyerCapacity } from '../fairs/entities/buyersCapacity.entity';
import { Category } from '../categories/categories.entity';
import { FairDay } from '../fairs/entities/fairDay.entity';
import { FairCategory } from '../fairs/entities/fairCategory.entity';
import { UserToSellerService } from '../users/changeRole';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Seller,
      Fair,
      SellerFairRegistration,
      ProductRequest,
      User,
      UserFairRegistration,
      BuyerCapacity,
      Category,
      FairDay,
      FairCategory,
    ]),
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
  controllers: [ProductsController, ProductRequestController],
  providers: [
    ProductsRepository,
    ProductsService,
    FairsService,
    FairsRepository,
    ProductRequestService,
    NotificationService,
    SellerRepository,
    UsersService,
    UserRepository,
    UserToSellerService,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
