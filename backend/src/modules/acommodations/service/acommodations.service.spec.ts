import { Test, TestingModule } from '@nestjs/testing';
import { AcommodationsService } from './acommodations.service';

describe('AcommodationsService', () => {
  let service: AcommodationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcommodationsService],
    }).compile();

    service = module.get<AcommodationsService>(AcommodationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
