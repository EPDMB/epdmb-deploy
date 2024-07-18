import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { Fair } from '../fairs/entities/fairs.entity';
import { payment, preference } from '../config/mercadopago';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { Seller } from '../sellers/sellers.entity';
import { SellerService } from '../sellers/seller.service';
import { PaymentTransaction } from './paymentTransaction.entity';
import { SellerFairRegistration } from '../fairs/entities/sellerFairRegistration.entity';
import { UserFairRegistration } from '../fairs/entities/userFairRegistration.entity';

dotenvConfig({ path: '.env' });

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentTransaction)
    readonly paymentRepository: Repository<PaymentTransaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Fair)
    private fairRepository: Repository<Fair>,
    private readonly userService: UsersService,
    @InjectRepository(Seller) readonly sellerRepository: Repository<Seller>,
    private readonly sellerService: SellerService,
    @InjectRepository(SellerFairRegistration)
    private readonly sellerFairRegistrationRepository: Repository<SellerFairRegistration>,
    @InjectRepository(UserFairRegistration)
    private readonly userFairRegistrationRepository: Repository<UserFairRegistration>,
  ) {}

  // Seller
  async createPreferenceSeller(createPaymentDto: any, baseUrl: string) {
    const { userId, fairId, categoryId, liquidation } = createPaymentDto;
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const fair = await this.fairRepository.findOne({ where: { id: fairId, isActive: true } });
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
      notification_url: `${process.env.BACK_URL_DEPLOY}/payments/success/seller/?fairId=${fairId}&userId=${userId}&categoryId=${categoryId}&liquidation=${liquidation}`,
      back_urls: {
        success: `${process.env.FRONTEND_URL}/dashboard/fairs`,
      },
      auto_return: 'approved',
    };
    try {
      console.log('datos de entrada');
      console.log(createPaymentDto.categoryId);
      console.log(createPaymentDto.fairId);
      console.log(createPaymentDto.userId);
      const response = await preference.create({ body: preferenceData });
      return { preferenceId: response.id };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
  // Buyer
  async createPreferenceBuyer(createPaymentDto: any) {
    const { userId, fairId, registrationHour, registrationDay } =
      createPaymentDto;
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const fair = await this.fairRepository.findOne({ where: { id: fairId, isActive: true } });
    if (!user || !fair) {
      throw new BadRequestException('Seller or Fair not found');
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
      notification_url: `${process.env.BACK_URL_DEPLOY}/payments/success/buyer/?selectedHour=${registrationHour}&selectedDay=${registrationDay}&fairId=${fairId}&userId=${user.id}`,

      back_urls: {
        success: `${process.env.FRONTEND_URL}/dashboard/profile`,
      },
      auto_return: 'approved',
    };
    try {
      const response = await preference.create({ body: preferenceData });
      return { preferenceId: response.id };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
  // Buyer payment
  async handlePaymentSuccessBuyer(data: any) {
    try {
      const fair = await this.fairRepository.findOne({
        where: { id: data.fairId, isActive: true },
      });
      const user = await this.userRepository.findOne({
        where: { id: data.userId },
      });

      const userRegistered = await this.userFairRegistrationRepository.findOne({
        where: {
          fair: fair,
          user: user,
        },
      });
      const paymentRegistered = await this.paymentRepository.findOne({
        where: {
          fair: fair,
          user: user,
        },
      });

      if (paymentRegistered) {
        throw new BadRequestException('Payment not found');
      }
      if (userRegistered) {
        throw new BadRequestException('User not registered');
      }

      const newPayment = await payment.get({ id: data.dataId });
      if (newPayment.status_detail == 'accredited') {
        const transactions = new PaymentTransaction();
        transactions.fair = fair;
        transactions.user = user;
        transactions.amount = fair.entryPriceBuyer;
        transactions.transactionDate = new Date();
        transactions.transactionType = 'Inscripcion';
        await this.paymentRepository.save(transactions);
        await this.userService.registerUserFair(fair.id, user.id, {
          selectedHour: data.selectedHour,
          selectedDay: data.selectedDay,
        });
        return { message: 'Payment successful' };
      }
      return { message: 'Payment failed' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  // Seller payment
  async handlePaymentSuccessSeller(data: any) {
    try {
      const fair = await this.fairRepository.findOne({
        where: { id: data.fairId, isActive: true },
      });
      const user = await this.userRepository.findOne({
        where: { id: data.userId },
        relations: { seller: true },
      });
      const seller = await this.sellerRepository.findOne({
        where: { id: user.seller.id },
      });

      const userRegistered =
        await this.sellerFairRegistrationRepository.findOne({
          where: {
            fair: fair,
            seller: seller,
          },
        });
      const paymentRegistered = await this.paymentRepository.findOne({
        where: {
          fair: fair,
          user: user,
        },
      });

      if (paymentRegistered) {
        throw new BadRequestException('Payment not found');
      }
      if (userRegistered) {
        throw new BadRequestException('User not registered');
      }

      const newPayment = await payment.get({ id: data.dataId });
      if (newPayment.status_detail == 'accredited') {
        const transactions = new PaymentTransaction();
        transactions.fair = fair;
        transactions.user = user;
        transactions.amount = fair.entryPriceSeller;
        transactions.transactionDate = new Date();
        transactions.transactionType = 'Inscripcion';
        await this.paymentRepository.save(transactions);
        await this.sellerService.registerFair(
          seller.id,
          data.fairId,
          data.categoryId,
          data.liquidation,
        );
        return { message: 'Payment successful' };
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
    return { message: 'Payment successful' };
  }
}
