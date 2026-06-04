import type { AnalyticsSink } from '../AnalyticsSink';

/** Discards every event. The default when no destination is configured. */
export class NoopSink implements AnalyticsSink {
  send(): void {
    // intentionally empty
  }
}
