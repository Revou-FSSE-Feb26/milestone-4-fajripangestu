import {Injectable} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesRepository {
    constructor(private readonly prisma: PrismaService) {}

    getAllCategories() {
        return this.prisma.category.findMany();
    }

    getCategoryById(id: number) {
        return this.prisma.category.findUnique({
            where: {
                id: id,
            },
        });
    }

    createCategory(dto: CreateCategoryDto){
        return this.prisma.category.create({data: dto})
    }

    updateCategory(id: number, dto: UpdateCategoryDto){
        return this.prisma.category.update(
            {
                where:{id},
                data: dto
            }
        );
    }

    async deleteCategory(id: number){
        const deletedCategory = await this.prisma.category.delete(
            {
                where: {id},
            }
        )

        if(deletedCategory){
            return {
                message: "Record deleted",
                status: 203,
                id: id,
            }
        }
    }
}