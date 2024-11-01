import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface SignupParams {
    email:string;
    password: string;
    name: string;
    phone:number;
}

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService){}
    
   async signup({}: SignupParams){
    const userExists = await this.prismaService
    }
}
