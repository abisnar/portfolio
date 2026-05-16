import { useMemo } from 'react';
import { useServices } from '../services/ServicesContext';

export function useAnalytics() {
  const { analytics } = useServices();

  return useMemo(
    () => ({
      trackView: (name: string) => analytics.track(`view:${name}`),
      trackClick: (name: string) => analytics.track(`click:${name}`),
    }),
    [analytics],
  );
}
