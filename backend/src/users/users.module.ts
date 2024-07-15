import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerRepository } from '../sellers/sellers.repository';
import { Seller } from '../sellers/sellers.entity';
import { Product } from '../products/entities/products.entity';
import { AuthService } from '../auth/auth.service';
import { requiresAuth } from 'express-openid-connect';
import { SellerFairRegistration } from '../fairs/entities/sellerFairRegistration.entity';
import { UserFairRegistration } from '../fairs/entities/userFairRegistration.entity';
import { Fair } from '../fairs/entities/fairs.entity';
import { FairsService } from 'src/fairs/fairs.service';
import { FairsRepository } from 'src/fairs/fairs.repository';
import { BuyerCapacity } from 'src/fairs/entities/buyersCapacity.entity';
import { FairDay } from 'src/fairs/entities/fairDay.entity';
import { Category } from 'src/categories/categories.entity';
import { FairCategory } from 'src/fairs/entities/fairCategory.entity';
import { UserToSellerService } from './changeRole';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Seller, UserFairRegistration, SellerFairRegistration, Fair, Product,
      BuyerCapacity, FairDay, Category, FairsRepository, FairCategory ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, SellerRepository, AuthService, FairsService, FairsRepository, UserToSellerService],
  exports: []
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requiresAuth()).forRoutes('auth/protected');
  }
}
