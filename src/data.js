/* =====================================================================
   PORTFOLIO CONTENT — edit this one file to update the whole site.
   ---------------------------------------------------------------------
   Rules the site follows:
   • Any value left as `null` (or an empty list) shows a clearly
     labeled [placeholder] on the page instead of made-up content.
   • Any link left as `null` is shown as a disabled button — the site
     never points to a dummy destination.
   • Images live in /public. Story and scene art is in /public/art;
     put your project screenshots in /public/screenshots and list the
     file paths below (e.g. 'screenshots/business-home.webp').
   ===================================================================== */

export const profile = {
  name: 'Rimsha Irfan', // shown in the header and footer
  heroTitle: ['A Life,', 'Stitched', 'Together.'],
  heroSubtitle: 'My journey from school to building websites.',
};

/* ---------------------------------------------------------------------
   MY STORY — in chronological order. `year` is optional: leave null
   to show a [Year] placeholder, or set it to e.g. '2020'.
   --------------------------------------------------------------------- */
export const storyChapters = [
  {
    id: 'learning',
    label: 'The Learning Years',
    tone: 'navy',
    steps: [
      {
        id: 'school',
        title: 'School',
        year: '2019',
        text: 'Completed school in 2019.',
        image: 'art/story-school.webp',
        alt: 'Knitted school building with pink blossom trees',
      },
      {
        id: 'college',
        title: 'College',
        year: null,
        text: 'Went on to college.',
        image: 'art/story-college.webp',
        alt: 'Knitted stack of books, an open notebook and a coffee cup',
      },
      {
        id: 'university',
        title: 'University',
        year: null,
        text: 'Then moved on to university.',
        image: 'art/story-university.webp',
        alt: 'Knitted graduation cap resting on books in front of a campus',
      },
    ],
  },
  {
    id: 'working',
    label: 'Learning While Working',
    tone: 'sage',
    steps: [
      {
        id: 'hairstylist',
        title: 'Part-time hairstylist',
        year: null,
        text: 'Worked part time as a hairstylist during my first university semester.',
        image: 'art/story-hairstylist.webp',
        alt: 'Knitted hairstylist styling a client’s hair beside a mirror',
      },
      {
        id: 'shopify',
        title: 'Shopify management',
        year: null,
        org: null, // company name, e.g. 'Company Ltd.'
        text: 'Then worked in Shopify management at a company.',
        image: 'art/story-shopify.webp',
        alt: 'Knitted laptop showing a shopping-bag logo, with parcels and a cart',
      },
      {
        id: 'haier',
        title: 'Haier internship',
        year: null,
        text: 'During summer break, while still holding that job, I completed an internship at Haier.',
        image: 'art/story-haier.webp',
        alt: 'Knitted blue Haier office building surrounded by trees',
      },
    ],
  },
  {
    id: 'path',
    label: 'Building My Own Path',
    tone: 'rust',
    steps: [
      {
        id: 'business',
        title: 'My own business',
        year: null,
        text: 'Started my own business and built its website myself.',
        image: 'art/story-business.webp',
        alt: 'Knitted web-shop page showing a sweater and a cart icon',
        projectId: 'business',
      },
      {
        id: 'uklaptop',
        title: 'UK laptop store',
        year: null,
        text: 'Created a website for a UK laptop-selling client.',
        image: 'art/story-uklaptop.webp',
        alt: 'Knitted web page showing a laptop for sale',
        projectId: 'uklaptop',
      },
    ],
  },
  {
    id: 'after',
    label: 'After University',
    tone: 'mustard',
    steps: [
      {
        id: 'wordpress',
        title: 'WordPress websites',
        year: null,
        org: null, // company name
        text: 'Right after university, I joined a company and worked on WordPress websites.',
        image: 'art/story-graduate.webp',
        alt: 'Knitted graduate looking out over a sunset city skyline',
        projectId: 'wordpress',
      },
    ],
  },
];

/* ---------------------------------------------------------------------
   PROJECTS — each card opens a detail view.
   • overview / contribution / technology: fill in your own words.
   • screenshots: list of image paths (relative to /public).
   • liveUrl / githubUrl: full https:// links, or null to disable.
     GitHub buttons are hidden entirely when githubUrl is null.
   --------------------------------------------------------------------- */
export const projects = [
  {
    id: 'business',
    number: '01',
    title: 'My Business Website',
    summary: 'I started my own business and built its website myself.',
    nameLabel: 'Business name',
    name: null,
    tint: 'sage',
    cover: 'art/story-business.webp',
    coverAlt: 'Knitted illustration of an online shop page',
    overview: null,
    contribution: ['Built the website myself for my own business.'],
    technology: [],
    screenshots: [],
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: 'uklaptop',
    number: '02',
    title: 'UK Laptop Store',
    summary: 'A website I created for a UK laptop-selling client.',
    nameLabel: 'Client name',
    name: null,
    tint: 'sky',
    cover: 'art/story-uklaptop.webp',
    coverAlt: 'Knitted illustration of a laptop store web page',
    overview: null,
    contribution: ['Created the website for the client.'],
    technology: [],
    screenshots: [],
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: 'wordpress',
    number: '03',
    title: 'WordPress Work',
    summary: 'Website work from my company role after university.',
    nameLabel: 'Company name',
    name: null,
    tint: 'sage',
    cover: 'art/story-wordpress.webp',
    coverAlt: 'Knitted illustration of a WordPress site on a monitor',
    overview: null,
    contribution: ['Worked on WordPress websites as part of the company team.'],
    technology: ['WordPress'],
    screenshots: [], // only add work you have permission to show
    liveUrl: null,
    githubUrl: null,
  },
];

/* ---------------------------------------------------------------------
   SKILLS — no proficiency percentages, by design.
   `note` is optional: a short line shown when a badge is selected.
   --------------------------------------------------------------------- */
export const skills = [
  { id: 'html', name: 'HTML', icon: 'art/skill-html.webp', note: null },
  { id: 'css', name: 'CSS', icon: 'art/skill-css.webp', note: null },
  { id: 'sql', name: 'SQL', icon: 'art/skill-sql.webp', note: null },
  { id: 'cpp', name: 'C++', icon: 'art/skill-cpp.webp', note: null },
  { id: 'python', name: 'Python', icon: 'art/skill-python.webp', note: null },
];

export const platforms = [
  {
    id: 'shopify',
    name: 'Shopify',
    icon: 'art/story-shopify.webp',
    note: 'Shopify management at a company.',
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    icon: 'art/skill-wordpress.webp',
    note: 'WordPress websites in my company role after university.',
  },
];

/* ---------------------------------------------------------------------
   MUSIC — nothing ever plays on arrival.
   • url: an ordinary link (Spotify / Apple Music / YouTube) — opens in a new tab.
   • embedUrl: optional embed link. The player only loads after the visitor
     presses "Load player". Examples:
       Spotify:  https://open.spotify.com/embed/track/<ID>
                 https://open.spotify.com/embed/playlist/<ID>
       YouTube:  https://www.youtube-nocookie.com/embed/<ID>
   --------------------------------------------------------------------- */
export const music = {
  favoriteTrack: { title: null, artist: null, url: null, embedUrl: null },
  playlist: { name: null, description: null, url: null, embedUrl: null },
  artists: [null, null, null],
};

/* ---------------------------------------------------------------------
   MOVIES — add as many as you like (3 looks best).
   --------------------------------------------------------------------- */
export const movies = [
  { title: null, year: null, genre: null, note: null, trailerUrl: null },
  { title: null, year: null, genre: null, note: null, trailerUrl: null },
  { title: null, year: null, genre: null, note: null, trailerUrl: null },
];

export const movieTaste = { genres: null, note: null };

/* ---------------------------------------------------------------------
   CONTACT
   • whatsapp: full international number, digits only or with + and
     spaces, e.g. '+44 7700 900123'. The site builds the wa.me link.
   • instagram / linkedin / github: full profile URLs.
     `handle` is the text shown on the card, e.g. '@yourname'.
   --------------------------------------------------------------------- */
export const contact = {
  email: null,
  whatsapp: '+92 305 6180941',
  city: null,
  country: null,
  socials: [
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/riimshaw/', handle: '@riimshaw' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/rimsha-irfan-70b842424/', handle: 'Rimsha Irfan' },
    { id: 'github', label: 'GitHub', url: 'https://github.com/rimshairfan851-beep', handle: 'rimshairfan851-beep' },
  ],
};
