import { projects } from '../data.js';
import { Fill, SectionHead, Icon } from './ui.jsx';

export default function Projects({ onOpenProject }) {
  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="wrap">
        <SectionHead
          crumb="Projects"
          id="projects-title"
          title="Things I have built."
          lede="A dedicated home for my business website, client work and WordPress projects."
        />
        <figure className="scene patch patch--art reveal">
          <img
            src="art/scene-projects.webp"
            width="752"
            height="496"
            loading="lazy"
            alt="Knitted laptops, a tablet and browser windows on a woolen desk with a coffee mug and plants"
          />
        </figure>

        <ul className="project-list">
          {projects.map((p) => (
            <li key={p.id} className={`project-card patch tint-${p.tint} reveal`}>
              <div className="project-thumb" aria-hidden="true">
                <img src={p.cover} alt="" loading="lazy" />
              </div>
              <div className="project-body">
                <h3 className="project-title">
                  <span className="num">{p.number} /</span> {p.title}
                </h3>
                <p>{p.summary}</p>
                <p className="project-meta">
                  <Fill value={p.name} label={p.nameLabel} /> /{' '}
                  {p.liveUrl ? (
                    <span className="url">{p.liveUrl.replace(/^https?:\/\//, '')}</span>
                  ) : (
                    <Fill value={null} label={p.id === 'wordpress' ? 'Approved work samples' : 'Live website URL'} />
                  )}
                </p>
              </div>
              <button
                type="button"
                className="btn btn--rust project-open"
                onClick={() => onOpenProject(p.id)}
                aria-haspopup="dialog"
              >
                View project<span className="sr-only">: {p.title}</span> {Icon.arrow}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
