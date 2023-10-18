import { SpanMiddleware } from '../../src';

describe('Testing SpanMiddleware', () => {
  let middleware: SpanMiddleware;

  beforeAll(() => {
    middleware = new SpanMiddleware();
  });

  it('test one', () => {
    expect(() => middleware.use({}, {}, () => {})).not.toThrow();
  });
});
