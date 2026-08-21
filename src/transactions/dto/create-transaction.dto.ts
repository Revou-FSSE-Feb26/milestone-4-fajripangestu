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
    @IsString()
    type: Transaction_type;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    amount: number;

    @IsNumber()
    categoryId: number;

    @IsNumber()
    accountId: number;
}