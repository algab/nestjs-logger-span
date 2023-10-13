import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { storage } from './async.local.storage';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    storage.run(randomUUID(), next);
  }
}
