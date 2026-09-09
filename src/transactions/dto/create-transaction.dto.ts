import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Transaction_type } from "generated/prisma/enums";

export class CreateTransactionDto{
//       id              Int              @id @default(autoincrement())
//   type            Transaction_type @default(expense)
//   amount          Int
//   description     String
//   transactionDate DateTime         @default(now())
//   createdAt       DateTime         @default(now())

//   accountId       Int
//   account         Account          @relation(fields: [accountId], references: [id])

//   categoryId      Int
//   category        Category        @relation(fields:[categoryId], references:[id])
    @ApiProperty({
        example: 'Expense',
        description: 'Transaction type'
    })
    @IsString()
    type: Transaction_type;

    @ApiProperty({
        example: 'Grocery shopping',
        description: 'Transaction description'
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        example: 50000,
        description: 'Transaction amount'
    })
    @IsNumber()
    amount: number;

    @ApiProperty({
        example: 1,
        description: 'ID of the category associated with the transaction'
    })
    @IsNumber()
    categoryId: number;

    @ApiProperty({
        example: 1,
        description: 'ID of the account associated with the transaction'
    })
    @IsNumber()
    accountId: number;
}