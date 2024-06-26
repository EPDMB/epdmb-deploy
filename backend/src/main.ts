/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { config as auth0Config } from './config/auth0.config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config));
  app.useGlobalPipes(new ValidationPipe());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('El placard de mi bebot')
    .setDescription(
      'Esta documentación describe el uso de la API del placard de mi bebot, el servidor está creado con NestJS, y como base de datos se utiliza PostgreSQL. \n- Los invitados van a poder registrarse como vendedores o como usarios. \n- Los usuarios van a poder anotarse en las ferias, y pagar la entrada dependiendo la feria. \n- Los vendedores van a poder anotarse para vender su ropa en las ferias, van a subir los productos y van a recibir el 70% de las ventas finalizada la feria.',
    )
    .setVersion('2.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}

bootstrap();
