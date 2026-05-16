import type { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { TrackRequestSchema } from '../models/events';
import { getAnalyticsService } from '../lib/factory';
import { logger } from '../lib/logger';

export const handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyStructuredResultV2> => {
  const { service, config } = getAnalyticsService();
  const cors = {
    'access-control-allow-origin': config.corsOrigin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
  };

  if (event.requestContext.http.method === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' };
  }

  const parsed = TrackRequestSchema.safeParse(safeJson(event.body));
  if (!parsed.success) {
    return {
      statusCode: 400,
      headers: { ...cors, 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'invalid request', issues: parsed.error.issues }),
    };
  }

  try {
    await service.record(parsed.data);
    return { statusCode: 204, headers: cors, body: '' };
  } catch (err) {
    logger.error('track failed', { err: (err as Error).message });
    return {
      statusCode: 500,
      headers: { ...cors, 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'internal' }),
    };
  }
};

function safeJson(body: string | undefined): unknown {
  if (!body) return null;
  try { return JSON.parse(body); } catch { return null; }
}
