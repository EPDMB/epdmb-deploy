import { Injectable } from '@nestjs/common';
import { FairDto } from './fairs.dto';
import { FairsRepository } from './fairs.repository';

@Injectable()
export class FairsService {
  constructor(private readonly fairsRepository: FairsRepository) {}

  async createFair(fair: FairDto) {
    return await this.fairsRepository.createFair(fair);
  }

  async getAllFairs() {
    return await this.fairsRepository.getAllFairs();
  }

  async updateFair(fair: FairDto, fairId: string) {
    return await this.fairsRepository.updateFair(fair, fairId);
  }

  async deleteFair(fairId: string) {
    return await this.fairsRepository.deleteFair(fairId);
  }

  async getFairById(fairId: string) {
    return await this.fairsRepository.getFairById(fairId);
  }
}
