import { describe, it, expect, vi } from 'vitest';
import { renderSection, type SectionRenderers } from '../views/sections/renderSection';
import { initials } from '../lib/initials';

describe('renderSection', () => {
  const renderers: SectionRenderers = {
    summary: (s) => `summary:${s.text}`,
    experience: (s) => `experience:${s.items.length}`,
    education: (s) => `education:${s.items.length}`,
    skills: (s) => `skills:${s.items.join(',')}`,
    list: (s) => `list:${s.items.length}`,
  };

  it('dispatches a section to the renderer for its kind', () => {
    expect(renderSection(renderers, { id: 's', kind: 'skills', title: 'Skills', items: ['a', 'b'] }))
      .toBe('skills:a,b');
    expect(renderSection(renderers, { id: 'x', kind: 'summary', title: 'Summary', text: 'hi' }))
      .toBe('summary:hi');
  });

  it('passes the narrowed section to its renderer', () => {
    const skills = vi.fn(() => 'ok');
    const spied: SectionRenderers = { ...renderers, skills };
    renderSection(spied, { id: 's', kind: 'skills', title: 'Skills', items: ['x'] });
    expect(skills).toHaveBeenCalledWith(expect.objectContaining({ kind: 'skills', items: ['x'] }));
  });
});

describe('initials', () => {
  it('takes up to two uppercase initials', () => {
    expect(initials('Allan Bisnar')).toBe('AB');
  });
  it('handles single names and extra whitespace', () => {
    expect(initials('Allan')).toBe('A');
    expect(initials('  Allan   Bisnar  ')).toBe('AB');
  });
});
