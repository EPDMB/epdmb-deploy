import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { Fair } from '../fairs/entities/fairs.entity';
import { PaymentTransaction } from './paymentTransaction.entity';
import { preference } from 'src/config/mercadopago';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { SellerService } from 'src/sellers/seller.service';

dotenvConfig({ path: '.env' });

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentTransaction)
    private paymentTransactionRepository: Repository<PaymentTransaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Fair)
    private fairRepository: Repository<Fair>,
    private readonly userService: UsersService,
    private readonly sellerService: SellerService,
  ) {}

  // Seller
  async createPreferenceSeller(createPaymentDto: any) {
    const { userId, fairId, transactionType, categoryId } = createPaymentDto;
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const fair = await this.fairRepository.findOne({ where: { id: fairId } });
    if (!user || !fair) {
      throw new BadRequestException('Seller or Fair not found');
    }

    const preferenceData = {
      items: [
        {
          id: fair.id,
          title: fair.name,
          quantity: 1,
          unit_price: fair.entryPriceSeller,
        },
      ],
    };

    try {
      const response = await preference.create({ body: preferenceData });

      await this.sellerService.registerFair(fairId, userId, categoryId);

      const transactions = new PaymentTransaction();
      transactions.amount = fair.entryPriceSeller;
      transactions.transactionDate = new Date();
      transactions.transactionType = transactionType;
      transactions.user = user;
      transactions.fair = fair;
      await this.paymentTransactionRepository.save(transactions);

      return { preferenceId: response.id };
    } catch (error) {
      console.error('Error creating Mercado Pago preference:', error);
      throw new Error('Failed to create Mercado Pago preference');
    }
  }

  // Buyer
  async createPreferenceBuyer(createPaymentDto: any, baseUrl: string) {
    const { userId, fairId, registrationHour, registratonDay } =
      createPaymentDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const fair = await this.fairRepository.findOne({ where: { id: fairId } });

    if (!user || !fair) {
      throw new Error('Seller or Fair not found');
    }

    const preferenceData = {
      items: [
        {
          id: fair.id,
          title: fair.name,
          quantity: 1,
          unit_price: fair.entryPriceBuyer,
        },
      ],
      back_urls: {
        success: `${baseUrl}/payments/success/?selectedHour=${registrationHour}&selectedDay=${registratonDay}&fairId=${fairId}&userId=${user.id}`,
        failure: `${baseUrl}/failure`,
      },
      auto_return: 'approved',
    };

    try {
      const response = await preference.create({ body: preferenceData });

      /*const transactions = new PaymentTransaction();
      transactions.amount = fair.entryPriceBuyer;
      transactions.transactionDate = new Date();
      transactions.transactionType = transactionType;
      transactions.user = user;
      transactions.fair = fair;
      await this.paymentTransactionRepository.save(transactions);*/

      return { preferenceId: response.id };
    } catch (error) {
      console.error('Error creating Mercado Pago preference:', error);
      throw new Error('Failed to create Mercado Pago preference');
    }
  }

  async handlePaymentSuccessBuyer(data: any) {
    const fair = await this.fairRepository.findOne({
      where: { id: data.fairId },
    });
    const user = await this.userRepository.findOne({
      where: { id: data.userId },
    });

    await this.userService.registerUserFair(fair.id, user.id, {
      selectedHour: data.selectedHour,
      selectedDay: data.selectedDay,
    });

    return { message: 'Payment successful' };
  }
}
