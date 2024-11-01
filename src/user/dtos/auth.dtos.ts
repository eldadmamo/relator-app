import { IsString, IsNotEmpty, IsEmail, MinLength, Matches, IsNumber } from "class-validator";

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