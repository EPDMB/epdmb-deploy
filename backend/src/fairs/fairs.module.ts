import { Module } from '@nestjs/common';
import { FairsController } from './fairs.controller';
import { FairsService } from './fairs.service';
import { FairsRepository } from './fairs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fair } from './entities/fairs.entity';
import { BuyerCapacity } from './entities/buyersCapacity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fair, BuyerCapacity])],
  controllers: [FairsController],
  providers: [FairsService, FairsRepository]
})
export class FairsModule {}
