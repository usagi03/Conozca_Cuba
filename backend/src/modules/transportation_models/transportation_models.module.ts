import { Module } from '@nestjs/common';
import { TransportationModelsService } from './service/transportation_models..service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transportation_model } from './model.entity';
import { TransportationModelController } from './controller/transportation_model.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Transportation_model])],
  controllers: [TransportationModelController],
  providers: [TransportationModelsService],
  exports: [TransportationModelsService]
})
export class TransportationModelsModule {}
