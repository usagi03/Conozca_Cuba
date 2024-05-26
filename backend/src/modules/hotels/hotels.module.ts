import { Module } from '@nestjs/common';
import { HotelsController } from './controller/hotels.controller';
import { HotelsService } from './service/hotels.service';
import { Hotel } from './hotels.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [HotelsService]
})
export class HotelsModule {}
