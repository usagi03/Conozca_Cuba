import { Module } from '@nestjs/common';
import { ActivitiesController } from './controller/activities.controller';
import { ActivitiesService } from './service/activities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Daily_activity } from './activities.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Daily_activity])],
  controllers: [ActivitiesController],
  providers: [ActivitiesService]
})
export class ActivitiesModule {}
