import type { AnalyticsSink } from '../AnalyticsSink';
import type { AnalyticsEvent } from '../events';

/** Logs events to the console — useful during local development. */
export class ConsoleSink implements AnalyticsSink {
  send(event: AnalyticsEvent): void {
    console.debug('[analytics]', event);
  }
}
