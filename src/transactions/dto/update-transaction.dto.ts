import { IsOptional } from "class-validator";
import { Transaction_type } from "generated/prisma/enums";

export class UpdateTransactionDto{
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