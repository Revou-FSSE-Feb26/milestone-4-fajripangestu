import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";

@Injectable()
export class AccountsRepository {
    constructor(private readonly prisma: PrismaService) {}

    getAllAccounts() {
        return this.prisma.account.findMany();
    }

    getAccountById(id: number) {
        return this.prisma.account.findUnique({
            where: {
                id: id,
            },
        });
    }

    createAccount(dto: CreateAccountDto) {
        return this.prisma.account.create({data: dto});
    }

    updateAccount(id: number, dto: UpdateAccountDto){
        return this.prisma.account.update(
            {
                where: {id},
                data: dto
            }
        )
    }

    async deleteAccount(id: number){
        const deletedAccount = await this.prisma.account.delete(
            {
                where: {id},
            }
        )

        if (deletedAccount){
            return {
                message: "Record deleted",
                status: 203,
                id: id,
            }
        }
    }
}