import { IsEmail, IsString } from "class-validator";
import { Role } from "generated/prisma/enums";

export class RegisterDto {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsString()
    name: string;
    @IsString()
    role: Role;
}
