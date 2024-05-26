import { Module } from '@nestjs/common';
import { RoomsController } from './controller/rooms.controller';
import { RoomsService } from './service/rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './rooms.entity';
import { Meal_plan } from '../meal_plans/plans.entity';
import { MealPlansModule } from '../meal_plans/meal_plans.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Meal_plan]), MealPlansModule],
  controllers: [RoomsController],
  providers: [RoomsService]
})
export class RoomsModule {}
