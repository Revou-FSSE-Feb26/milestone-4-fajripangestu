import { IsString, MaxLength } from "class-validator";
import { Category_type } from "generated/prisma/enums";

export class CreateCategoryDto{
    // id   Int           @id @default(autoincrement())
    // name String
    // type Category_type @default(expense)
    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    type: Category_type;
}