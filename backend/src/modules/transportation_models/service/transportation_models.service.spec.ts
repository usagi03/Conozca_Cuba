import { Test, TestingModule } from '@nestjs/testing';
import { TransportationModelsService } from './transportation_models..service';

describe('TransportationModelsService', () => {
  let service: TransportationModelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportationModelsService],
    }).compile();

    service = module.get<TransportationModelsService>(TransportationModelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
