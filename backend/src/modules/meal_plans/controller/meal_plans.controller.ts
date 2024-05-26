import { Body, Controller, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { Meal_plan } from '../plans.entity';
import { Meal_PlansService } from '../service/meal_plans.service';
import { CreatePlanDto } from '../dtos/create-plan.dto';
import { UpdatePlanDto } from '../dtos/update-plan.dto';

@Controller('meal_plans')
export class Meal_plansController {
    constructor(private readonly planService: Meal_PlansService){}

  @Get()
  getPlans(): Promise<Meal_plan[]> {
    return this.planService.getPlans();
  }

  @Get(':id_plan')
  getPlan(@Param('id_plan') id: number): Promise<Meal_plan> {
    return this.planService.getPlan(id);
  }

  @Post()
  createPlan(@Body() plan: CreatePlanDto): Promise<Meal_plan> {
    return this.planService.createPlan(plan);
  }

  @Patch(':id_plan')
  updatePlan(@Param('id_plan') id: number, @Body() plan: UpdatePlanDto) {
    return this.planService.updatePlan(id, plan);
  }

  @Delete(':id_plan')
  deletePlan(@Param('id_plan') id: number): Promise<string> {
    return this.planService.removePlan(id);
  }
}
