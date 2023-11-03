import { Module } from '@nestjs/common';
import { LoggerService } from './loggerfile';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class SharedmoduleModule {}
