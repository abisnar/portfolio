import { createContext, useContext, type ReactNode } from 'react';
import { createAnalytics, type Analytics } from './analytics';

export interface Services {
  analytics: Analytics;
}

export function buildServices(opts: { apiEndpoint?: string; debug?: boolean } = {}): Services {
  return {
    analytics: createAnalytics({ endpoint: opts.apiEndpoint, debug: opts.debug }),
  };
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
