import type { ExperienceItem } from '../models/Resume';

interface Props {
  items: ExperienceItem[];
}

export function Experience({ items }: Props) {
  return (
    <ol className="timeline">
      {items.map((item, idx) => {
        const current = item.end.toLowerCase() === 'present';
        return (
          <li key={`${item.company}-${idx}`} className="timeline-item">
            <span className="timeline-dot" aria-hidden="true" />
            <article className="card exp-card">
              <div className="exp-head">
                <h3 className="exp-role">{item.role}</h3>
                {current && <span className="badge">Current</span>}
              </div>
              <div className="exp-company">{item.company}</div>
              <div className="exp-meta">
                <span>{item.start} – {item.end}</span>
                {item.location && <span className="dot-sep">{item.location}</span>}
              </div>
              <ul className="bullets">
                {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
