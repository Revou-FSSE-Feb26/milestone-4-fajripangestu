import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Role } from "generated/prisma/enums";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthRepository {
    constructor(private readonly prisma: PrismaService) {}

    // private password: string = 'password123';
    // private name: string = 'admin';
    // private hash: string = bcrypt.hashSync(this.password, 10);

    getEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {email},
            select: {email: true, id: true},
        });
    }

    async getPassword(email: string){
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: { password: true },
        });
        return user?.password || null;
    }

    createUser(name: string, email: string, password: string, role: Role) {
        return this.prisma.user.create({
            data: {
                name,
                email,
                password,
                role
            }
        });
    }
}