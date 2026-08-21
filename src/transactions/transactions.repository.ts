import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { Prisma } from "@prisma/client/extension";

@Injectable()
export class TransactionsRepository {
    constructor(private readonly prisma: PrismaService) {}

    getAllTransactions() {
        return this.prisma.transaction.findMany();
    }
    getTransactionById(id: number) {
        return this.prisma.transaction.findUnique({
            where: {
                id: id,
            },
        });
    }

    getAccountBalanceById(accountId: number){
        return this.prisma.account.findUnique({
            where: {id: accountId},
            select: {
                balance: true,
            },
        });
    }

    getCategoryName(categoryId: number){
        return this.prisma.category.findUnique({
            where: {id: categoryId},
            select: {
                name: true,
            },
        });
    }

    createTransaction(dto: CreateTransactionDto, newBalance){
        return (
            this.prisma.$transaction([
                this.prisma.transaction.create({
                    data: dto,
                    include: {
                        account: true,
                        category: true
                    },
                }),
            ]),
            this.prisma.account.update({
                where: {
                    id:dto.accountId,
                },
                data: {
                    balance: newBalance,
                }
            })
        );

    }

    updateTransaction(id: number, dto: UpdateTransactionDto){
        return this.prisma.transaction.update(
            {
                where: {id},
                data: dto
            }
        );
    }

    async deleteTransaction(id: number){
        const deletedTransaction = await this.prisma.transaction.delete(
            {
                where: {id},
            }
        )

        if (deletedTransaction){
            return{
                message: "Record deleted",
                status: 203,
                id: id,
            }
        }
    }
}