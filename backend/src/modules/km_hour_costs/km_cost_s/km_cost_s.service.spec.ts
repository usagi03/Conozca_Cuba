import { Test, TestingModule } from '@nestjs/testing';
import { KmCostSService } from './km_cost_s.service';

describe('KmCostSService', () => {
  let service: KmCostSService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KmCostSService],
    }).compile();

    service = module.get<KmCostSService>(KmCostSService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
