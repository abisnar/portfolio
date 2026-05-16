import { describe, it, expect } from 'vitest';
import { NoopAnalyticsService } from '../services/NoopAnalyticsService';
import { HttpAnalyticsService } from '../services/HttpAnalyticsService';
import { buildServices } from '../services/ServicesContext';

describe('buildServices', () => {
  it('returns Noop analytics when no endpoint is configured', () => {
    const s = buildServices({});
    expect(s.analytics).toBeInstanceOf(NoopAnalyticsService);
  });

  it('returns HTTP analytics when endpoint is configured', () => {
    const s = buildServices({ apiEndpoint: 'https://api.example.com' });
    expect(s.analytics).toBeInstanceOf(HttpAnalyticsService);
  });
});
