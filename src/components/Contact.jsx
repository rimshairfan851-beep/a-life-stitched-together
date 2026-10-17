import { contact } from '../data.js';
import { Fill, SectionHead, Icon, isSet } from './ui.jsx';

const SOCIAL_ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="i">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="i">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10.5V16M8 7.6v.2M11.5 16v-5.5M11.5 13c0-2 4.5-3 4.5 0v3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="i">
      <path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.3 1.3a11.4 11.4 0 0 0-6 0C6.7 2.6 5.7 2.9 5.7 2.9a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.3 9.3c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="i">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="10" r="2.4" fill="currentColor" />
    </svg>
  ),
};

/** '+44 7700 900123' → '447700900123' (wa.me wants digits only). */
export const waDigits = (n) => (isSet(n) ? n.replace(/[^\d]/g, '') : '');

function ContactRow({ label, value, placeholder, href, icon, tint, external }) {
  const inner = (
    <>
      <span className="contact-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="contact-text">
        <span className="eyebrow">{label}</span>
        <span className="contact-value">
          <Fill value={value} label={placeholder} />
        </span>
      </span>
      {href && <span className="contact-go" aria-hidden="true">{Icon.arrow}</span>}
    </>
  );
  if (href) {
    return (
      <a
        className={`contact-row patch tint-${tint} is-link`}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
        <span className="sr-only">{external ? ' (opens in a new tab)' : ''}</span>
      </a>
    );
  }
  return <div className={`contact-row patch tint-${tint}`}>{inner}</div>;
}

export default function Contact() {
  const wa = waDigits(contact.whatsapp);
  const place = [contact.city, contact.country].filter(isSet).join(', ');

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <SectionHead
          crumb="Contact"
          id="contact-title"
          title="Let’s connect the threads."
          lede="For website projects, collaborations or a friendly hello."
        />

        <div className="contact-layout">
          <figure className="scene patch patch--art reveal">
            <img
              src="art/scene-contact.webp"
              width="752"
              height="496"
              loading="lazy"
              alt="Knitted envelope, phone and contact badges in front of a cosy cottage"
            />
          </figure>

          <div className="contact-rows reveal">
            <ContactRow
              label="Email"
              value={contact.email}
              placeholder="Your email address"
              href={isSet(contact.email) ? `mailto:${contact.email.trim()}` : null}
              icon={Icon.mail}
              tint="sage"
            />
            <ContactRow
              label="WhatsApp"
              value={contact.whatsapp}
              placeholder="Your phone number with country code"
              href={wa.length >= 8 ? `https://wa.me/${wa}` : null}
              icon={Icon.chat}
              tint="sky"
              external
            />
            <ContactRow
              label="Residence"
              value={place || null}
              placeholder="City, Country"
              href={null}
              icon={SOCIAL_ICONS.home}
              tint="sage"
            />
          </div>
        </div>

        <ul className="social-grid">
          {contact.socials.map((s) => (
            <li key={s.id} className="reveal">
              <ContactRow
                label={s.label}
                value={s.handle || (isSet(s.url) ? s.url.replace(/^https?:\/\/(www\.)?/, '') : null)}
                placeholder="Profile URL / handle"
                href={isSet(s.url) ? s.url : null}
                icon={SOCIAL_ICONS[s.id]}
                tint="cream"
                external
              />
            </li>
          ))}
        </ul>
        <p className="fine-print">Cards without a link yet are shown as placeholders and aren’t clickable.</p>
      </div>
    </section>
  );
}
