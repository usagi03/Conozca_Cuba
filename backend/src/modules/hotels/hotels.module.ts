import { Module } from '@nestjs/common';
import { SeasonsController } from '../seasons/controller/seasons.controller';
import { SeasonsService } from '../seasons/service/seasons.service';

@Module({
  controllers: [SeasonsController],
  providers: [SeasonsService]
})
export class HotelsModule {}
