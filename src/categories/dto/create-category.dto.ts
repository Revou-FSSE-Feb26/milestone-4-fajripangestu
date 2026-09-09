import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";
import { Category_type } from "generated/prisma/enums";

export class CreateCategoryDto{
    // id   Int           @id @default(autoincrement())
    // name String
    // type Category_type @default(expense)
    @ApiProperty({
        example: 'Salary',
        description: 'Category name'
    })
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        example: 'Income',
        description: 'Category type'
    })
    @IsString()
    type: Category_type;
}