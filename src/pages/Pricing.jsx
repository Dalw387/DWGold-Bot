import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">Pricing</p>
        <h1 className="display">£0 upfront.</h1>
        <h2 className="display" style={{ marginTop: "0.6rem" }}>From £99/month.</h2>
      </header>
      <div className="prose price-note">
        <p>
          There is nothing to pay to begin. The monthly figure follows the work — a site,
          an agent, an operating system, or the whole house.
        </p>
        <p>
          We do not open with a comparison matrix. If you want the shape of an engagement,
          start a project or ask Kiwi. A person will set the figure plainly.
        </p>
      </div>
      <div className="actions">
        <Link className="btn btn-primary" to="/build">Start a project</Link>
        <Link className="btn btn-ghost" to="/watch/pricing">Watch the model</Link>
        <Link className="btn btn-text" to="/faq">Questions</Link>
      </div>
    </div>
  );
}
