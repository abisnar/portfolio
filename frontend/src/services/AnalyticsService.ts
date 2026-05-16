import type { AnalyticsEventName } from '../models/AnalyticsEvent';

export interface AnalyticsService {
  track(event: AnalyticsEventName): Promise<void>;
}
