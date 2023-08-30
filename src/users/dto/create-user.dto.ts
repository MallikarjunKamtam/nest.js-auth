import {
  IsEmail,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 100)
  name: string;

  @Min(0)
  @IsNumber()
  age: number;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
