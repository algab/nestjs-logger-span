import { createLogger, format, transports } from 'winston';

import { LoggerServiceCustom } from '../../src';

describe('Testing LoggerServiceCustom', () => {
  let service: LoggerServiceCustom;

  beforeAll(() => {
    service = new LoggerServiceCustom(createLogger({ format: format.json(), transports: [new transports.Console()] }));
  });

  it('log method should not return any error', () => {
    expect(() => service.log('test', 'Test')).not.toThrow();
  });

  it('error method should not return any error', () => {
    expect(() => service.error('test', 'error', 'Test')).not.toThrow();
  });

  it('warn method should not return any error', () => {
    expect(() => service.warn('test', 'Test')).not.toThrow();
  });

  it('debug method should not return any error', () => {
    expect(() => service.debug?.('test')).not.toThrow();
  });
});
