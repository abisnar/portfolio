export interface Profile {
  name: string;
  title: string;
  location?: string;
  links: ProfileLink[];
}

export interface ProfileLink {
  name: string;
  label: string;
  href: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface ExperienceSection {
  id: string;
  kind: 'experience';
  title: string;
  items: ExperienceItem[];
}

export interface SkillsSection {
  id: string;
  kind: 'skills';
  title: string;
  items: string[];
}

export type ResumeSection = ExperienceSection | SkillsSection;

export interface Resume {
  profile: Profile;
  sections: ResumeSection[];
}
