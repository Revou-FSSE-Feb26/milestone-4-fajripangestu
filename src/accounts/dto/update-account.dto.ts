import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Account_type } from "generated/prisma/enums";
import { PartialType } from "@nestjs/swagger";
import { CreateAccountDto } from "./create-account.dto";

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
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