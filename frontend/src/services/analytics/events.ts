/**
 * Domain analytics events — a closed, typed set. Replaces stringly-typed
 * names like `view:home`, so every producer and sink shares one schema and
 * the compiler catches typos. New event kinds are added here as new variants.
 */
export type AnalyticsEvent =
  | { readonly type: 'page_view'; readonly page: string }
  | { readonly type: 'link_click'; readonly link: string };

export const pageViewEvent = (page: string): AnalyticsEvent => ({ type: 'page_view', page });

export const linkClickEvent = (link: string): AnalyticsEvent => ({ type: 'link_click', link });
