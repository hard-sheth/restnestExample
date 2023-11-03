import { Module, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { AuthGuard } from 'src/Authguard/auth.guard';

@Module({
 
  controllers: [DashboardController],
  providers: [DashboardService,
    // {provide:'APP_GUARD',useClass:AuthGuard}
  ],
})
export class DashboardModule {}
