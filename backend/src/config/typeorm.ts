/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { Fair } from 'src/fairs/fairs.entity';
import { UserFairRegistration } from 'src/user_fair_registration/userFairRegistration.entity';
import { SellerFairRegistration } from 'src/seller_fair_registration/sellerFairRegistration.entity';
import { User } from 'src/users/users.entity';
import { Product } from 'src/products/products.entity';
import { Seller } from 'src/sellers/sellers.entity';
import { PaymentTransaction } from 'src/payment_transaction/paymentTransaction.entity';
import { SKU } from 'src/products/entities/SKU.entity';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  dropSchema: true,
  logging: false,
  entities: [
    Fair,
    UserFairRegistration,
    SellerFairRegistration,
    User,
    Product,
    Seller,
    PaymentTransaction,
    SKU,
  ],
  // entities: ['dist/**/*.entity{.ts,.js}'],
  //autoLoadEntities: true,
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false, // Ajusta esta opción según la configuración de tu servidor PostgreSQL
}
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
