import type { ExperienceItem } from '../models/Resume';

interface Props {
  items: ExperienceItem[];
}

function companyInitials(company: string): string {
  const caps = company.replace(/[^A-Za-z ]/g, '').match(/[A-Z]/g);
  if (caps && caps.length >= 2) return caps.slice(0, 2).join('');
  return company.trim().slice(0, 2).toUpperCase();
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
              <div className="exp-top">
                {item.logo ? (
                  <span className="exp-logo">
                    <img src={item.logo} alt={`${item.company} logo`} loading="lazy" />
                  </span>
                ) : (
                  <span className="exp-logo exp-logo--mark" aria-hidden="true">
                    {companyInitials(item.company)}
                  </span>
                )}
                <div className="exp-headings">
                  <div className="exp-head">
                    <h3 className="exp-role">{item.role}</h3>
                    {current && <span className="badge">Current</span>}
                  </div>
                  <div className="exp-company">{item.company}</div>
                  <div className="exp-meta">
                    <span>{item.start} – {item.end}</span>
                    {item.location && <span className="dot-sep">{item.location}</span>}
                  </div>
                </div>
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
