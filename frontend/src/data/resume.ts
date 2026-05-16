import type { Resume } from '../models/Resume';

export const resume: Resume = {
  profile: {
    name: 'Allan Bisnar',
    title: 'Software Engineer',
    links: [
      {
        name: 'linkedin',
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/allan-bisnar-b96b59132',
      },
    ],
  },
  sections: [
    {
      id: 'experience',
      kind: 'experience',
      title: 'Experience',
      items: [
        {
          role: 'TODO — Role',
          company: 'TODO — Company',
          start: 'YYYY',
          end: 'Present',
          bullets: [
            'TODO — Replace with a bullet describing impact, not responsibilities.',
            'TODO — Quantify where possible (latency cut, revenue, scale).',
          ],
        },
      ],
    },
    {
      id: 'skills',
      kind: 'skills',
      title: 'Skills',
      items: ['TypeScript', 'React', 'AWS', 'Terraform', 'Node.js'],
    },
  ],
};
