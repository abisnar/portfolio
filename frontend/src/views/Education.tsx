import type { EducationItem } from '../models/Resume';

interface Props {
  items: EducationItem[];
}

export function Education({ items }: Props) {
  return (
    <>
      {items.map((item, idx) => (
        <article key={`${item.school}-${idx}`} className="education-item">
          <div className="degree">{item.degree}</div>
          <div className="school">
            {item.school}
            {item.location ? ` — ${item.location}` : ''}
          </div>
          <div className="meta">{item.dates}</div>
          {item.note && <p className="note">{item.note}</p>}
        </article>
      ))}
    </>
  );
}
