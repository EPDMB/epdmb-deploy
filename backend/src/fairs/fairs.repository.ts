import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fair } from './entities/fairs.entity';
import { Repository } from 'typeorm';
import { FairDto } from './fairs.dto';
import { BuyerCapacity } from './entities/buyersCapacity.entity';

@Injectable()
export class FairsRepository {
  constructor(
    @InjectRepository(Fair) private readonly fairRepository: Repository<Fair>,
    @InjectRepository(BuyerCapacity) private readonly buyerCapacityRepository: Repository<BuyerCapacity>,
  ) {}

  async createFair(fairDto: FairDto): Promise<Fair> {
    const { buyerCapacities, ...fairData } = fairDto;

    const newFair = await this.fairRepository.save(fairData);
  
    if (buyerCapacities && buyerCapacities.length > 0) {
      for (const capacity of buyerCapacities) {
        const buyerCapacity = new BuyerCapacity();
        buyerCapacity.hour = capacity.hour;
        buyerCapacity.capacity = capacity.capacity;
        buyerCapacity.fair = newFair;
        await this.buyerCapacityRepository.save(buyerCapacity);
      }
    }
  
    return newFair;
  }
  
  async getAllFairs() {
    return await this.fairRepository.find({relations: ["buyerCapacities"]});
  }

  async updateFair(fair: FairDto, fairId: string) {
    const fairToUpdate = await this.fairRepository.findOneBy({ id: fairId });
    if (!fairToUpdate) throw new NotFoundException('Feria no encontrada');

    Object.assign(fairToUpdate, fair);
    await this.fairRepository.save(fairToUpdate);
    return { message: 'Feria actualizada correctamente', fairToUpdate };
  }

  async deleteFair(fairId: string) {
    const fairToDelete = await this.fairRepository.findOneBy({ id: fairId });
    if (!fairToDelete) throw new NotFoundException('Feria no encontrada');
    await this.fairRepository.remove(fairToDelete);
    return { message: 'Feria eliminada correctamente', fairToDelete };
  }

  async getFairById(fairId: string) {
    const fair = await this.fairRepository.findOne({ where: {id: fairId}, relations: ['buyerCapacities']});
    if (!fair) throw new NotFoundException('Feria no encontrada');
    return fair;
  }

  async saveFair(fair) {
    return await this.fairRepository.save(fair);
  }

  async closeFair(fairId: string){
    const fairToUpdate = await this.fairRepository.findOneBy({ id: fairId });
    if (!fairToUpdate) throw new NotFoundException('Feria no encontrada');
    //ACA VAN LAS OPERACIONES DE CERRAR LA FERIA
  }
}
