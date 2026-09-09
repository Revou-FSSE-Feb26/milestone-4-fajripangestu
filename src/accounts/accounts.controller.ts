import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all accounts' })
  @ApiResponse({
    status: 200,
    description: 'List of accounts retrieved successfully.'
  })
  getAllAccounts() {
    return this.accountsService.getAllAccounts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get account by ID' })
  @ApiResponse({
    status: 200,
    description: 'Account found.'
  })
  @ApiResponse({
    status: 404,
    description: 'Account not found.'
  })
  getAccountById(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.getAccountById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({
    status: 201,
    description: 'Account created successfully.'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.'
  })
  createAccount(@Body() dto: CreateAccountDto) {
    return this.accountsService.createAccount(dto);
  }
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update an account' })
  @ApiResponse({
    status: 200,
    description: 'Account updated successfully.'
  })
  @ApiResponse({
    status: 404,
    description: 'Account not found.'
  })
  updateAccount(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAccountDto) {
    return this.accountsService.updateAccount(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an account' })
  @ApiResponse({
    status: 200,
    description: 'Account deleted successfully.'
  })
  @ApiResponse({
    status: 404,
    description: 'Account not found.'
  })
  deleteAccount(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.deleteAccount(id);
  }
}
