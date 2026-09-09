import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class WhitelistMiddleware implements NestMiddleware {
  private readonly allowedIps: string[];

  constructor() {
    const ips = process.env.ALLOWED_IPS;
    this.allowedIps = ips ? ips.split(',') : [];
  }

  use(req: Request, res: Response, next: NextFunction) {
    let clientIp =
      req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
      req.connection.remoteAddress ||
      req.ip ||
      '';

    clientIp = clientIp.replace(/^::ffff:/, '');

    console.log('Client IP:', clientIp);

    if (this.allowedIps.includes(clientIp)) {
      next();
    } else {
      throw new UnauthorizedException(`IP ${clientIp} tidak ada di whitelist`);
    }
  }
}