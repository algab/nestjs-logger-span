import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Logger } from 'winston';

import { storage } from './async.local.storage';
import { CONFIG_WINSTON } from './logger.constant';

@Injectable()
export class LoggerServiceCustom implements LoggerService {
  constructor(@Inject(CONFIG_WINSTON) private readonly logger: Logger) {}

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, this.setMetadata(optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, this.setMetadata(optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, this.setMetadata(optionalParams));
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, this.setMetadata(optionalParams));
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message, this.setMetadata(optionalParams));
  }

  private setMetadata(optionalParams: any[]) {
    const metadata = {};
    const spanId = storage.getStore();

    if (optionalParams.length === 2) {
      metadata['stack'] = optionalParams[0];
      metadata['context'] = optionalParams[1];
    } else {
      metadata['context'] = optionalParams[0];
    }

    if (spanId !== undefined) {
      metadata['spanId'] = spanId;
    }

    return metadata;
  }
}
