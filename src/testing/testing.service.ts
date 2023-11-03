import { Injectable } from '@nestjs/common';

@Injectable()
export class TestingService {
  welcomeMsg() {
    return `Hello welcome User.`;
  }
  joinRoom() {
    return `User is joining Room`;
  }
}
