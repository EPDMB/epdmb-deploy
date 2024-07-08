import { Injectable } from '@nestjs/common';
import { SellerRepository } from './sellers.repository';

@Injectable()
export class SellerService {
  constructor(
    private readonly sellerRepository: SellerRepository,
  ) {}

  async registerFair(sellerId: string, fairId: string, fairCategoryId: string) {
    return await this.sellerRepository.registerFair(sellerId, fairId, fairCategoryId);
  }

  async updateIsVerifySeller(sellerId: string){
    return await this.sellerRepository.updateIsVerifySeller(sellerId);
  }

  async updateNoVerifySeller(sellerId: string){
    return await this.sellerRepository.updateNoVerifySeller(sellerId);
  }

  async getSellerById(sellerId: string){
    return await this.sellerRepository.getSellerByIdWithProducts(sellerId);
  }

  async getAllSellers(){
    return await this.sellerRepository.getAllSellers();
  }
}