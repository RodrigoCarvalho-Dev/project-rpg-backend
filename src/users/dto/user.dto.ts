import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserDto {
    
    @IsNotEmpty()
    username : string;

    @IsEmail()
    email : string;

    @IsNotEmpty()
    @MinLength(6)
    password : string;
}