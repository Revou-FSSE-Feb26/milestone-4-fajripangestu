import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
    constructor(private readonly accountsRepository: AccountsRepository) {}

    getAllAccounts() {
        return this.accountsRepository.getAllAccounts();
    }

    async getAccountById(id: number){
        const account = await this.accountsRepository.getAccountById(id);

        if (!account)
            throw new NotFoundException(`Account with ID ${id} not found`)

        return account;
    }

    createAccount(dto: CreateAccountDto){
        return this.accountsRepository.createAccount(dto);
    }

    updateAccount(id: number, dto: UpdateAccountDto){
        const account=this.accountsRepository.getAccountById(id);
        if(!account){
            throw new NotFoundException();
        }

        return this.accountsRepository.updateAccount(id, dto);
    }

    deleteAccount(id: number){
        const account=this.accountsRepository.getAccountById(id);
        if(!account){
            throw new NotFoundException();
        }

        return this.accountsRepository.deleteAccount(id);
    }
}
