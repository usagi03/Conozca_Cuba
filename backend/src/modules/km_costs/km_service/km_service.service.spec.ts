import { Test, TestingModule } from '@nestjs/testing';
import { KmServiceService } from './km_service.service';

describe('KmServiceService', () => {
  let service: KmServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KmServiceService],
    }).compile();

    service = module.get<KmServiceService>(KmServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
