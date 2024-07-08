import { Controller, Post, Body, Get, Query, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly mercadoPagoService: PaymentsService) {}

  @Post('createPreferenceBuyer')
  async createPaymentBuyer(@Req() req: Request, @Body() createPaymentDto: any) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    console.log(baseUrl);
    return await this.mercadoPagoService.createPreferenceBuyer(
      createPaymentDto,
      baseUrl,
    );
  }
  @Post('createPreferenceSeller')
  async createPaymentSeller(@Body() createPaymentDto: any) {
    return await this.mercadoPagoService.createPreferenceSeller(
      createPaymentDto,
    );
  }

  @Get('success')
  async paymentSuccess(
    @Query('collection_id') collection_id: string,
    @Query('collection_status') collection_status: string,
    @Query('payment_id') payment_id: string,
    @Query('status') status: string,
    @Query('external_reference') external_reference: string,
    @Query('payment_type') payment_type: string,
    @Query('merchant_order_id') merchant_order_id: string,
    @Query('preference_id') preference_id: string,
    @Query('site_id') site_id: string,
    @Query('processing_mode') processing_mode: string,
    @Query('merchant_account_id') merchant_account_id: string,
    @Query('selectedHour') selectedHour: string,
    @Query('selectedDay') selectedDay: Date,
    @Query('fairId') fairId: string,
    @Query('userId') userId: string,
    @Res() res,
  ) {
    const data = {
      fairId,
      collection_id,
      collection_status,
      payment_id,
      status,
      external_reference,
      payment_type,
      merchant_order_id,
      preference_id,
      site_id,
      processing_mode,
      merchant_account_id,
      selectedHour,
      selectedDay,
      userId,
    };
    await this.mercadoPagoService.handlePaymentSuccessBuyer(data);
    const message = 'Pago exitoso';
    res.redirect(`${process.env.FRONTEND_URL}/payment/success/${message}`); // aca redrigir a la ruta de front
  }

  @Get('failure')
  paymentFailure() {
    return { message: 'Payment failed' };
  }
}
