import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({
    status: 200,
    description: 'List of transactions retrieved successfully.'
  })
  getAllTransactions() {
    return this.transactionsService.getAllTransactions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiResponse({
    status: 200,
    description: 'Transaction found.'
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found.'
  })
  getTransactionById(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.getTransactionById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully.'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.'
  })
  createTransaction(@Body() dto: CreateTransactionDto) {
    return this.transactionsService.createTransaction(dto)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a transaction' })
  @ApiResponse({
    status: 200,
    description: 'Transaction updated successfully.'
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found.'
  })
  updateTransaction(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTransactionDto) {
    return this.transactionsService.updateTransaction(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiResponse({
    status: 200,
    description: 'Transaction deleted successfully.'
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found.'
  })
  deleteTransaction(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.deleteTransaction(id);
  }  
}
