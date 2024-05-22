import { Test, TestingModule } from '@nestjs/testing';
import { TransportationModelController } from './transportation_model.controller';

describe('TransportationModelController', () => {
  let controller: TransportationModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportationModelController],
    }).compile();

    controller = module.get<TransportationModelController>(TransportationModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
