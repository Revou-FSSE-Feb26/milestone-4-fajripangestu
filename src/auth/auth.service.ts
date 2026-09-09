import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService
    ) {}

    async register(dto: RegisterDto) {
        // Check if the email already exists in the database
        if (await this.authRepository.getEmail(dto.email)!=null) {
            throw new UnauthorizedException('Email already exists');
        }

        // If the email does not exist, hash the password and create a new user
        const hashedPassword = bcrypt.hashSync(dto.password, 10);
        return this.authRepository.createUser(
            dto.name, 
            dto.email, 
            hashedPassword, 
            dto.role
        );
    }

    async login(credentials: { email: string; password: string }) {

        const user = await this.authRepository.getEmail(credentials.email);

        // Check if the email exists in the database
        if (!user) {
            throw new UnauthorizedException('Invalid email');
        }

        //If the email exists, get the password from the database
        const hashedPassword = await this.authRepository.getPassword(credentials.email);
        
        // Check if password exists
        if (!hashedPassword) {
            throw new UnauthorizedException('Invalid email');
        }

        // Compare password with the hashed password
        const isMatch = bcrypt.compareSync(
            credentials.password, 
            hashedPassword
        );

        // If the password does not match, throw an error
        if (!isMatch){
            throw new UnauthorizedException('Invalid password');
        }

        const  payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        // If the password matches, return a success message
        return { access_token: token , message: 'Login successful' };
    }
}
