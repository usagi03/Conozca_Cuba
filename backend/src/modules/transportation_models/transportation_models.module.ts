import { Module } from '@nestjs/common';
import { TransportationModelController } from './controller/transportation_model.controller';
import { TransportationModelsService } from './service/transportation_models..service';

@Module({
  controllers: [TransportationModelController],
  providers: [TransportationModelsService]
})
export class TransportationModelsModule {}
