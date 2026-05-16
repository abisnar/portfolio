import type { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { getAnalyticsService } from '../lib/factory';
import { logger } from '../lib/logger';

export const handler = async (
  _event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyStructuredResultV2> => {
  const { service, config } = getAnalyticsService();
  const headers = {
    'access-control-allow-origin': config.corsOrigin,
    'content-type': 'application/json',
  };

  try {
    const entries = await service.summary();
    return { statusCode: 200, headers, body: JSON.stringify(entries) };
  } catch (err) {
    logger.error('stats failed', { err: (err as Error).message });
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'internal' }) };
  }
};
