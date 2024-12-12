import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsOptional()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
