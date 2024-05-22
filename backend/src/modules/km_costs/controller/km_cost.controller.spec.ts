import { Test, TestingModule } from '@nestjs/testing';
import { KmControlerController } from './km_costs.controller';

describe('KmControlerController', () => {
  let controller: KmControlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KmControlerController],
    }).compile();

    controller = module.get<KmControlerController>(KmControlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
