import { Module } from '@nestjs/common';
import { FairsController } from './fairs.controller';
import { FairsService } from './fairs.service';
import { FairsRepository } from './fairs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fair } from './fairs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fair])],
  controllers: [FairsController],
  providers: [FairsService, FairsRepository]
})
export class FairsModule {}
