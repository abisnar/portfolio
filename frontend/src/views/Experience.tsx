import type { ExperienceItem } from '../models/Resume';

interface Props {
  items: ExperienceItem[];
}

export function Experience({ items }: Props) {
  return (
    <>
      {items.map((item, idx) => (
        <article key={`${item.company}-${idx}`} className="experience-item">
          <div className="role">{item.role} — {item.company}</div>
          <div className="meta">{item.start} – {item.end}</div>
          <ul>
            {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </article>
      ))}
    </>
  );
}
