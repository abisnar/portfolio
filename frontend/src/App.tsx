import { useEffect } from 'react';
import { Nav } from './views/Nav';
import { Hero } from './views/Hero';
import { Section } from './views/Section';
import { renderSection } from './views/sections/renderSection';
import { webSectionRenderers } from './views/sections/webSectionRenderers';
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
            {renderSection(webSectionRenderers, section)}
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
