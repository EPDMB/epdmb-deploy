import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fair } from './entities/fairs.entity';
import { Repository } from 'typeorm';
import { FairDto } from './fairs.dto';

@Injectable()
export class FairsRepository {
  constructor(
    @InjectRepository(Fair) private readonly fairRepository: Repository<Fair>,
  ) {}

  async createFair(fairDto: FairDto): Promise<Fair> {
    const newFair = this.fairRepository.create(fairDto);
    return await this.fairRepository.save(newFair);
  }

  async getAllFairs() {
    return await this.fairRepository.find();
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
    const fair = await this.fairRepository.findOneBy({ id: fairId });
    if (!fair) throw new NotFoundException('Feria no encontrada');
    return fair;
}
}
