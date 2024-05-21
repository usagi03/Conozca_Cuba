import { Test, TestingModule } from '@nestjs/testing';
import { ContractSService } from './contract-s.service';

describe('ContractSService', () => {
  let service: ContractSService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractSService],
    }).compile();

    service = module.get<ContractSService>(ContractSService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
