
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FairsController } from '../fairs/fairs.controller';
import { Fair } from '../fairs/fairs.entity';
import { FairsService } from '../fairs/fairs.service';


@Module({
  imports: [TypeOrmModule.forFeature([Fair])],
  controllers: [FairsController],
  providers: [FairsService],
})
export class AdminModule {}
