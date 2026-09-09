import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories2Service } from './categories2.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CategoriesController],
  providers: [
    {
    provide: CategoriesService,
    useClass: Categories2Service
  },
    CategoriesRepository, PrismaService],
})

export class CategoriesModule {}
