import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerRepository } from '../sellers/sellers.repository';
import { Seller } from '../sellers/sellers.entity';
import { Product } from '../products/products.entity';
import { AuthService } from '../auth/auth.service';
import { requiresAuth } from 'express-openid-connect';
import { SellerFairRegistration } from '../fairs/entities/sellerFairRegistration.entity';
import { UserFairRegistration } from '../fairs/entities/userFairRegistration.entity';
import { Fair } from '../fairs/entities/fairs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Seller,
      UserFairRegistration,
      SellerFairRegistration,
      Fair,
      Product,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, SellerRepository, AuthService],
  exports: []
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requiresAuth()).forRoutes('auth/protected');
  }
}
