import type { AnalyticsSink } from '../AnalyticsSink';
import type { AnalyticsEvent } from '../events';

/**
 * Fans an event out to many sinks. This is what makes destinations additive:
 * sending to one more place means passing one more sink here, with zero changes
 * to existing sinks (Open/Closed). Each sink is isolated, so one failing
 * destination can never affect the others.
 */
export class CompositeSink implements AnalyticsSink {
  private readonly sinks: readonly AnalyticsSink[];

  constructor(...sinks: AnalyticsSink[]) {
    this.sinks = sinks;
  }

  send(event: AnalyticsEvent): void {
    for (const sink of this.sinks) {
      try {
        void sink.send(event);
      } catch {
        // isolate failures so one bad sink can't block the rest
      }
    }
  }
}
