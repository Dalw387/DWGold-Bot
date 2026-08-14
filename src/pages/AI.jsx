import { Link } from "react-router-dom";
import { useState } from "react";
import IntelligenceCore from "../components/IntelligenceCore.jsx";
import { agents, nexus } from "../content/site.js";

export default function AI() {
  const [i, setI] = useState(0);
  const a = agents[i];
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">AI</p>
        <h1 className="display">
          One intelligence.
          <br />
          Specialist capabilities.
        </h1>
      </header>
      <div className="agent-stage">
        <IntelligenceCore compact agent={a.id} />
        <div className="agent-copy">
          <div className="agent-nav">
            {agents.map((x, n) => (
              <button key={x.id} type="button" className={n === i ? "is-on" : ""} onClick={() => setI(n)}>
                {x.name}
              </button>
            ))}
          </div>
          <p className="agent-role">{a.role}</p>
          <h3>{a.name}</h3>
          <dl>
            <dt>What it does</dt>
            <dd>{a.does}</dd>
            <dt>Why a business would care</dt>
            <dd>{a.care}</dd>
            <dt>Example outcome</dt>
            <dd>{a.outcome}</dd>
            <dt>Human boundary</dt>
            <dd>{a.human}</dd>
          </dl>
        </div>
      </div>
      <section style={{ padding: "18vh 0 8vh" }}>
        <p className="kicker">Orchestrator</p>
        <h2 className="display-md">Meet Nexus.</h2>
        <p className="lede" style={{ marginTop: "1.2rem" }}>{nexus.does}</p>
        <p className="lede">{nexus.care}</p>
        <p className="lede">{nexus.human}</p>
        <div className="actions">
          <Link className="btn btn-ghost" to="/watch/meet-the-agents">Watch the agents</Link>
          <Link className="btn btn-primary" to="/ask">Ask Kiwi</Link>
        </div>
      </section>
    </div>
  );
}
