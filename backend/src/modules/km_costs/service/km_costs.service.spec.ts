import { Test, TestingModule } from '@nestjs/testing';
import { Km_costsService } from './km_costs.service';

describe('KmServiceService', () => {
  let service: Km_costsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Km_costsService],
    }).compile();

    service = module.get<Km_costsService>(Km_costsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
