import type { Analytics } from './Analytics';
import type { AnalyticsSink } from './AnalyticsSink';
import { SinkAnalytics } from './SinkAnalytics';
import { CompositeSink } from './sinks/CompositeSink';
import { ConsoleSink } from './sinks/ConsoleSink';
import { HttpSink } from './sinks/HttpSink';
import { NoopSink } from './sinks/NoopSink';

export interface AnalyticsConfig {
  /** Backend base URL. When set, events are POSTed to `{endpoint}/track`. */
  endpoint?: string;
  /** Also log events to the console (handy in development). */
  debug?: boolean;
}

/**
 * Composition root for analytics — the one place that knows about concrete
 * sinks. It selects destinations from config and composes them; everything
 * else in the app depends only on the {@link Analytics} abstraction.
 *
 * Adding a destination (Google Analytics, a queue, etc.) is a one-line change
 * here plus a new sink file — no existing code is modified.
 */
export function createAnalytics(config: AnalyticsConfig = {}): Analytics {
  const sinks: AnalyticsSink[] = [];

  if (config.endpoint) sinks.push(new HttpSink(config.endpoint));
  if (config.debug) sinks.push(new ConsoleSink());
  if (sinks.length === 0) sinks.push(new NoopSink());

  return new SinkAnalytics(new CompositeSink(...sinks));
}
