import { Test, TestingModule } from '@nestjs/testing';
import { TransportationsService } from './transportations.service';

describe('TransportationSService', () => {
  let service: TransportationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportationsService],
    }).compile();

    service = module.get<TransportationsService>(TransportationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
