import type { Profile } from '../models/Resume';
import { initials } from '../lib/initials';

interface Props {
  profile: Profile;
  onLinkClick: (name: string) => void;
}

export function Hero({ profile, onLinkClick }: Props) {
  const monogram = initials(profile.name);

  return (
    <header id="top" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-inner">
        {profile.photo ? (
          <img className="hero-avatar hero-avatar--photo" src={profile.photo} alt={profile.name} />
        ) : (
          <div className="hero-avatar">{monogram}</div>
        )}
        <p className="hero-eyebrow">Hello, I’m</p>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-title">{profile.title}</p>
        {profile.location && <p className="hero-location">{profile.location}</p>}
        {profile.links.length > 0 && (
          <nav className="hero-links" aria-label="Profile links">
            {profile.links.map((link) => (
              <a
                key={link.name}
                className="btn"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onLinkClick(link.name)}
              >
                {link.label}
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
