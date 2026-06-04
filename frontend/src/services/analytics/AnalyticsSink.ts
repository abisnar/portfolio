import type { AnalyticsEvent } from './events';

/**
 * A destination for analytics events (the transport abstraction).
 *
 * This is the single extension point of the module: adding a new destination
 * (HTTP backend, Google Analytics, console, etc.) means writing a new sink —
 * never editing existing code (Open/Closed). `send` is best-effort and must
 * never throw into the caller.
 */
export interface AnalyticsSink {
  send(event: AnalyticsEvent): void | Promise<void>;
}
