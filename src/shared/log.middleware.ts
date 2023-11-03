import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/common/loggerfile';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) { }
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    const startTime = process.hrtime();

    res.on('finish', () => {
      const totalTime = process.hrtime(startTime);
      const totalTimeInMs = totalTime[0] * 1000 + totalTime[1] / 1e6;
      this.logger.log(`for end point ${req.path} is Completed in ${totalTimeInMs}ms`);
      console.log(totalTimeInMs);
    });
    next();
  }
}
