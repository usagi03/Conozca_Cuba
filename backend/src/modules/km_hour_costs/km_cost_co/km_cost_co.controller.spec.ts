import { Test, TestingModule } from '@nestjs/testing';
import { KmCostCoController } from './km_cost_co.controller';

describe('KmCostCoController', () => {
  let controller: KmCostCoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KmCostCoController],
    }).compile();

    controller = module.get<KmCostCoController>(KmCostCoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
