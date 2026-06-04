import type { ReactNode } from 'react';
import type { ResumeSection } from '../../models/Resume';

/**
 * A complete set of renderers — exactly one per section kind.
 *
 * The mapped type makes the set exhaustive: adding a kind to the
 * {@link ResumeSection} union is a compile error until a renderer exists for
 * it. Extension is therefore forced to be additive (Open/Closed), and a
 * forgotten kind can never silently render nothing.
 */
export type SectionRenderers = {
  [K in ResumeSection['kind']]: (section: Extract<ResumeSection, { kind: K }>) => ReactNode;
};

/** Dispatch a section to the renderer registered for its kind. */
export function renderSection(renderers: SectionRenderers, section: ResumeSection): ReactNode {
  // The registry guarantees a matching renderer for every kind; the cast only
  // bridges TypeScript's inability to correlate the indexed access across the
  // union. It is the single point where that correlation is asserted.
  const render = renderers[section.kind] as (s: ResumeSection) => ReactNode;
  return render(section);
}
