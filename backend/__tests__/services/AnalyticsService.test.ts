import { describe, it, expect, vi } from 'vitest';
import { AnalyticsService } from '../../src/services/AnalyticsService';
import type { AnalyticsRepository } from '../../src/repositories/AnalyticsRepository';

function makeRepo(overrides: Partial<AnalyticsRepository> = {}): AnalyticsRepository {
  return {
    increment: vi.fn().mockResolvedValue(undefined),
    list: vi.fn().mockResolvedValue([]),
    ...overrides,
  };
}

describe('AnalyticsService', () => {
  it('records an event with a fixed clock', async () => {
    const repo = makeRepo();
    const svc = new AnalyticsService(repo, () => new Date('2026-05-16T12:00:00Z'));
    await svc.record({ event: 'view:home' });
    expect(repo.increment).toHaveBeenCalledWith('view:home', '2026-05-16T12:00:00.000Z');
  });

  it('returns entries sorted by count desc', async () => {
    const repo = makeRepo({
      list: vi.fn().mockResolvedValue([
        { event: 'view:home', count: 3, lastAt: null },
        { event: 'click:linkedin', count: 10, lastAt: null },
        { event: 'view:about', count: 7, lastAt: null },
      ]),
    });
    const svc = new AnalyticsService(repo);
    const out = await svc.summary();
    expect(out.map((e) => e.event)).toEqual(['click:linkedin', 'view:about', 'view:home']);
  });
});
