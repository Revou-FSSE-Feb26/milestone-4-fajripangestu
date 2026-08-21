import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { connect } from 'http2';

@Injectable()
export class TransactionsService {
    constructor(private readonly transactionsRepository: TransactionsRepository) {}

    getAllTransactions() {
        return this.transactionsRepository.getAllTransactions();
    }

    getTransactionById(id: number){
        return this.transactionsRepository.getTransactionById(id);
    }

    async createTransaction(dto: CreateTransactionDto){
        const account = this.transactionsRepository.getAccountBalanceById(dto.accountId);
        const category = this.transactionsRepository.getCategoryName(dto.categoryId);

        if(!account){
            return new NotFoundException(`Account with id ${dto.accountId} not found`);
        }

        if(!category){
            return new NotFoundException(`Category with id ${dto.accountId} not found`);
        }

        return this.transactionsRepository.createTransaction({
            type: dto.type,
            amount: dto.amount,
            description: dto.description,
            accountId: dto.accountId,
            categoryId: dto.categoryId
        });
    }

    updateTransaction(id: number, dto: UpdateTransactionDto){
        const transaction = this.transactionsRepository.getTransactionById(id);
        if(!transaction){
            throw new NotFoundException();
        }

        return this.transactionsRepository.updateTransaction(id, dto);
    }

    deleteTransaction(id: number){
        const transaction = this.transactionsRepository.getTransactionById(id);
        if(!transaction){
            throw new NotFoundException();
        }

        return this.transactionsRepository.deleteTransaction(id);
    }
}
