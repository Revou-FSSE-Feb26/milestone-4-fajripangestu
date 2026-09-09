import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of categories retrieved successfully.'
  })
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Category found.'
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.'
  })
  getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully.'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.'
  })
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully.'
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.'
  })
  updateCategory(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({
    status: 200,
    description: 'Category deleted successfully.'
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.'
  })
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
