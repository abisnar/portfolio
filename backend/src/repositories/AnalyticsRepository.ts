import type { StatEntry } from '../models/events';

export interface AnalyticsRepository {
  increment(event: string, at: string): Promise<void>;
  list(): Promise<StatEntry[]>;
}
