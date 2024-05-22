import { Test, TestingModule } from '@nestjs/testing';
import { Km_hours_costsService } from './km_hours_costs.service';

describe('Km_hours_costsService', () => {
  let service: Km_hours_costsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Km_hours_costsService],
    }).compile();

    service = module.get<Km_hours_costsService>(Km_hours_costsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
