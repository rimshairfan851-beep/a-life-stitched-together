import { useEffect, useRef } from 'react';
import { profile } from '../data.js';
import { useReducedMotion } from '../hooks.js';
import { Fill, Icon } from './ui.jsx';

const TONES = ['navy', 'mustard', 'rust'];

export default function Hero() {
  const reduced = useReducedMotion();
  const artRef = useRef(null);

  // Subtle layered movement: the artwork drifts a little slower than the page.
  useEffect(() => {
    if (reduced) {
      if (artRef.current) artRef.current.style.transform = '';
      return;
    }
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = Math.min(window.scrollY, 900);
        if (artRef.current) artRef.current.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">
            Hi, I’m <Fill value={profile.name} label="Your name" />
          </p>
          <h1 id="hero-title" className="hero-title">
            {profile.heroTitle.map((line, i) => (
              <span key={line} className={`hero-line tone-${TONES[i % 3]}`} style={{ '--i': i }}>
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-sub">{profile.heroSubtitle}</p>
          <div className="hero-actions">
            <a className="btn btn--rust" href="#story">
              Explore My Story {Icon.down}
            </a>
            <a className="btn btn--cream" href="#projects">
              View Projects {Icon.arrow}
            </a>
          </div>
        </div>

        <div className="hero-art" ref={artRef}>
          <svg className="hero-thread" viewBox="0 0 400 300" aria-hidden="true" preserveAspectRatio="none">
            <path d="M-20 250 C 60 300, 120 120, 70 90 S 150 10, 260 40 S 360 30, 390 6" />
          </svg>
          <div className="patch patch--art hero-patch">
            <img
              src="art/hero-laptop.webp"
              width="554"
              height="294"
              alt="Knitted laptop showing a landscape, beside a coffee cup, a plant and books labeled Ideas, Plan and Build"
            />
          </div>
          <span className="yarn-ball hero-ball" aria-hidden="true" />
        </div>
      </div>
      <div className="hero-hedge" aria-hidden="true" />
    </section>
  );
}
