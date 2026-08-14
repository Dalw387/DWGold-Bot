import { Link } from "react-router-dom";
import { processSteps } from "../content/site.js";

export default function About() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">About</p>
        <h1 className="display">
          Kiwi Vision
          <br />
          Media.
        </h1>
        <p className="lede">
          A studio for digital business systems. Websites, AI, automation, and the manner in which they meet a person.
        </p>
      </header>
      <div className="prose">
        <p>
          The surface is simple because the work underneath is not. We do not decorate complexity.
          We hide it until it is needed.
        </p>
        <p>
          Built by AI. Directed by humans. No invented team. No invented results.
        </p>
        <p>Kiwi Vision Media Limited. Vision | Motion | Impact.</p>
      </div>
      <div className="actions">
        <Link className="btn btn-ghost" to="/process">Process</Link>
        <Link className="btn btn-primary" to="/build">Start a project</Link>
      </div>
    </div>
  );
}

export function Process() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">Process</p>
        <h1 className="display">How the work moves.</h1>
      </header>
      {processSteps.map((s) => (
        <article className="process-item" key={s.n}>
          <p className="process-n">{s.n}</p>
          <h2 className="display-md">{s.title}</h2>
          <p className="lede">{s.body}</p>
        </article>
      ))}
    </div>
  );
}
