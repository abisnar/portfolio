import type { Profile } from '../models/Resume';

interface Props {
  profile: Profile;
  onLinkClick: (name: string) => void;
}

export function Header({ profile, onLinkClick }: Props) {
  return (
    <header>
      <h1>{profile.name}</h1>
      <p className="title">{profile.title}</p>
      {profile.location && <p className="location">{profile.location}</p>}
      {profile.links.length > 0 && (
        <nav className="links" aria-label="Profile links">
          {profile.links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onLinkClick(link.name)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
