import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty({
        example: 'Mandiri',
        description: 'Account name'
    })
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        example: 'Bank', description: 'Type of account'})
    @IsString()
    type: Account_type;

    @ApiProperty({
        example: 1000000,
        description: 'Account balance'})
    @IsNumber()
    balance: number;

    @ApiProperty({
        example: 1,
        description: 'ID of the user who owns the account'
    })
    @IsNumber()
    userId: number;
}