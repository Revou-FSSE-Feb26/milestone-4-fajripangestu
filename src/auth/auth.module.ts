import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory:()=>{
        const secret= process.env.JWT_SECRET;
      
      if(!secret){
        throw new Error('JWT_SECRET is not set');
      }

      return {
        secret,
        signOptions: { expiresIn: '1h' }
      }
  }})],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
