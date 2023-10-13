import { DynamicModule, Module } from '@nestjs/common';
import { Logger } from 'winston';

import { LoggerCustom } from './logger.service';

@Module({})
export class LoggerModule {
  static forRoot(logger: Logger): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: 'TOKEN',
          useValue: logger,
        },
        LoggerCustom,
      ],
      exports: [LoggerCustom],
    };
  }
}
