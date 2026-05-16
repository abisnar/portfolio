import type { AnalyticsEventName } from '../models/AnalyticsEvent';
import type { AnalyticsService } from './AnalyticsService';

export class HttpAnalyticsService implements AnalyticsService {
  constructor(private readonly endpoint: string) {}

  async track(event: AnalyticsEventName): Promise<void> {
    try {
      await fetch(`${this.endpoint}/track`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ event }),
        keepalive: true,
      });
    } catch {
      // Analytics is best-effort; never surface failures to the UI.
    }
  }
}
