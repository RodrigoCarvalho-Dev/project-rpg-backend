import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDto {

  @IsString()
  @IsNotEmpty()
  token : string;

  @IsNotEmpty()
  username : string;

  @IsEmail()
  email : string;

  @IsNotEmpty()
  @MinLength(6)
  password : string;

}
