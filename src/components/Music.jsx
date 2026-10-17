import { useState } from 'react';
import { music } from '../data.js';
import { Fill, LinkButton, SectionHead, Icon, isSet } from './ui.jsx';

/** Click-to-play embed: nothing loads (or plays) until the visitor asks. */
function Player({ embedUrl, title }) {
  const [on, setOn] = useState(false);
  if (!isSet(embedUrl)) {
    return (
      <div className="player-ph">
        <span className="ph">[Player — add an embedUrl in src/data.js]</span>
      </div>
    );
  }
  if (!on) {
    return (
      <button type="button" className="btn btn--navy player-load" onClick={() => setOn(true)}>
        {Icon.play} Load player
        <span className="player-hint">Nothing plays until you press play</span>
      </button>
    );
  }
  return (
    <div className="player-frame">
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
    </div>
  );
}

export default function Music() {
  const { favoriteTrack: t, playlist, artists } = music;
  return (
    <section className="section music" id="music" aria-labelledby="music-title">
      <div className="wrap">
        <SectionHead
          crumb="Music"
          id="music-title"
          title="The soundtrack to my story."
          lede="A small corner for the songs, artists and playlists I want to share."
        />
        <figure className="scene patch patch--art reveal">
          <img
            src="art/scene-music.webp"
            width="752"
            height="496"
            loading="lazy"
            alt="Knitted headphones, a vinyl record, music notes and a small music player"
          />
        </figure>

        <article className="patch tint-sky music-repeat reveal" aria-labelledby="repeat-h">
          <div>
            <p className="eyebrow" id="repeat-h">
              On repeat
            </p>
            <p className="track">
              <Fill value={t.title} label="Favorite track" /> – <Fill value={t.artist} label="Artist" />
            </p>
            <LinkButton href={t.url} variant="cream" disabledText="Track link coming soon" icon={Icon.external}>
              Listen
            </LinkButton>
          </div>
          <Player embedUrl={t.embedUrl} title={`Player: ${t.title || 'favorite track'}`} />
        </article>

        <div className="two-up">
          <article className="patch tint-sage reveal" aria-labelledby="playlist-h">
            <h3 id="playlist-h" className="card-h">
              My playlist
            </h3>
            <p className="big">
              <Fill value={playlist.name} label="Playlist name" />
            </p>
            <p>
              <Fill value={playlist.description} label="Playlist description" />
            </p>
            <div className="card-actions">
              <LinkButton href={playlist.url} disabledText="Playlist coming soon" icon={Icon.external}>
                Open playlist
              </LinkButton>
            </div>
            {isSet(playlist.embedUrl) && <Player embedUrl={playlist.embedUrl} title={`Playlist: ${playlist.name || 'my playlist'}`} />}
          </article>

          <article className="patch tint-sage reveal" aria-labelledby="artists-h">
            <h3 id="artists-h" className="card-h">
              Favorite artists
            </h3>
            <ul className="artist-list">
              {artists.map((a, n) => (
                <li key={n}>
                  <span className="artist-dot" aria-hidden="true" />
                  <Fill value={a} label={`Artist ${String(n + 1).padStart(2, '0')}`} />
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
