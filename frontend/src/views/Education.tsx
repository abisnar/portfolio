import type { EducationItem } from '../models/Resume';

interface Props {
  items: EducationItem[];
}

export function Education({ items }: Props) {
  return (
    <div className="edu-grid">
      {items.map((item, idx) => (
        <article key={`${item.school}-${idx}`} className="card edu-card">
          <div className="edu-degree">{item.degree}</div>
          <div className="edu-school">
            {item.school}
            {item.location ? ` · ${item.location}` : ''}
          </div>
          <div className="edu-meta">{item.dates}</div>
          {item.note && <p className="edu-note">{item.note}</p>}
        </article>
      ))}
    </div>
  );
}
