import { Module } from '@nestjs/common';
import { Meal_PlansService } from './service/meal_plans.service';
import { Meal_plansController } from './controller/meal_plans.controller';

@Module({
  controllers: [Meal_plansController],
  providers: [Meal_PlansService]
})
export class MealPlansModule {}
