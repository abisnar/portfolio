import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

const increment = vi.fn().mockResolvedValue(undefined);

vi.mock('../../src/repositories/DynamoAnalyticsRepository', () => ({
  DynamoAnalyticsRepository: vi.fn().mockImplementation(() => ({
    increment,
    list: vi.fn().mockResolvedValue([]),
  })),
}));

function makeEvent(body: unknown, method = 'POST'): APIGatewayProxyEventV2 {
  return {
    body: body === undefined ? undefined : JSON.stringify(body),
    requestContext: { http: { method } },
  } as APIGatewayProxyEventV2;
}

beforeEach(() => {
  vi.resetModules();
  process.env.TABLE_NAME = 'test-table';
  process.env.AWS_REGION = 'us-east-1';
  process.env.CORS_ORIGIN = 'https://example.cloudfront.net';
  increment.mockClear();
});

describe('track handler', () => {
  it('accepts a valid event', async () => {
    const { handler } = await import('../../src/handlers/track');
    const res = await handler(makeEvent({ event: 'view:home' }));
    expect(res.statusCode).toBe(204);
    expect(increment).toHaveBeenCalledWith('view:home', expect.any(String));
  });

  it('rejects invalid event names', async () => {
    const { handler } = await import('../../src/handlers/track');
    const res = await handler(makeEvent({ event: 'unknown:thing' }));
    expect(res.statusCode).toBe(400);
    expect(increment).not.toHaveBeenCalled();
  });

  it('rejects missing body', async () => {
    const { handler } = await import('../../src/handlers/track');
    const res = await handler(makeEvent(undefined));
    expect(res.statusCode).toBe(400);
  });

  it('responds to CORS preflight', async () => {
    const { handler } = await import('../../src/handlers/track');
    const res = await handler(makeEvent(undefined, 'OPTIONS'));
    expect(res.statusCode).toBe(204);
    expect(res.headers?.['access-control-allow-origin']).toBe('https://example.cloudfront.net');
  });
});
