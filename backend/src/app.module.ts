/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SellerController } from './sellers/sellers.controller';
import { SellerService } from './sellers/sellers.service';
import { SellerModule } from './sellers/sellers.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { Seller } from './sellers/sellers.entity';
import { User } from './users/users.entity';
import { UserRepository } from './users/users.repository';
import { SellerRepository } from './sellers/sellers.repository';
import { Fair } from './fairs/fairs.entity';
import { UserFairRegistration } from './user_fair_registration/userFairRegistration.entity';
import { SellerFairRegistration } from './seller_fair_registration/sellerFairRegistration.entity';
import { FairsModule } from './fairs/fairs.module';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) => configservice.get('typeorm')
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
    TypeOrmModule.forFeature([Seller, User, Fair, UserFairRegistration, SellerFairRegistration]),
    UsersModule,
    SellerModule,
    AuthModule,
    FairsModule,
    ProductsModule
  ],
  controllers: [AppController, SellerController, AuthController],
  providers: [AppService, SellerService, AuthService, UsersService, UserRepository, SellerRepository],
})
export class AppModule implements NestModule {
  constructor() {}



  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}