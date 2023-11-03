import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'src/Authguard/auth.guard';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get()
  displayUserinfo(){
    return this.dashboardService.usreInfo()
  }
  @Get("info")
  userinfo(){
    return this.dashboardService.usreInfo()
  }
}
