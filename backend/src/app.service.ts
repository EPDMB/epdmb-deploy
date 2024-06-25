/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUser(): object{
    return {
      name: 'John',
      lastName: 'Doe',
      age: 30
    }
  }
}
