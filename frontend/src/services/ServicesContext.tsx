import { createContext, useContext, type ReactNode } from 'react';
import type { AnalyticsService } from './AnalyticsService';
import { HttpAnalyticsService } from './HttpAnalyticsService';
import { NoopAnalyticsService } from './NoopAnalyticsService';

export interface Services {
  analytics: AnalyticsService;
}

export function buildServices(opts: { apiEndpoint?: string }): Services {
  const analytics: AnalyticsService = opts.apiEndpoint
    ? new HttpAnalyticsService(opts.apiEndpoint)
    : new NoopAnalyticsService();
  return { analytics };
}

const ServicesContext = createContext<Services | null>(null);

export function ServicesProvider({ value, children }: { value: Services; children: ReactNode }) {
  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
}

export function useServices(): Services {
  const ctx = useContext(ServicesContext);
  if (!ctx) throw new Error('useServices must be used inside ServicesProvider');
  return ctx;
}
