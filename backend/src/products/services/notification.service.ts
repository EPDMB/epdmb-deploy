import { Injectable } from '@nestjs/common';
import { CreateProductRequestDto } from '../dtos/createProductRequest.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({path: '.env'})

@Injectable()
export class NotificationService {
    constructor(private readonly mailerService: MailerService){}

    async sendNotificationToAdmin(createProductRequestDto: CreateProductRequestDto) {
        const {sellerId, products} = createProductRequestDto
        await this.mailerService.sendMail({
            to: process.env.EMAIL_ADMIN, subject: 'Productos en espera de autorización', 
            html: `<html>
      <body>
        <h1>Revisión de Productos del Vendedor: </h1>
        
        <p>Por favor, revise los siguientes productos:</p>
        <ul>
          ${products}
        </ul>
        <p><a href="https://yourwebsite.com/review/$%7Bseller.id%7D">Haga clic aquí para revisar los productos</a></p>
      </body>
    </html>`
        });
    }
}
