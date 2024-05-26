import { Module } from '@nestjs/common';
import { SeasonsController } from './controller/seasons.controller';
import { SeasonsService } from './service/seasons.service';

@Module({
  controllers: [SeasonsController],
  providers: [SeasonsService]
})
export class SeasonsModule {}
