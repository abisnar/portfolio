import { z } from 'zod';

const eventName = z
  .string()
  .min(3)
  .max(64)
  .regex(/^(view|click):[a-z0-9_-]{1,48}$/i, 'event must be view:<name> or click:<name>');

export const TrackRequestSchema = z.object({
  event: eventName,
});

export type TrackRequest = z.infer<typeof TrackRequestSchema>;

export interface StatEntry {
  event: string;
  count: number;
  lastAt: string | null;
}
