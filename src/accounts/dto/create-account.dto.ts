import { IsNumber, IsString, MaxLength } from "class-validator";
import { Account_type } from "generated/prisma/enums";
//   id        Int          @id @default(autoincrement())
//   name      String
//   type      Account_type @default(bank)
//   balance   Int
//   createdAt DateTime     @default(now())
//   userId    Int
//   user      User         @relation(fields: [userId], references: [id])

export class CreateAccountDto{
    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    type: Account_type;

    @IsNumber()
    balance: number;

    @IsNumber()
    userId: number;
}