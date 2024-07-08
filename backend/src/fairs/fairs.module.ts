import { Module } from '@nestjs/common';
import { FairsController } from './fairs.controller';
import { FairsService } from './fairs.service';
import { FairsRepository } from './fairs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fair } from './entities/fairs.entity';
import { BuyerCapacity } from './entities/buyersCapacity.entity';
import { Category } from 'src/categories/categories.entity';
import { FairDay } from './entities/fairDay.entity';
import { FairCategory } from './entities/fairCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fair, BuyerCapacity, Category, FairDay, FairCategory])],
  controllers: [FairsController],
  providers: [FairsService, FairsRepository]
})
export class FairsModule {}
