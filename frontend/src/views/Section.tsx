import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface Props {
  id: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: Props) {
  return (
    <Reveal>
      <section id={id} className="section">
        <h2 className="section-title">
          <span className="section-bar" aria-hidden="true" />
          {title}
        </h2>
        <div className="section-body">{children}</div>
      </section>
    </Reveal>
  );
}
