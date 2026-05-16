import { AnalyticsService } from '../services/AnalyticsService';
import { DynamoAnalyticsRepository } from '../repositories/DynamoAnalyticsRepository';
import { loadConfig, type Config } from './config';

let cached: { service: AnalyticsService; config: Config } | null = null;

export function getAnalyticsService(): { service: AnalyticsService; config: Config } {
  if (cached) return cached;
  const config = loadConfig();
  const repo = new DynamoAnalyticsRepository(config.tableName, config.region);
  cached = { service: new AnalyticsService(repo), config };
  return cached;
}
