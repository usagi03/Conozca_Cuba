import { Test, TestingModule } from '@nestjs/testing';
import { RouteCoController } from './routes.controller';

describe('RouteCoController', () => {
  let controller: RouteCoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RouteCoController],
    }).compile();

    controller = module.get<RouteCoController>(RouteCoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
