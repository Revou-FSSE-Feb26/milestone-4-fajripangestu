import { IsEmail, IsString, Matches, MaxLength } from "class-validator";
import { Role } from "generated/prisma/client";

export class CreateUserDto {
    @IsString()
    @MaxLength(50)
    name     : string;
    @IsEmail()
    email    : string;
    @Matches('^[a-zA-Z0-9]+$','i',{message: 'Password must contain only alphanumeric characters'})
    password : string;
    @IsString()
    @MaxLength(50)
    role     : Role;
}