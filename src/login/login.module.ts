import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { SharedModule } from 'src/shared/shared.module';
import { SharedmoduleModule } from 'src/common/logger.module';

@Module({
  imports:[SharedModule,SharedmoduleModule],
  controllers: [LoginController],
  providers: [LoginService,],
})
export class LoginModule {}
