import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { LoggerService } from 'src/common/loggerfile';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService,private readonly logg: LoggerService) {}

  @Post()
  create(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }

}
