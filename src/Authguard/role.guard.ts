import {  CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request:Request=context.switchToHttp().getRequest()
      console.log(request.headers,);
      const token=request.headers.authorization
      // const authorised=this.jwtService.verifyAsync(token)
      // console.log(authorised,"authorised");
      
      if(request.headers.authorization){
        return true;
      }
      else{
         throw new UnauthorizedException()
      }
    } catch (error) {
      
    }
  }
}
