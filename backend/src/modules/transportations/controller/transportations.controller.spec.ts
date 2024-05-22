import { Test, TestingModule } from '@nestjs/testing';
import { TransportationCoController } from './transportations.controller';

describe('TransportationCoController', () => {
  let controller: TransportationCoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportationCoController],
    }).compile();

    controller = module.get<TransportationCoController>(TransportationCoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
