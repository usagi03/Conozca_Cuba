import { Test, TestingModule } from '@nestjs/testing';
import { Meal_PlansService } from './meal_plans.service';

describe('MealPlansServiceService', () => {
  let service: Meal_PlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Meal_PlansService],
    }).compile();

    service = module.get<Meal_PlansService>(Meal_PlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
