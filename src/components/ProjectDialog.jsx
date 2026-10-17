import { useEffect, useRef } from 'react';
import { projects } from '../data.js';
import { Fill, LinkButton, Icon } from './ui.jsx';

/**
 * Accessible project detail view built on the native <dialog> element:
 * focus moves inside, the page behind is inert, Escape closes it,
 * and focus returns to the button that opened it.
 */
export default function ProjectDialog({ project, onClose, onNavigate }) {
  const ref = useRef(null);
  const opener = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (project && !dlg.open) {
      opener.current = document.activeElement;
      dlg.showModal();
      document.documentElement.classList.add('has-modal');
    } else if (!project && dlg.open) {
      dlg.close();
    }
    if (project) {
      dlg.querySelector('.dialog-scroll')?.scrollTo(0, 0);
      headingRef.current?.focus();
    }
  }, [project]);

  useEffect(() => {
    const dlg = ref.current;
    const onCloseEvt = () => {
      document.documentElement.classList.remove('has-modal');
      onClose();
      const el = opener.current;
      if (el && typeof el.focus === 'function') el.focus();
    };
    dlg.addEventListener('close', onCloseEvt);
    return () => dlg.removeEventListener('close', onCloseEvt);
  }, [onClose]);

  // Click on the dimmed backdrop closes the dialog.
  const onBackdrop = (e) => {
    if (e.target === ref.current) ref.current.close();
  };

  const i = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const next = i >= 0 ? projects[(i + 1) % projects.length] : null;
  const prev = i >= 0 ? projects[(i - 1 + projects.length) % projects.length] : null;

  return (
    <dialog ref={ref} className="project-dialog" aria-labelledby="dialog-title" onClick={onBackdrop}>
      {project && (
        <div className={`dialog-card patch tint-${project.tint}`}>
          <div className="dialog-top">
            <p className="crumb">Project {project.number}</p>
            <button type="button" className="icon-btn" onClick={() => ref.current.close()} aria-label="Close project details">
              {Icon.close}
            </button>
          </div>
          <div className="dialog-scroll">
            <h2 id="dialog-title" className="embroider dialog-title" tabIndex={-1} ref={headingRef}>
              {project.title}
            </h2>
            <p className="dialog-name">
              <Fill value={project.name} label={project.nameLabel} />
            </p>

            <div className="dialog-cover">
              <img src={project.cover} alt={project.coverAlt} />
            </div>

            <div className="dialog-grid">
              <section aria-labelledby="d-overview">
                <h3 id="d-overview">Overview</h3>
                <p>
                  {project.overview || (
                    <>
                      {project.summary} <Fill value={null} label="Add a short overview: what the site is and who it serves" />
                    </>
                  )}
                </p>
              </section>

              <section aria-labelledby="d-contrib">
                <h3 id="d-contrib">My contribution</h3>
                <ul className="stitch-list">
                  {project.contribution.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                  <li>
                    <Fill value={null} label="Add specific tasks you handled" />
                  </li>
                </ul>
              </section>

              <section aria-labelledby="d-tech">
                <h3 id="d-tech">Technology</h3>
                {project.technology.length ? (
                  <ul className="chips">
                    {project.technology.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    <Fill value={null} label="Add the tools and platforms used" />
                  </p>
                )}
              </section>
            </div>

            <section aria-labelledby="d-shots" className="dialog-shots">
              <h3 id="d-shots">Screenshots</h3>
              <ul className="shots">
                {project.screenshots.length
                  ? project.screenshots.map((s, n) => (
                      <li key={s}>
                        <img src={s} alt={`${project.title} screenshot ${n + 1}`} loading="lazy" />
                      </li>
                    ))
                  : [1, 2, 3].map((n) => (
                      <li key={n} className="shot-ph">
                        <span>
                          [Screenshot {n}]
                          <small>add to /public/screenshots</small>
                        </span>
                      </li>
                    ))}
              </ul>
            </section>

            <div className="dialog-links">
              <LinkButton href={project.liveUrl} disabledText="Live link coming soon" icon={Icon.external}>
                Visit live website
              </LinkButton>
              {project.githubUrl && (
                <LinkButton href={project.githubUrl} variant="navy">
                  View on GitHub
                </LinkButton>
              )}
            </div>
          </div>

          <div className="dialog-foot">
            <button type="button" className="btn btn--small btn--cream" onClick={() => onNavigate(prev.id)}>
              ← <span className="sr-only">Previous project: </span>
              {prev.title}
            </button>
            <button type="button" className="btn btn--small btn--cream" onClick={() => onNavigate(next.id)}>
              <span className="sr-only">Next project: </span>
              {next.title} →
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
