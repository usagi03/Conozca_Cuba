import { Test, TestingModule } from '@nestjs/testing';
import { Km_hours_costsController } from './km_hours_costs.controller';

describe('Km_hours_costsController', () => {
  let controller: Km_hours_costsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Km_hours_costsController],
    }).compile();

    controller = module.get<Km_hours_costsController>(Km_hours_costsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
