import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTransaction } from './paymentTransaction.entity';
import { Fair } from '../fairs/entities/fairs.entity';
import { User } from 'src/users/users.entity';
import { UserFairRegistration } from 'src/fairs/entities/userFairRegistration.entity';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/users.repository';
import { BuyerCapacity } from 'src/fairs/entities/buyersCapacity.entity';
import { FairDay } from 'src/fairs/entities/fairDay.entity';
import { SellerService } from 'src/sellers/seller.service';
import { SellerRepository } from 'src/sellers/sellers.repository';
import { FairsRepository } from 'src/fairs/fairs.repository';
import { SellerFairRegistration } from 'src/fairs/entities/sellerFairRegistration.entity';
import { Category } from 'src/categories/categories.entity';
import { Seller } from 'src/sellers/sellers.entity';
import { FairCategory } from 'src/fairs/entities/fairCategory.entity';
import { UserToSellerService } from 'src/users/services/userToSeller.service';

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
