import { IsEmail, IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  phoneNumber: string;
}