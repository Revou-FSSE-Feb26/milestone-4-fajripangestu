import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    getAllCategories() {
        return this.categoriesRepository.getAllCategories();
    }

    getCategoryById(id: number){
        return this.categoriesRepository.getCategoryById(id);
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
