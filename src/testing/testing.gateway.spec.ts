import { Test, TestingModule } from '@nestjs/testing';
import { TestingGateway } from './testing.gateway';
import { TestingService } from './testing.service';

describe('TestingGateway', () => {
  let gateway: TestingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestingGateway, TestingService],
    }).compile();

    gateway = module.get<TestingGateway>(TestingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
