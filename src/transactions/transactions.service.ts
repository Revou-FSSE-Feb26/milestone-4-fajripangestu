import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
        const account = await this.transactionsRepository.getAccountBalanceById(dto.accountId);
        const category = await this.transactionsRepository.getCategoryName(dto.categoryId);
        
        if(!account){
            return new NotFoundException(`Account with id ${dto.accountId} not found`);
        }

        if(!category){
            return new NotFoundException(`Category with id ${dto.accountId} not found`);
        }
        
        if (dto.type=="expense"){
            if (account.balance < dto.amount || account.balance==0){
                return new BadRequestException('Unsufficient balance')
            }

            const newBalance = account.balance-dto.amount;
            return this.transactionsRepository.createTransaction({
                type: dto.type,
                amount: dto.amount,
                description: dto.description,
                accountId: dto.accountId,
                categoryId: dto.categoryId
            }, newBalance);
        }

        if(dto.type=="income"){
            const newBalance=account.balance+dto.amount;
            return this.transactionsRepository.createTransaction({
                type: dto.type,
                amount: dto.amount,
                description: dto.description,
                accountId: dto.accountId,
                categoryId: dto.categoryId
            }, newBalance);
        }
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
