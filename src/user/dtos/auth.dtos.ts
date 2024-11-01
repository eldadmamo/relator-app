import { UserType } from "@prisma/client";
import { IsString, IsNotEmpty, IsEmail, MinLength, Matches, IsNumber, IsEnum } from "class-validator";

export class SignupDto {
   @IsString()
   @IsNotEmpty()
   name: string

   @IsString()
   phone: string;

   @IsEmail()
   email: string;

   @IsString()
   @MinLength(5)
   password: string;
}

export class SigninDto{
    @IsEmail()
    email: string;
 
    @IsString()
    password: string;
}

export class GenerateProductKeyDto {
    @IsString()
    email:string;

    @IsEnum(UserType)
    userType: UserType

}