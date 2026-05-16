import type { AnalyticsRepository } from '../repositories/AnalyticsRepository';
import type { StatEntry, TrackRequest } from '../models/events';

export class AnalyticsService {
  constructor(
    private readonly repo: AnalyticsRepository,
    private readonly clock: () => Date = () => new Date(),
  ) {}

  async record(req: TrackRequest): Promise<void> {
    await this.repo.increment(req.event, this.clock().toISOString());
  }

  async summary(): Promise<StatEntry[]> {
    const entries = await this.repo.list();
    return entries.sort((a, b) => b.count - a.count);
  }
}
