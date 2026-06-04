export interface Profile {
  name: string;
  title: string;
  location?: string;
  photo?: string;
  links: ProfileLink[];
}

export interface ProfileLink {
  name: string;
  label: string;
  href: string;
}

export interface SummarySection {
  id: string;
  kind: 'summary';
  title: string;
  text: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  logo?: string;
  location?: string;
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

export interface EducationItem {
  school: string;
  degree: string;
  location?: string;
  dates: string;
  note?: string;
}

export interface EducationSection {
  id: string;
  kind: 'education';
  title: string;
  items: EducationItem[];
}

export interface SkillsSection {
  id: string;
  kind: 'skills';
  title: string;
  items: string[];
}

export interface ListSection {
  id: string;
  kind: 'list';
  title: string;
  items: string[];
}

export type ResumeSection =
  | SummarySection
  | ExperienceSection
  | EducationSection
  | SkillsSection
  | ListSection;

export interface Resume {
  profile: Profile;
  sections: ResumeSection[];
}
