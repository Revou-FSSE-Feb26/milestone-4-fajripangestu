import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Account_type } from "generated/prisma/enums";

export class UpdateAccountDto{
    @IsString()
    @MaxLength(50)
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    type: Account_type;

    @IsNumber()
    @IsOptional()
    balance: number;

    @IsNumber()
    @IsOptional()
    userId: number;
}