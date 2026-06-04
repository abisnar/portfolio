import type { Resume } from '../models/Resume';
import { renderSection } from './sections/renderSection';
import { printSectionRenderers } from './sections/printSectionRenderers';

/** Strip protocol and trailing slash so links read cleanly on paper. */
function displayUrl(href: string): string {
  return href.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

/**
 * A purpose-built résumé document, styled for print and rendered from the same
 * resume data as the site. Hidden on screen; the print stylesheet swaps the
 * interactive site for this clean one-column layout when the user exports a PDF.
 * Per-kind rendering lives in {@link printSectionRenderers}.
 */
export function ResumeDocument({ resume }: { resume: Resume }) {
  const { profile, sections } = resume;

  return (
    <article className="resume-doc" aria-hidden="true">
      <header className="rd-header">
        <h1 className="rd-name">{profile.name}</h1>
        <p className="rd-title">{profile.title}</p>
        <p className="rd-contact">
          {profile.location && <span>{profile.location}</span>}
          {profile.links.map((link) => (
            <span key={link.name}>{link.label}: {displayUrl(link.href)}</span>
          ))}
        </p>
      </header>

      {sections.map((section) => (
        <section className="rd-section" key={section.id}>
          <h2 className="rd-heading">{section.title}</h2>
          {renderSection(printSectionRenderers, section)}
        </section>
      ))}
    </article>
  );
}
