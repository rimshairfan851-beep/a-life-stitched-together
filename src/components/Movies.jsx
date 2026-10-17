import { movies, movieTaste } from '../data.js';
import { Fill, LinkButton, SectionHead, Icon } from './ui.jsx';

const TINTS = ['sage', 'sky', 'sage', 'sky'];

export default function Movies() {
  return (
    <section className="section movies" id="movies" aria-labelledby="movies-title">
      <div className="wrap">
        <SectionHead
          crumb="Movies"
          id="movies-title"
          title="Stories beyond the screen."
          lede="A personal shelf of favorite movies and the stories that stay with me."
        />
        <figure className="scene patch patch--art reveal">
          <img
            src="art/scene-movies.webp"
            width="752"
            height="496"
            loading="lazy"
            alt="Knitted cinema with red curtains, a sunset on screen, popcorn, a film reel and a clapperboard"
          />
        </figure>

        <ul className="movie-grid">
          {movies.map((m, n) => (
            <li key={n} className={`movie-card patch tint-${TINTS[n % TINTS.length]} reveal`} style={{ '--d': `${n * 70}ms` }}>
              <p className="eyebrow">Favorite / {String(n + 1).padStart(2, '0')}</p>
              <h3 className="movie-title">
                <Fill value={m.title} label="Movie title" />
              </h3>
              <p className="movie-meta">
                <Fill value={m.year} label="Year" /> / <Fill value={m.genre} label="Genre" />
              </p>
              <p className="movie-note">
                <Fill value={m.note} label="One sentence about why this movie matters to me" />
              </p>
              <div className="card-actions">
                <LinkButton href={m.trailerUrl} variant="cream" disabledText="No trailer link yet" icon={Icon.play}>
                  Watch trailer
                </LinkButton>
              </div>
            </li>
          ))}
        </ul>

        <article className="patch tint-cream taste reveal" aria-labelledby="taste-h">
          <p className="eyebrow" id="taste-h">
            My kind of stories
          </p>
          <p className="big">
            <Fill value={movieTaste.genres} label="Favorite genres" /> / <Fill value={movieTaste.note} label="A short note about my taste in movies" />
          </p>
        </article>
      </div>
    </section>
  );
}
