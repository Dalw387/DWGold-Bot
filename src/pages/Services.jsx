import { Link, useParams } from "react-router-dom";
import { capabilities, industries, services } from "../content/site.js";

export default function Services() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">Services</p>
        <h1 className="display">
          The system,
          <br />
          not the menu.
        </h1>
        <p className="lede">
          Every capability has a page. None of them need to shout at once.
        </p>
      </header>
      <ul className="list-plain">
        {services.map((s) => (
          <li key={s.slug}>
            <Link className="link-line" to={`/services/${s.slug}`}>
              {s.name}
              <span>{s.kicker}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Service() {
  const { slug } = useParams();
  const s = services.find((x) => x.slug === slug);
  if (!s) {
    return (
      <div className="page">
        <h1 className="display-md">This service is not listed.</h1>
        <Link className="btn btn-text" to="/services">All services</Link>
      </div>
    );
  }
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">{s.kicker}</p>
        <h1 className="display">{s.name}</h1>
        <p className="lede">{s.lede}</p>
      </header>
      <div className="prose">
        <p>{s.body}</p>
        <p>Read it. Watch it. Experience it.</p>
      </div>
      <div className="actions">
        <Link className="btn btn-ghost" to="/watch">Watch Kiwi</Link>
        <Link className="btn btn-primary" to="/build">Start a project</Link>
      </div>
    </div>
  );
}

export function Industries() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">Industries</p>
        <h1 className="display">The same restraint. Different houses.</h1>
      </header>
      <ul className="list-plain">
        {industries.map((i) => (
          <li key={i.slug}>
            <Link className="link-line" to={`/industries/${i.slug}`}>
              {i.name}
              <span>Explainer</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Industry() {
  const { slug } = useParams();
  const i = industries.find((x) => x.slug === slug);
  if (!i) {
    return (
      <div className="page">
        <h1 className="display-md">This industry is not listed.</h1>
        <Link className="btn btn-text" to="/industries">Industries</Link>
      </div>
    );
  }
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">Industry</p>
        <h1 className="display">{i.name}</h1>
        <p className="lede">{i.lede}</p>
      </header>
      <div className="prose">
        <p>{i.body}</p>
      </div>
      <div className="actions">
        <Link className="btn btn-ghost" to={`/watch/industry-${i.slug}`}>Watch explainer</Link>
        <Link className="btn btn-primary" to="/build">Start a project</Link>
      </div>
    </div>
  );
}

export function CapabilityIndex() {
  return (
    <div className="page">
      <ul className="list-plain">
        {capabilities.map((c) => (
          <li key={c.name}>
            <Link className="link-line" to={c.href}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
