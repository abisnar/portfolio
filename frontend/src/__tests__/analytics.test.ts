import { describe, it, expect, vi } from 'vitest';
import type { AnalyticsEvent } from '../services/analytics';
import type { AnalyticsSink } from '../services/analytics';
import { SinkAnalytics } from '../services/analytics';
import { CompositeSink } from '../services/analytics';
import { createAnalytics } from '../services/analytics';

class RecordingSink implements AnalyticsSink {
  readonly events: AnalyticsEvent[] = [];
  send(event: AnalyticsEvent): void {
    this.events.push(event);
  }
}

describe('SinkAnalytics', () => {
  it('translates pageView into a page_view event', () => {
    const sink = new RecordingSink();
    new SinkAnalytics(sink).pageView('home');
    expect(sink.events).toEqual([{ type: 'page_view', page: 'home' }]);
  });

  it('translates linkClick into a link_click event', () => {
    const sink = new RecordingSink();
    new SinkAnalytics(sink).linkClick('linkedin');
    expect(sink.events).toEqual([{ type: 'link_click', link: 'linkedin' }]);
  });
});

describe('CompositeSink', () => {
  it('fans every event out to all sinks', () => {
    const a = new RecordingSink();
    const b = new RecordingSink();
    new SinkAnalytics(new CompositeSink(a, b)).pageView('home');
    expect(a.events).toHaveLength(1);
    expect(b.events).toHaveLength(1);
  });

  it('isolates a failing sink so others still receive the event', () => {
    const throwing: AnalyticsSink = {
      send: vi.fn(() => {
        throw new Error('boom');
      }),
    };
    const healthy = new RecordingSink();
    expect(() => new CompositeSink(throwing, healthy).send({ type: 'page_view', page: 'home' })).not.toThrow();
    expect(healthy.events).toHaveLength(1);
  });
});

describe('createAnalytics', () => {
  it('returns a no-op-backed Analytics when no destination is configured', () => {
    const analytics = createAnalytics();
    expect(() => analytics.pageView('home')).not.toThrow();
  });

  it('posts to {endpoint}/track when an endpoint is configured', () => {
    const fetchMock = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('fetch', fetchMock);
    createAnalytics({ endpoint: 'https://api.example.com' }).pageView('home');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/track',
      expect.objectContaining({ method: 'POST' }),
    );
    vi.unstubAllGlobals();
  });
});
