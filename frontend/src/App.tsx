import { useEffect } from 'react';
import { Header } from './views/Header';
import { Section } from './views/Section';
import { Experience } from './views/Experience';
import { Skills } from './views/Skills';
import { useResume } from './controllers/useResume';
import { useAnalytics } from './controllers/useAnalytics';

export function App() {
  const resume = useResume();
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.trackView('home');
  }, [analytics]);

  return (
    <main className="resume">
      <Header profile={resume.profile} onLinkClick={(name) => analytics.trackClick(name)} />

      {resume.sections.map((section) => (
        <Section key={section.id} title={section.title}>
          {section.kind === 'experience' && <Experience items={section.items} />}
          {section.kind === 'skills' && <Skills items={section.items} />}
        </Section>
      ))}
    </main>
  );
}
