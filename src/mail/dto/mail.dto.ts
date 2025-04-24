import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class MailDto {

    @IsEmail()
    to : string;

    @IsString()
    @IsNotEmpty()
    subject : string;

    @IsString()
    @IsNotEmpty()
    html : string;

    @IsString()
    @IsNotEmpty()
    text : string;


}