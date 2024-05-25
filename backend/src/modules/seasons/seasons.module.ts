import { Module } from '@nestjs/common';
import { SeasonsController } from './controller/seasons.controller';
import { SeasonsService } from './service/seasons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from './seasons.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Season])],
  controllers: [SeasonsController],
  providers: [SeasonsService]
})
export class SeasonsModule {}
