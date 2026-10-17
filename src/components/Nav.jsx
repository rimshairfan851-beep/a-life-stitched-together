import { useEffect, useRef, useState } from 'react';
import { useActiveSection, useScrollProgress } from '../hooks.js';
import { profile } from '../data.js';
import { Icon } from './ui.jsx';

const LINKS = [
  { id: 'story', label: 'Story' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'music', label: 'Music' },
  { id: 'movies', label: 'Movies' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const active = useActiveSection(LINKS.map((l) => l.id));
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const menuBtn = useRef(null);

  // Close the mobile menu with Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-nav">
      <nav className="nav-bar" aria-label="Main">
        <a className="brand" href="#top" aria-label={`${profile.name || 'Home'} — back to top`}>
          <span className="brand-house">{Icon.home}</span>
          <span className="brand-name">{profile.name || 'A Life, Stitched'}</span>
        </a>
        <button
          ref={menuBtn}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="menu-yarn" aria-hidden="true" />
          {open ? 'Close' : 'Menu'}
        </button>
        <ul id="nav-links" className={`nav-links ${open ? 'is-open' : ''}`}>
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="nav-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  );
}
