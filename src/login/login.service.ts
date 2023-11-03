import { Injectable } from "@nestjs/common";
import { CreateLoginDto } from "./dto/create-login.dto";
import { JwtService } from "@nestjs/jwt";
import { SharedService } from "src/shared/shared.service";

@Injectable()
export class LoginService {
  constructor(private readonly jwtService: JwtService,private readonly passwords:SharedService) {}
  async create(createLoginDto: CreateLoginDto) {
    // console.log(createLoginDto,"createLoginDto");
    const token = this.jwtService.sign(createLoginDto,{
      // expiresIn:"5000ms",
      // expiresIn: '60s' 
    });
    // Need to check whether it is considered as the seconds or not.
    const passEncrypt=await this.passwords.encryptPasswordbcrypt(createLoginDto.password);
    console.log(passEncrypt,"passencrypt>>>>");
    const passwordmatched=await this.passwords.comparePasswordbcrypt(createLoginDto.password+"asdfadasdf",passEncrypt)
    console.log("password matched",passwordmatched);
    
    return {
      token,
      user: createLoginDto.username,
    };
  }
}
