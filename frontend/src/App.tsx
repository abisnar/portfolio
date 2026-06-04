import { useEffect } from 'react';
import { Nav } from './views/Nav';
import { Hero } from './views/Hero';
import { Section } from './views/Section';
import { Summary } from './views/Summary';
import { Experience } from './views/Experience';
import { Education } from './views/Education';
import { Skills } from './views/Skills';
import { BulletList } from './views/BulletList';
import { DownloadResumeButton } from './views/DownloadResumeButton';
import { ResumeDocument } from './views/ResumeDocument';
import { useResume } from './controllers/useResume';
import { useAnalytics } from './controllers/useAnalytics';

export function App() {
  const resume = useResume();
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.pageView('home');
  }, [analytics]);

  const navItems = resume.sections.map((s) => ({ id: s.id, title: s.title }));

  return (
    <>
      <Nav name={resume.profile.name} items={navItems} />
      <DownloadResumeButton />
      <main className="resume">
        <Hero profile={resume.profile} onLinkClick={(name) => analytics.linkClick(name)} />

        {resume.sections.map((section) => (
          <Section key={section.id} id={section.id} title={section.title}>
            {section.kind === 'summary' && <Summary text={section.text} />}
            {section.kind === 'experience' && <Experience items={section.items} />}
            {section.kind === 'education' && <Education items={section.items} />}
            {section.kind === 'skills' && <Skills items={section.items} />}
            {section.kind === 'list' && <BulletList items={section.items} />}
          </Section>
        ))}

        <footer className="footer">
          <span>© {resume.profile.name}</span>
          <span className="footer-sep" aria-hidden="true">·</span>
          <span>Built with React + TypeScript</span>
        </footer>
      </main>

      <ResumeDocument resume={resume} />
    </>
  );
}
