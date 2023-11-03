import { Module } from '@nestjs/common';
import { TestingService } from './testing.service';
import { TestingGateway } from './testing.gateway';

@Module({
  providers: [TestingGateway, TestingService],
})
export class TestingModule {}
