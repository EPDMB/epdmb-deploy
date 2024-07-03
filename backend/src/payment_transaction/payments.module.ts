import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTransaction } from './paymentTransaction.entity';
import { Fair } from '../fairs/entities/fairs.entity';
import { User } from 'src/users/users.entity';
import { UserFairRegistration } from 'src/fairs/entities/userFairRegistration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentTransaction,
      User,
      Fair,
      UserFairRegistration,
    ]),
  ],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class MercadoPagoModule {}
