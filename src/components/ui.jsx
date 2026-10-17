/* Small shared building blocks. */

/** Shows `value`, or a dashed [placeholder] chip when it is missing. */
export function Fill({ value, label, as: Tag = 'span' }) {
  if (value !== null && value !== undefined && value !== '') return <Tag>{value}</Tag>;
  return (
    <Tag className="ph" title="Placeholder — update in src/data.js">
      [{label}]
    </Tag>
  );
}

const isSet = (v) => typeof v === 'string' && v.trim() !== '';

/**
 * A button-styled link. With no `href` it renders a disabled, non-link
 * element so there is never a dummy destination.
 */
export function LinkButton({ href, children, variant = 'rust', external = true, disabledText, icon }) {
  if (!isSet(href)) {
    return (
      <span className={`btn btn--${variant} is-disabled`} aria-disabled="true" title="Link not added yet — update in src/data.js">
        {icon}
        {disabledText || children}
      </span>
    );
  }
  const ext = external && /^https?:/i.test(href);
  return (
    <a
      className={`btn btn--${variant}`}
      href={href}
      {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {icon}
      {children}
      {ext && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export function Sprig({ flip = false, className = '' }) {
  return (
    <svg
      className={`sprig ${flip ? 'sprig--flip' : ''} ${className}`}
      viewBox="0 0 40 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 20 C 14 16, 26 12, 38 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="13" cy="12" rx="6" ry="3" transform="rotate(-35 13 12)" fill="currentColor" />
      <ellipse cx="22" cy="17" rx="6" ry="3" transform="rotate(10 22 17)" fill="currentColor" />
      <ellipse cx="27" cy="6" rx="6" ry="3" transform="rotate(-40 27 6)" fill="currentColor" />
    </svg>
  );
}

/** Stitched pill label used for chapter and section headings. */
export function StitchLabel({ children, tone = 'navy', as: Tag = 'span', id }) {
  return (
    <Tag className={`stitch-label tone-${tone}`} id={id}>
      <Sprig />
      <span>{children}</span>
      <Sprig flip />
    </Tag>
  );
}

export function SectionHead({ crumb, title, lede, id }) {
  return (
    <header className="section-head reveal">
      <p className="crumb">A Life, Stitched Together / {crumb}</p>
      <h2 className="embroider" id={id}>
        {title}
      </h2>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}

export const Icon = {
  arrow: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="i">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  down: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="i">
      <path d="M12 5v13M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  external: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="i">
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="i">
      <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="i">
      <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="i">
      <rect x="3" y="5.5" width="18" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="i">
      <path d="M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 9.5c.3 2.4 2.2 4.6 5.3 5.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="i">
      <path d="M4 11l8-6.5 8 6.5M6 9.8V19h12V9.8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M10 19v-5h4v5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

export { isSet };
