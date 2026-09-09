// src/common/middleware/maintenance.middleware.ts
import { Inject, Injectable, NestMiddleware, ServiceUnavailableException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MaintenanceModeMiddleware implements NestMiddleware {
  //private readonly environment: string;

  constructor(@Inject('ENVIRONMENT') private readonly environment: string) {
    //this.environment = process.env.ENVIRONMENT || 'production';
  }
  
  use(req: Request, res: Response, next: NextFunction) {
    if (this.environment === 'maintenance') {
      throw new ServiceUnavailableException('Server sedang dalam perawatan. Silakan coba lagi nanti.');
    }else{
      next();
    }
  }
  // use(req: Request, res: Response, next: NextFunction) {
  //   if (process.env.APP_ENV === 'maintenance') {
  //     return res.status(503).json({
  //       status: 'error',
  //       message: 'Server sedang dalam perawatan. Silakan coba lagi nanti.',
  //     });
  //   }
  //   next();
  // }
}