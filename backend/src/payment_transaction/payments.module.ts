import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTransaction } from './paymentTransaction.entity';
import { Fair } from '../fairs/entities/fairs.entity';
import { User } from '../users/users.entity';
import { UserFairRegistration } from '../fairs/entities/userFairRegistration.entity';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { BuyerCapacity } from '../fairs/entities/buyersCapacity.entity';
import { FairDay } from '../fairs/entities/fairDay.entity';
import { SellerService } from '../sellers/seller.service';
import { SellerRepository } from '../sellers/sellers.repository';
import { FairsRepository } from '../fairs/fairs.repository';
import { SellerFairRegistration } from '../fairs/entities/sellerFairRegistration.entity';
import { Category } from '../categories/categories.entity';
import { Seller } from '../sellers/sellers.entity';
import { FairCategory } from '../fairs/entities/fairCategory.entity';
import { UserToSellerService } from '../users/changeRole';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentTransaction,
      User,
      Fair,
      UserFairRegistration,
      BuyerCapacity,
      FairDay,
      Seller,
      Fair,
      SellerFairRegistration,
      Category,
      FairCategory
    ]),
  ],
  providers: [
    PaymentsService,
    UsersService,
    UserRepository,
    SellerService,
    SellerRepository,
    FairsRepository,
    UserToSellerService
  ],
  controllers: [PaymentsController],
})
export class MercadoPagoModule {}
