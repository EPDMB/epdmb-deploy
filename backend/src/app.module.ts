/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SellerModule } from './sellers/sellers.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { Seller } from './sellers/sellers.entity';
import { User } from './users/users.entity';
import { UserRepository } from './users/users.repository';
import { SellerRepository } from './sellers/sellers.repository';
import { Fair } from './fairs/entities/fairs.entity';
import { UserFairRegistration } from './fairs/entities/userFairRegistration.entity';
import { SellerFairRegistration } from './fairs/entities/sellerFairRegistration.entity';
import { FairsModule } from './fairs/fairs.module';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { FileModule } from './files/files.module';
import { FileController } from './files/files.controller';
import { FileService } from './files/files.service';
import { UsersController } from './users/users.controller';
import { GoogleStrategy } from './auth/auth.google.strategy.js';
import { FairsService } from './fairs/fairs.service';
import { FairsRepository } from './fairs/fairs.repository';
import { SellerController } from './sellers/seller.controller';
import { SellerService } from './sellers/seller.service';
import { CategoriesModule } from './categories/categories.module';
import { MercadoPagoModule } from './payment_transaction/payments.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) =>
        configservice.get('typeorm'),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
    TypeOrmModule.forFeature([
      Seller,
      User,
      Fair,
      UserFairRegistration,
      SellerFairRegistration,
    ]),
    UsersModule,
    SellerModule,
    AuthModule,
    FairsModule,
    ProductsModule,
    FileModule,
    CategoriesModule,
    MercadoPagoModule,
  ],
  controllers: [
    AppController,
    AuthController,
    FileController,
    UsersController,
    SellerController,
  ],
  providers: [
    AppService,
    AuthService,
    UsersService,
    UserRepository,
    SellerRepository,
    FairsRepository,
    FileService,
    GoogleStrategy,
    FairsService,
    SellerService,
  ],
})
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
