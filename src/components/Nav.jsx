import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { EMAIL, nav, services, projects } from "../content/site.js";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(null);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
    setMega(null);
  }, [loc.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-nav">
        <Link className="wordmark" to="/">
          Kiwi Vision Media
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onMouseEnter={() => setMega(item.menu || null)}
              onFocus={() => setMega(item.menu || null)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link className="btn btn-primary nav-cta" to="/build">
          Start a project
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </header>

      {mega && (
        <div className="mega open" onMouseLeave={() => setMega(null)}>
          {mega === "services" && (
            <div className="mega-grid">
              {services.map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`}>
                  {s.name}
                  <span className="hint">{s.lede}</span>
                </Link>
              ))}
            </div>
          )}
          {mega === "work" && (
            <div className="mega-grid">
              {projects.map((p) => (
                <Link key={p.slug} to={`/work/${p.slug}`}>
                  {p.title}
                  <span className="hint">{p.sector}</span>
                </Link>
              ))}
              <Link to="/work">
                Showroom
                <span className="hint">One project at a time.</span>
              </Link>
              <Link to="/watch">
                Watch Kiwi
                <span className="hint">The film library.</span>
              </Link>
              <Link to="/concepts">
                Concepts
                <span className="hint">Designed, not claimed.</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {open && (
        <div className="overlay-nav" role="dialog" aria-label="Menu">
          <nav>
            {nav.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
            <Link to="/build">Start a project</Link>
            <Link to="/ask">Ask Kiwi</Link>
            <Link to="/watch">Watch</Link>
          </nav>
          <div className="overlay-contact">
            <a href={`mailto:${EMAIL}`}>Email</a>
            <span>WhatsApp — number to follow</span>
            <span>Call — number to follow</span>
          </div>
        </div>
      )}

      <details className="mobile-contact">
        <summary aria-label="Contact">Talk</summary>
        <div className="sheet">
          <a href={`mailto:${EMAIL}`}>Email</a>
          <span className="soon">WhatsApp — awaiting number</span>
          <span className="soon">Call — awaiting number</span>
        </div>
      </details>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <h2>Kiwi Vision Media</h2>
          <p>Digital systems that move business.</p>
          <p>Built by AI. Directed by humans.</p>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <div>
          <h2>Visit</h2>
          <Link to="/work">Work</Link>
          <Link to="/services">Services</Link>
          <Link to="/ai">AI</Link>
          <Link to="/command">Kiwi Command</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/about">About</Link>
        </div>
        <div>
          <h2>Experience</h2>
          <Link to="/build">Build my site</Link>
          <Link to="/ask">Ask Kiwi</Link>
          <Link to="/watch">Watch Kiwi</Link>
          <Link to="/voice">Voice</Link>
          <Link to="/process">Process</Link>
          <Link to="/login">Client login</Link>
        </div>
        <div>
          <h2>House</h2>
          <Link to="/faq">FAQ</Link>
          <Link to="/support">Support</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/industries">Industries</Link>
          <Link to="/legal/privacy">Privacy</Link>
          <Link to="/legal/accessibility">Accessibility</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Kiwi Vision Media Limited. Vision | Motion | Impact.</span>
        <div className="footer-legal">
          <Link to="/legal/privacy">Privacy</Link>
          <Link to="/legal/cookies">Cookies</Link>
          <Link to="/legal/terms">Terms</Link>
          <Link to="/legal/accessibility">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
