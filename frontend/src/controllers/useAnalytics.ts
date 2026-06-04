import { useServices } from '../services/ServicesContext';
import type { Analytics } from '../services/analytics';

/** Exposes the injected analytics service to components. */
export function useAnalytics(): Analytics {
  return useServices().analytics;
}
