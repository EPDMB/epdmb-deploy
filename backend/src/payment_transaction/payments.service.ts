import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { Seller } from '../sellers/sellers.entity';
import { Fair } from '../fairs/entities/fairs.entity';
import { PaymentTransaction } from './paymentTransaction.entity';
import { preference } from 'src/config/mercadopago';
import { UserFairRegistration } from 'src/fairs/entities/userFairRegistration.entity';
import { User } from 'src/users/users.entity';

dotenvConfig({ path: '.env' });

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(UserFairRegistration)
    private readonly userFairRegistrationRepository: Repository<UserFairRegistration>,
    @InjectRepository(PaymentTransaction)
    private paymentTransactionRepository: Repository<PaymentTransaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Fair)
    private fairRepository: Repository<Fair>,
  ) {}

  async createPreference(createPaymentDto: any) {
    const { userId, fairId, transactionType, startTime, endTime, day } =
      createPaymentDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const fair = await this.fairRepository.findOne({ where: { id: fairId } });

    if (!user || !fair) {
      throw new Error('Seller or Fair not found');
    }
    console.log(fair.id);
    const preferenceData = {
      items: [
        {
          id: fair.id,
          title: fair.name,
          quantity: 1,
          unit_price: fair.entryPrice,
        },
      ],
    };

    try {
      const response = await preference.create({ body: preferenceData });

      const user_fair_registration = new UserFairRegistration();
      user_fair_registration.registrationDate = new Date();
      user_fair_registration.entryFee = fair.entryPrice;
      user_fair_registration.startTime = startTime;
      user_fair_registration.endTime = endTime;
      user_fair_registration.registratonDay = day;
      user_fair_registration.user = user;
      user_fair_registration.fair = fair;
      await this.userFairRegistrationRepository.save(user_fair_registration);

      const transactions = new PaymentTransaction();
      transactions.amount = fair.entryPrice;
      transactions.transactionDate = new Date();
      transactions.transactionType = transactionType;
      transactions.user = user;
      transactions.fair = fair;
      await this.paymentTransactionRepository.save(transactions);

      // Devolver la URL de pago generada por Mercado Pago

      return { preferenceId: response.id };
    } catch (error) {
      console.error('Error creating Mercado Pago preference:', error);
      throw new Error('Failed to create Mercado Pago preference');
    }
  }
}
