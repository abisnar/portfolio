import type { AnalyticsSink } from '../AnalyticsSink';
import type { AnalyticsEvent } from '../events';

/**
 * Posts events to a backend `POST {endpoint}/track`. Best-effort: failures are
 * swallowed so analytics can never surface an error to the page. Wiring up a
 * server later is just constructing this sink with an endpoint — no other code
 * in the module changes.
 */
export class HttpSink implements AnalyticsSink {
  constructor(private readonly endpoint: string) {}

  async send(event: AnalyticsEvent): Promise<void> {
    try {
      await fetch(`${this.endpoint}/track`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(event),
        keepalive: true,
      });
    } catch {
      // analytics is best-effort; never propagate transport failures
    }
  }
}
