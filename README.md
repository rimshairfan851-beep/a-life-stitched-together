# A Life, Stitched Together — knitted portfolio

A responsive, interactive personal portfolio built with **React + Vite + plain CSS**.
Only dependencies: React, and the self-hosted Chewy and Nunito fonts.

## Run it

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # local dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the built site
```

The `dist/` folder is a static site: upload it to Netlify, Vercel, GitHub Pages, cPanel or any web host. It works from any sub-folder.

## Where to put your content

**Everything personal lives in one file: `src/data.js`.**
Any value left as `null` shows a dashed `[placeholder]` on the page. Any link left as `null` shows a disabled button, never a fake destination.

| What | Where in `src/data.js` |
| --- | --- |
| Your name (header, hero, footer) | `profile.name` |
| Story years and company names | `storyChapters → steps → year` / `org` |
| Project name, overview, contribution, technology | `projects[…]` |
| Project screenshots | put images in `public/screenshots/`, list paths in `projects[…].screenshots` |
| Live website / GitHub links | `projects[…].liveUrl` / `githubUrl` (GitHub button only appears when set) |
| Short note for each skill badge | `skills[…].note` |
| Favorite track, playlist, artists | `music` (see the embed examples in the file) |
| Movies and trailer links | `movies`, `movieTaste` |
| Email, WhatsApp, city/country, socials | `contact` |

### Contact links
- **Email** becomes `mailto:you@example.com`.
- **WhatsApp**: write the full international number, e.g. `'+44 7700 900123'`. The site builds `https://wa.me/447700900123`.
- **Instagram / LinkedIn / GitHub**: paste the full profile URL into `url`; `handle` is the text shown on the card.

### Music
Nothing plays when the page opens. Add `url` for a normal link, and optionally `embedUrl`
(e.g. `https://open.spotify.com/embed/playlist/<ID>`) for a player that only loads after the visitor presses **Load player**.

## Design & theme
- Colors, fonts, radii and the knit texture: `src/styles/theme.css` (CSS variables).
- Shared pieces (fabric cards, stitched labels, buttons, reveals): `src/styles/base.css`.
- Section layouts: `src/styles/sections.css`.

## Artwork
All illustrations in `public/art/` were extracted from the reference PDF:

- `hero-laptop`, `story-*`, `skill-*`, `footer-*` are cropped from page 1.
- `scene-projects`, `scene-music`, `scene-movies`, `scene-contact` are the illustrations from pages 2–5.

The crops come from a 1024×1536 source, so the small story images are about 250–340 px wide.
They look good at their display size. If you have the original high-resolution PNGs, export them at the same crop and replace the files, keeping the same names.

## Interactions & accessibility
- A yarn thread draws itself through the story as you scroll, with a little yarn ball at its tip; chapter knots fill in as you reach them.
- Gentle scroll reveals, a slow-drifting hero illustration, and buttons that press softly into the wool.
- Project cards open a native `<dialog>` with focus management. Escape closes it and returns focus. Previous/next lets visitors move between projects.
- There is a skip link, visible focus rings, 44 px+ touch targets, and an Escape-closable mobile menu.
- `prefers-reduced-motion` turns off all motion: the yarn shows fully drawn and nothing moves.
