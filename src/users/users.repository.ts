import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}
    
    getAllUsers() {
        return this.prisma.user.findMany();
    }

    getUserById(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    }

    createUser(dto: CreateUserDto) {
        return this.prisma.user.create({data: dto});
    }

    updateUser(id: number, dto: UpdateUserDto) {
        return this.prisma.user.update(
        {
            where: {id},
            data: dto
        });
    }

    async deleteUser(id: number) {
        const deletedUser = await this.prisma.user.delete(
            {
                where: {id},
            }
        )
        
        if (deletedUser) {
            return {
                message: "Record deleted",
                status: 203,
                id: id,
            }
        }
    }
}