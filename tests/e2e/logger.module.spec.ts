import { Get, Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { createLogger, format, transports } from 'winston';

import { LoggerModule, LoggerServiceCustom, Span } from '../../src';

@Injectable()
class SpanClass {
  constructor(private logger: LoggerServiceCustom) {}

  @Span
  @Get()
  test() {
    this.logger.log('Test');
  }
}

describe('Testing e2e LoggerModule', () => {
  let moduleRef: TestingModule;

  it('when initializing the module correctly it should not return any errors', async () => {
    moduleRef = await Test.createTestingModule({
      imports: [LoggerModule.forRoot(createLogger({ format: format.json(), transports: [new transports.Console()] }))],
      providers: [SpanClass],
    }).compile();
    moduleRef.init();
    const spanProvider = moduleRef.get(SpanClass);
    expect(() => spanProvider.test()).not.toThrow();
  });
});
