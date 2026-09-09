import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountsRepository } from 'src/accounts/accounts.repository';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, AuthModule, JwtModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository, PrismaService, AccountsRepository, CategoriesRepository,JwtAuthGuard],
})

export class TransactionsModule {}
