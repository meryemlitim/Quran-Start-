import { IsEmail, IsString, MinLength, MaxLength, IsNumber, min, maxLength, max, Min, Max } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MaxLength(50)
  parentName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @MaxLength(50)
  childName: string;

  @IsNumber()
  @Min(3)
  @Max(16)
  childAge: number;
}