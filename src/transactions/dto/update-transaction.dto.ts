import { IsOptional } from "class-validator";
import { Transaction_type } from "generated/prisma/enums";
import { PartialType } from "@nestjs/swagger";
import { CreateTransactionDto } from "./create-transaction.dto";

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @IsOptional()
    type: Transaction_type;

    @IsOptional()
    description: string;

    @IsOptional()
    amount: number;

    @IsOptional()
    categoryId: number;

    @IsOptional()
    accountId: number;
}