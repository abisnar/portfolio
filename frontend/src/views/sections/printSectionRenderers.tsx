import type { EducationItem, ExperienceItem } from '../../models/Resume';
import type { SectionRenderers } from './renderSection';

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

/** How each section kind renders in the print/PDF résumé document. */
export const printSectionRenderers: SectionRenderers = {
  summary: (section) => <p className="rd-summary">{section.text}</p>,
  experience: (section) => (
    <>{section.items.map((item, i) => <ExperienceEntry key={i} item={item} />)}</>
  ),
  education: (section) => (
    <>{section.items.map((item, i) => <EducationEntry key={i} item={item} />)}</>
  ),
  skills: (section) => <p className="rd-inline">{section.items.join('  ·  ')}</p>,
  list: (section) => (
    <ul className="rd-bullets">
      {section.items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  ),
};
