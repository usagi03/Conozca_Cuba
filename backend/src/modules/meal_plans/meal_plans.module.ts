import { Module } from '@nestjs/common';
import { Meal_PlansService } from './service/meal_plans.service';
import { Meal_plansController } from './controller/meal_plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal_plan } from './plans.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meal_plan])],
  controllers: [Meal_plansController],
  providers: [Meal_PlansService]
})
export class MealPlansModule {}
