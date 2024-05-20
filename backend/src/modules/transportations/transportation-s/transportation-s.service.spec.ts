import { Test, TestingModule } from '@nestjs/testing';
import { TransportationSService } from './transportation-s.service';

describe('TransportationSService', () => {
  let service: TransportationSService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportationSService],
    }).compile();

    service = module.get<TransportationSService>(TransportationSService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
