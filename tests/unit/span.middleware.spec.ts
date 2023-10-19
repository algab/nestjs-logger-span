import { SpanMiddleware } from '../../src';
import { storage } from '../../src/lib/async.local.storage';

jest.mock('../../src/lib/async.local.storage');

describe('Testing SpanMiddleware', () => {
  let middleware: SpanMiddleware;

  beforeAll(() => {
    middleware = new SpanMiddleware();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('when executing the middleware the storage run function must be called', () => {
    const mockRun = jest.fn();
    (storage.run as jest.Mock).mockImplementationOnce(mockRun);
    middleware.use({}, {}, () => {});
    expect(mockRun).toBeCalled();
  });
});
