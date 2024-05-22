import { Test, TestingModule } from '@nestjs/testing';
import { Meal_plansController } from './meal_plans.controller';

describe('Meal_plansController', () => {
  let controller: Meal_plansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Meal_plansController],
    }).compile();

    controller = module.get<Meal_plansController>(Meal_plansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
