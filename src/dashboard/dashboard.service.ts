import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
    usreInfo(){
        return {
            username:"hard",
            password:"Test@123"
        }
    }
}
