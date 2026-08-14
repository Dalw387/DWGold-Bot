import { Link, useParams } from "react-router-dom";
import { projects } from "../content/site.js";

export default function Work() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">Showroom</p>
        <h1 className="display">Work.</h1>
        <p className="lede">
          One project at a time. These are designed concepts until a client has approved a true story.
        </p>
      </header>
      {projects.map((p) => (
        <article className="showroom-slide" key={p.slug} style={{ minHeight: "80vh", marginBottom: "12vh" }}>
          <div>
            <p className="kicker">{p.sector}</p>
            <h2 className="display-md">{p.title}</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>{p.statement}</p>
            <div className="actions">
              <Link className="btn btn-primary" to={`/work/${p.slug}`}>View project</Link>
              <Link className="btn btn-text" to={`/watch/${p.watch}`}>Watch story</Link>
            </div>
          </div>
          <div className="show-frame">
            <img src={p.image} alt="" loading="lazy" />
          </div>
        </article>
      ))}
    </div>
  );
}

export function Project() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  if (!p) {
    return (
      <div className="page">
        <h1 className="display-md">Not in the showroom.</h1>
        <Link className="btn btn-text" to="/work">Back to work</Link>
      </div>
    );
  }
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">{p.sector} · Concept</p>
        <h1 className="display">{p.title}</h1>
        <p className="lede">{p.statement}</p>
      </header>
      <div className="show-frame" style={{ marginBottom: "4rem" }}>
        <img src={p.image} alt="" loading="lazy" />
      </div>
      <div className="prose">
        <p>{p.copy}</p>
        <p>This is a composed experience, not a testimonial and not a statistic.</p>
      </div>
      <div className="actions">
        <Link className="btn btn-ghost" to={`/watch/${p.watch}`}>Watch story</Link>
        <Link className="btn btn-primary" to="/build">Start a project</Link>
      </div>
    </div>
  );
}

export function Concepts() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">Concepts</p>
        <h1 className="display">Designed. Not claimed.</h1>
        <p className="lede">
          The showroom holds atmospheres we can build. When a live engagement is ready to be told, it will be named as such.
        </p>
      </header>
      <ul className="list-plain">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link className="link-line" to={`/work/${p.slug}`}>
              {p.title}
              <span>{p.sector}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
