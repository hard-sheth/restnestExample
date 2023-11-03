import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  Scope,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    console.log(token, "token");
    if (token) {
      try {
        const tokentest = token.slice(7);
        console.log(tokentest);
        const decoded = this.jwtService.verify(tokentest);
        console.log("decoded", decoded);

        return true;
      } catch (err) {
        if(err.expiredAt){
          const message=`Sorry! token expired`
          throw new HttpException({ message, code:419 }, 419);
        }
        
        return false;
      }
      // const authorised=await this.jwtService.verify(token)
      // console.log(authorised,"authorised");
    } else {
      throw new UnauthorizedException();
    }
  }
}
