/**
 * The high-level analytics API the application depends on.
 *
 * The UI talks to this intent-oriented abstraction (pageView / linkClick) and
 * knows nothing about events or transports (Dependency Inversion). Methods are
 * fire-and-forget — analytics must never block or break a render.
 */
export interface Analytics {
  pageView(page: string): void;
  linkClick(link: string): void;
}
