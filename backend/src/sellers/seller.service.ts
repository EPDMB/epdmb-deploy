import { Injectable } from '@nestjs/common';
import { SellerRepository } from './sellers.repository';

@Injectable()
export class SellerService {
  constructor(
    private readonly sellerRepository: SellerRepository,
  ) {}

  async registerFair(sellerId: string, fairId: string) {
    return await this.sellerRepository.registerFair(sellerId, fairId);
  }

  async updateIsVerifySeller(sellerId: string){
    return await this.sellerRepository.updateIsVerifySeller(sellerId);
  }
}