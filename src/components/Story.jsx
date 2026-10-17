import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { storyChapters } from '../data.js';
import { useReducedMotion } from '../hooks.js';
import { Fill, SectionHead, StitchLabel, Icon } from './ui.jsx';

/**
 * Builds a winding cubic path through the knot points.
 * Each segment bows out to alternating sides so the yarn meanders.
 */
function buildPath(points, sway) {
  if (points.length === 0) return '';
  const start = { x: points[0].x, y: Math.max(0, points[0].y - 90) };
  let d = `M ${start.x} ${start.y} Q ${start.x + sway * 0.6} ${(start.y + points[0].y) / 2} ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const dir = i % 2 ? 1 : -1;
    const dy = b.y - a.y;
    d += ` C ${a.x + sway * dir} ${a.y + dy * 0.35}, ${b.x + sway * dir} ${b.y - dy * 0.35}, ${b.x} ${b.y}`;
  }
  const last = points[points.length - 1];
  d += ` Q ${last.x - sway * 0.5} ${last.y + 60} ${last.x} ${last.y + 120}`;
  return d;
}

function YarnThread({ track, onReached }) {
  const reduced = useReducedMotion();
  const pathRef = useRef(null);
  const [geo, setGeo] = useState({ d: '', w: 0, h: 0, knotY: [] });
  const [len, setLen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ball, setBall] = useState(null);

  // Measure knots and rebuild the path whenever the layout changes.
  useLayoutEffect(() => {
    if (!track) return;
    const measure = () => {
      const box = track.getBoundingClientRect();
      const knots = Array.from(track.querySelectorAll('[data-knot]'));
      const pts = knots.map((k) => {
        const r = k.getBoundingClientRect();
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
      });
      const sway = box.width > 760 ? 110 : 16;
      setGeo({ d: buildPath(pts, sway), w: box.width, h: box.height, knotY: pts.map((p) => p.y) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    track.querySelectorAll('img').forEach((img) => img.addEventListener('load', measure, { once: true }));
    return () => ro.disconnect();
  }, [track]);

  useLayoutEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, [geo.d]);

  // Scroll-linked drawing: the yarn follows the reading position.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!track) return;
      const r = track.getBoundingClientRect();
      const focusY = window.innerHeight * 0.6 - r.top; // y inside the track
      const p = reduced ? 1 : Math.min(1, Math.max(0, focusY / r.height));
      setProgress(p);
      const reachedY = reduced ? Infinity : focusY;
      onReached(geo.knotY.filter((y) => y <= reachedY).length);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [track, reduced, geo.knotY, onReached]);

  // Position the little yarn ball at the tip of the drawn thread.
  useEffect(() => {
    if (!pathRef.current || !len) return;
    const pt = pathRef.current.getPointAtLength(len * progress);
    setBall({ x: pt.x, y: pt.y });
  }, [progress, len]);

  if (!geo.d) return null;
  return (
    <svg className="yarn-svg" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
      <path className="yarn-guide" d={geo.d} />
      <path
        ref={pathRef}
        className="yarn-thread"
        d={geo.d}
        style={len ? { strokeDasharray: len, strokeDashoffset: len * (1 - progress) } : undefined}
      />
      {/* light diagonal "ply" marks, revealed only where the thread is drawn */}
      <path className="yarn-twist" d={geo.d} mask="url(#yarn-mask)" />
      <defs>
        <mask id="yarn-mask" maskUnits="userSpaceOnUse">
          <path
            d={geo.d}
            stroke="#fff"
            strokeWidth="14"
            fill="none"
            style={len ? { strokeDasharray: len, strokeDashoffset: len * (1 - progress) } : undefined}
          />
        </mask>
      </defs>
      {ball && progress > 0.01 && progress < 0.995 && (
        <g transform={`translate(${ball.x} ${ball.y})`} className="yarn-tip">
          <circle r="11" className="yarn-tip-ball" />
          <path d="M-7 -4 C -2 -9, 5 -7, 8 -2 M-9 2 C -3 -3, 5 -2, 9 4 M-6 7 C -1 3, 4 4, 6 8" className="yarn-tip-lines" />
        </g>
      )}
    </svg>
  );
}

export default function Story({ onOpenProject }) {
  // callback ref: the thread needs the element after it mounts
  const [track, setTrack] = useState(null);
  const [reached, setReached] = useState(0);
  let idx = -1;

  return (
    <section className="section story" id="story" aria-labelledby="story-title">
      <div className="wrap">
        <SectionHead
          crumb="Story"
          id="story-title"
          title="My story, one stitch at a time."
          lede="From finishing school in 2019 to building websites — follow the thread."
        />
        <div className="story-track" ref={setTrack}>
          <YarnThread track={track} onReached={setReached} />
          {storyChapters.map((ch) => (
            <div className="chapter" key={ch.id}>
              <div className="chapter-label reveal">
                <StitchLabel tone={ch.tone} as="h3">
                  {ch.label}
                </StitchLabel>
              </div>
              <ol className="steps">
                {ch.steps.map((s) => {
                  idx += 1;
                  const n = idx;
                  const side = n % 2 === 0 ? 'left' : 'right';
                  return (
                    <li className={`step step--${side} ${n < reached ? 'is-reached' : ''}`} key={s.id}>
                      <span className="knot" data-knot aria-hidden="true">
                        <span>{String(n + 1).padStart(2, '0')}</span>
                      </span>
                      <article className={`story-card patch tint-${ch.tone} reveal`}>
                        <div className="story-art">
                          <img src={s.image} alt={s.alt} loading="lazy" />
                        </div>
                        <div className="story-body">
                          <p className="story-meta">
                            <span className="year-chip">
                              <Fill value={s.year} label="Year" />
                            </span>
                            {'org' in s && (
                              <span className="org">
                                <Fill value={s.org} label="Company name" />
                              </span>
                            )}
                          </p>
                          <h4 className="story-title">{s.title}</h4>
                          <p className="story-text">{s.text}</p>
                          {s.projectId && (
                            <button type="button" className="btn btn--small btn--navy" onClick={() => onOpenProject(s.projectId)}>
                              See the project {Icon.arrow}
                            </button>
                          )}
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
