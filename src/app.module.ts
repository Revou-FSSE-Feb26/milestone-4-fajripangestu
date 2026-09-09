import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MaintenanceModeMiddleware } from './common/middleware/maintenance-mode.middleware';
import { AuthHeaderMiddleware } from './common/middleware/auth-header.middleware';
import { ConfigModule } from '@nestjs/config';
import { WhitelistMiddleware } from './common/middleware/whitelist.middleware';
import { ManagementModule } from './management/management.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // supaya bisa dipakai di seluruh project
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 10000,
          limit: 3,
        }
      ]
    }),
    UsersModule,
    PrismaModule,
    AccountsModule,
    CategoriesModule,
    TransactionsModule,
    ManagementModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },{
      provide: 'ENVIRONMENT',
      useValue: process.env.ENVIRONMENT || 'production',
    }],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware,MaintenanceModeMiddleware,WhitelistMiddleware)
    .exclude({ path: 'docs', method: RequestMethod.GET })
    .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
