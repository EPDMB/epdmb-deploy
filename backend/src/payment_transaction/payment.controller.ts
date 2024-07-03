import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly mercadoPagoService: PaymentsService) {}

  @Post('createPreference')
  async createPayment(@Body() createPaymentDto: any) {
    return await this.mercadoPagoService.createPreference(createPaymentDto);
  }
}
