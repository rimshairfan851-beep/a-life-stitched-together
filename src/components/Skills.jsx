import { useState } from 'react';
import { skills, platforms } from '../data.js';
import { Fill, SectionHead, StitchLabel } from './ui.jsx';

export default function Skills() {
  const [picked, setPicked] = useState(null);
  const current = skills.find((s) => s.id === picked);

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHead
          crumb="Skills"
          id="skills-title"
          title="The threads I work with."
          lede="Languages I know, and the platforms I’ve worked on day to day. Select a badge to learn more."
        />

        <div className="skills-board patch reveal">
          <div className="board-label">
            <StitchLabel tone="sage" as="h3">
              Languages
            </StitchLabel>
          </div>
          <ul className="badges">
            {skills.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className="badge"
                  aria-pressed={picked === s.id}
                  aria-controls="skill-note"
                  onClick={() => setPicked((p) => (p === s.id ? null : s.id))}
                >
                  <img src={s.icon} alt="" width="96" height="96" loading="lazy" />
                  <span className="badge-name">{s.name}</span>
                </button>
              </li>
            ))}
          </ul>
          <div id="skill-note" className={`skill-note ${current ? 'is-open' : ''}`} aria-live="polite">
            {current ? (
              <p>
                <strong>{current.name}</strong> — <Fill value={current.note} label={`Where you’ve used ${current.name}`} />
              </p>
            ) : (
              <p className="hint">Tap a badge to see where I’ve used it.</p>
            )}
          </div>
        </div>

        <div className="platforms reveal">
          <div className="board-label">
            <StitchLabel tone="rust" as="h3">
              Platform experience
            </StitchLabel>
          </div>
          <ul className="platform-list">
            {platforms.map((p) => (
              <li key={p.id} className="platform patch tint-cream">
                <span className={`platform-icon ${p.id === 'shopify' ? 'is-scene' : ''}`} aria-hidden="true">
                  <img src={p.icon} alt="" loading="lazy" />
                </span>
                <span>
                  <strong>{p.name}</strong>
                  <span className="platform-note">{p.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
