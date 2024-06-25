import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerRepository } from '../sellers/sellers.repository';
import { Seller } from '../sellers/sellers.entity';
import { UserFairRegistration } from '../user_fair_registration/userFairRegistration.entity';
import { SellerFairRegistration } from '../seller_fair_registration/sellerFairRegistration.entity';
import { Fair } from '../fairs/fairs.entity';
import { Product } from '../products/products.entity';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';
import { requiresAuth } from 'express-openid-connect';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Seller,
      UserRepository,
      SellerRepository,
      UserFairRegistration,
      SellerFairRegistration,
      Fair,
      Product,
    ]),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, UserRepository, SellerRepository, AuthService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requiresAuth()).forRoutes('auth/protected');
  }
}
