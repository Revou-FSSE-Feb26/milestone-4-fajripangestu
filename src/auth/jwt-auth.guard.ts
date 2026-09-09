import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwt: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const auth = request.headers.authorization ?? '';
        const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;

        if (!token) throw new UnauthorizedException('No token provided');

        try {
            request.user = await this.jwt.verifyAsync(token, {secret: process.env.JWT_SECRET});
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
  }
}