import type { Analytics } from './Analytics';
import type { AnalyticsSink } from './AnalyticsSink';
import { linkClickEvent, pageViewEvent } from './events';

/**
 * Default {@link Analytics} implementation.
 *
 * Single responsibility: translate user intent into domain events and hand
 * them to a sink. It depends only on the {@link AnalyticsSink} abstraction, so
 * it works unchanged with any destination (or combination of destinations).
 */
export class SinkAnalytics implements Analytics {
  constructor(private readonly sink: AnalyticsSink) {}

  pageView(page: string): void {
    void this.sink.send(pageViewEvent(page));
  }

  linkClick(link: string): void {
    void this.sink.send(linkClickEvent(link));
  }
}
