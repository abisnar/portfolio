import type { AnalyticsEventName } from '../models/AnalyticsEvent';
import type { AnalyticsService } from './AnalyticsService';

export class NoopAnalyticsService implements AnalyticsService {
  async track(_event: AnalyticsEventName): Promise<void> {
    return;
  }
}
