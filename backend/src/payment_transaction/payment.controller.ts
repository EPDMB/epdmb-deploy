import { Controller, Post, Body, Get, Query, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly mercadoPagoService: PaymentsService) {}

  @Post('createPreferenceBuyer')
  async createPaymentBuyer(@Req() req: Request, @Body() createPaymentDto: any) {
    return await this.mercadoPagoService.createPreferenceBuyer(
      createPaymentDto,
    );
  }
  @Post('createPreferenceSeller')
  async createPaymentSeller(
    @Req() req: Request,
    @Body() createPaymentDto: any,
  ) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return await this.mercadoPagoService.createPreferenceSeller(
      createPaymentDto,
      baseUrl,
    );
  }

  @Post('success/buyer')
  async paymentSuccessBuyer(
    @Query('id') id: string,
    @Query('data.id') dataId: string,
    @Query('selectedHour') selectedHour: string,
    @Query('selectedDay') selectedDay: Date,
    @Query('fairId') fairId: string,
    @Query('userId') userId: string,
    @Res() res,
  ) {
    const data = {
      id,
      dataId,
      fairId,
      selectedHour,
      selectedDay,
      userId,
    };
    await this.mercadoPagoService.handlePaymentSuccessBuyer(data);
    const message = 'Pago exitoso';
    res.redirect(`${process.env.FRONTEND_URL}/payment/success/${message}`); // aca redrigir a la ruta de front
  }
  @Post('success/seller')
  async paymentSuccessSeller(
    @Query('liquidation') liquidation: string,
    @Query('id') id: string,
    @Query('data.id') dataId: string,
    @Query('categoryId') categoryId: string,
    @Query('fairId') fairId: string,
    @Query('userId') userId: string,
    @Res() res,
  ) {
    const data = {
      id,
      dataId,
      fairId,
      categoryId,
      userId,
      liquidation,
    };
    await this.mercadoPagoService.handlePaymentSuccessSeller(data);
    const message = 'Pago exitoso';
    res.redirect(`${process.env.FRONTEND_URL}/payment/success/${message}`); // aca redrigir a la ruta de front
  }

  @Get('failure')
  paymentFailure() {
    return { message: 'Payment failed' };
  }
}
