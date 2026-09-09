import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class Categories2Service {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    getAllCategories() {
        return this.categoriesRepository.getAllCategories();
    }

    async getCategoryById(id: number){
        const category = await this.categoriesRepository.getCategoryById(id);

        if(!category)
            return new NotFoundException(`Category with ID ${id} not found`)

        return category;
    }

    createCategory(dto: CreateCategoryDto){
        return this.categoriesRepository.createCategory(dto);
    }

    updateCategory(id: number, dto: UpdateCategoryDto){
        const category = this.categoriesRepository.getCategoryById(id);
        if(!category){
            throw new NotFoundException();
        }

        return this.categoriesRepository.updateCategory(id,dto);
    }

    deleteCategory(id: number){
        const category = this.categoriesRepository.getCategoryById(id);
        if(!category){
            throw new NotFoundException();
        }

        return this.categoriesRepository.deleteCategory(id);
    }
}
