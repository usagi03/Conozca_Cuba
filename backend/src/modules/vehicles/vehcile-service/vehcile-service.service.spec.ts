import { Test, TestingModule } from '@nestjs/testing';
import { VehcileServiceService } from './vehcile-service.service';

describe('VehcileServiceService', () => {
  let service: VehcileServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehcileServiceService],
    }).compile();

    service = module.get<VehcileServiceService>(VehcileServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
