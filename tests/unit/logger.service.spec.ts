import { createLogger, format, transports } from 'winston';

import { LoggerServiceCustom } from '../../src';
import { storage } from '../../src/lib/async.local.storage';

jest.mock('../../src/lib/async.local.storage');

describe('Testing LoggerServiceCustom', () => {
  let service: LoggerServiceCustom;

  const mockGetStore = jest.fn();

  beforeAll(() => {
    (storage.getStore as jest.Mock).mockImplementation(mockGetStore);
    service = new LoggerServiceCustom(createLogger({ format: format.json(), transports: [new transports.Console()] }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('log method should not return any error', () => {
    mockGetStore.mockReturnValue(10);
    expect(() => service.log('test', 'Test')).not.toThrow();
    expect(mockGetStore).toBeCalled();
  });

  it('error method should not return any error', () => {
    mockGetStore.mockReturnValue(undefined);
    expect(() => service.error('test', 'error', 'Test')).not.toThrow();
    expect(mockGetStore).toBeCalled();
  });

  it('warn method should not return any error', () => {
    mockGetStore.mockReturnValue(undefined);
    expect(() => service.warn('test', 'Test')).not.toThrow();
    expect(mockGetStore).toBeCalled();
  });

  it('debug method should not return any error', () => {
    mockGetStore.mockReturnValue(undefined);
    expect(() => service.debug?.('test')).not.toThrow();
    expect(mockGetStore).toBeCalled();
  });
});
