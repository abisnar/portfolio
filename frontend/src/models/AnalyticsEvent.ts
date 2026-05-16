export type AnalyticsEventName =
  | `view:${string}`
  | `click:${string}`;

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  at: string;
}
