import { Controller, Get, Param, Body, ParseIntPipe, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
//import { CurrentUser } from 'src/auth/current-user.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully.'
  })
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('current')
  // getCurrentUser(@CurrentUser() user:{sub: number}){
  //   return this.usersService.getUserById(user.sub)
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully.'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.'
  })
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.'
  })
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.'
  })
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully.'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.'
  })
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}