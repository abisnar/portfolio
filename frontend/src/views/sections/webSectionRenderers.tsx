import { Summary } from '../Summary';
import { Experience } from '../Experience';
import { Education } from '../Education';
import { Skills } from '../Skills';
import { BulletList } from '../BulletList';
import type { SectionRenderers } from './renderSection';

/** How each section kind renders in the interactive site. */
export const webSectionRenderers: SectionRenderers = {
  summary: (section) => <Summary text={section.text} />,
  experience: (section) => <Experience items={section.items} />,
  education: (section) => <Education items={section.items} />,
  skills: (section) => <Skills items={section.items} />,
  list: (section) => <BulletList items={section.items} />,
};
