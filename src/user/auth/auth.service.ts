import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import {UserType, } from "@prisma/client"

interface SignupParams {
    email:string;
    password: string;
    name: string;
    phone: string;
}

interface SigninParams {
    email: string,
    password: string
}

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService){}
    
   async signup({email,password,phone, name}: SignupParams){
    const userExists = await this.prismaService.user.findUnique({
        where:{
            email,
        }
    })

    if(userExists){
        throw new ConflictException();
    }

    const hashPassword = await bcrypt.hash(password,10);

    const user = await this.prismaService.user.create({
        data: {
            email,
            name, 
            phone,
            password: hashPassword,
            user_type: UserType.BUYER
        }
    });

    const token = await this.generateJWT(name, user.id);

    return token;
  }

  async signin({email,password}: SigninParams) {
    const user = await this.prismaService.user.findUnique({
        where:{
            email
        }
    })

    if(!user){
        throw new HttpException("Invalid credentials",400);
    }

    const hashPassword = user.password;

    const isValidPassword = await bcrypt.compare(password, hashPassword);

    if(!isValidPassword){
        throw new HttpException("Invalid credentials",400);
    }

    const token = await this.generateJWT(user.name, user.id);
    
    return token;

  }

  private generateJWT(name:string, id:number){
    return jwt.sign({
        name,
        id,
    }, process.env.JSON_TOKEN_KEY,{
        expiresIn: 3600000
    })
  }

  generateProductKey(email: string, userType: UserType){
    const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`

    return bcrypt.hash(string, 10);
  }

}


 

