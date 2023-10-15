import { DynamicModule, Module } from '@nestjs/common';
import { Logger } from 'winston';

import { CONFIG_WINSTON } from './logger.constant';
import { LoggerServiceCustom } from './logger.service';

@Module({})
export class LoggerModule {
  static forRoot(logger: Logger): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: CONFIG_WINSTON,
          useValue: logger,
        },
        LoggerServiceCustom,
      ],
      exports: [LoggerServiceCustom],
    };
  }
}
