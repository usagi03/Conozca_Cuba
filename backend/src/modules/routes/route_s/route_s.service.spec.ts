import { Test, TestingModule } from '@nestjs/testing';
import { RouteSService } from './route_s.service';

describe('RouteSService', () => {
  let service: RouteSService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RouteSService],
    }).compile();

    service = module.get<RouteSService>(RouteSService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
