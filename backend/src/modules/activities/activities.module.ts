import { Module } from '@nestjs/common';
import { ActivitiesController } from './controller/activities.controller';
import { ActivitiesService } from './service/activities.service';
import { TransportationModelsController } from './controller/activities.transportation_models/controller/transportation_models/transportation_models.controller';

@Module({
  controllers: [ActivitiesController, TransportationModelsController],
  providers: [ActivitiesService]
})
export class ActivitiesModule {}
