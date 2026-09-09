import {Test, TestingModule} from '@nestjs/testing';
import {TransactionsService} from './transactions.service';
import {TransactionsRepository} from './transactions.repository';
import {BadRequestException, NotFoundException} from '@nestjs/common';
import { after, afterEach, beforeEach, describe } from 'node:test';
import {PrismaService} from '../prisma/prisma.service';

describe('TransactionsService', () => {
    let service: TransactionsService;
    let repository: jest.Mocked<TransactionsRepository>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransactionsService,
                {
                    provide: TransactionsRepository,
                    useValue: {
                        getAllTransactions: jest.fn(),
                        getTransactionById: jest.fn(),
                        createTransaction: jest.fn(),
                    }
                }
            ]
        }).compile();

        service = module.get<TransactionsService>(TransactionsService);
        repository = module.get<TransactionsRepository>(TransactionsRepository) as jest.Mocked<TransactionsRepository>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTransaction', () => {
        it('should throw NotFoundException if account does not exist', async () => {
            repository.getAccountBalanceById.mockResolvedValue(null);
            repository.getCategoryName.mockResolvedValue({ name: 'Shopping' });
            
            await expect(service.createTransaction(dto)).rejects.toThrow(NotFoundException);
        });

        it('computes new balance correctly for expense transactions', async () => {
            const account = { balance: 19690000 };
            const category = { name: 'Shopping' };
            const dto = {
                type: 'expense',
                amount: 50000,
                description: 'Clothes',
                accountId: 1,
                categoryId: 1
            };
        });
    });
});