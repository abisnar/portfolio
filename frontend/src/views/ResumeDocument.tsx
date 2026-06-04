import type { EducationItem, ExperienceItem, Resume } from '../models/Resume';

/** Strip protocol and trailing slash so links read cleanly on paper. */
function displayUrl(href: string): string {
  return href.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function ExperienceEntry({ item }: { item: ExperienceItem }) {
  return (
    <div className="rd-entry">
      <div className="rd-entry-row">
        <span className="rd-role">{item.role}</span>
        <span className="rd-dates">{item.start} – {item.end}</span>
      </div>
      <div className="rd-entry-sub">
        <span className="rd-org">{item.company}</span>
        {item.location && <span className="rd-loc"> · {item.location}</span>}
      </div>
      <ul className="rd-bullets">
        {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  );
}

function EducationEntry({ item }: { item: EducationItem }) {
  return (
    <div className="rd-entry">
      <div className="rd-entry-row">
        <span className="rd-role">{item.degree}</span>
        <span className="rd-dates">{item.dates}</span>
      </div>
      <div className="rd-entry-sub">
        <span className="rd-org">{item.school}</span>
        {item.location && <span className="rd-loc"> · {item.location}</span>}
      </div>
      {item.note && <p className="rd-note">{item.note}</p>}
    </div>
  );
}

/**
 * A purpose-built résumé document, styled for print and rendered from the same
 * resume data as the site. Hidden on screen; the print stylesheet swaps the
 * interactive site for this clean one-column layout when the user exports a PDF.
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
          {section.kind === 'summary' && <p className="rd-summary">{section.text}</p>}
          {section.kind === 'experience' &&
            section.items.map((item, i) => <ExperienceEntry key={i} item={item} />)}
          {section.kind === 'education' &&
            section.items.map((item, i) => <EducationEntry key={i} item={item} />)}
          {section.kind === 'skills' && <p className="rd-inline">{section.items.join('  ·  ')}</p>}
          {section.kind === 'list' && (
            <ul className="rd-bullets">
              {section.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
