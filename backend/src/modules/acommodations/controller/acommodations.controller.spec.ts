import { Test, TestingModule } from '@nestjs/testing';
import { AcommodationsController } from './acommodations.controller';

describe('AcommodationsController', () => {
  let controller: AcommodationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcommodationsController],
    }).compile();

    controller = module.get<AcommodationsController>(AcommodationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
