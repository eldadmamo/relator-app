import { IsString, IsNotEmpty, IsEmail, MinLength, Matches, IsNumber } from "class-validator";

export class SignupDto {
   @IsString()
   @IsNotEmpty()
   name: string

   @IsNumber()
   phone: number;

   @IsEmail()
   email: string;

   @IsString()
   @MinLength(5)
   password: string;
}