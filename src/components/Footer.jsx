import { contact, profile } from '../data.js';
import { Icon, isSet } from './ui.jsx';

export default function Footer() {
  const href = isSet(contact.email) ? `mailto:${contact.email.trim()}` : '#contact';
  return (
    <footer className="site-footer" aria-labelledby="footer-title">
      <div className="footer-copy reveal">
        <h2 id="footer-title" className="embroider footer-title">
          Let’s Build the Next Chapter.
        </h2>
        <a className="btn btn--rust btn--big" href={href}>
          Get in touch {Icon.arrow}
        </a>
      </div>
      <div className="footer-scene" aria-hidden="true">
        <img src="art/footer-left.webp" alt="" className="fs-left" loading="lazy" />
        <img src="art/footer-right.webp" alt="" className="fs-right" loading="lazy" />
      </div>
      <div className="footer-base">
        <p>
          © {new Date().getFullYear()} {profile.name || '[Your name]'} · Handmade with HTML, CSS &amp; React
        </p>
        <a href="#top" className="to-top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
