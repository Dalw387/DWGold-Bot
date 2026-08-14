import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { commandModules } from "../content/site.js";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  return (
    <div className="page">
      <div className="login-box">
        <p className="kicker">Client login</p>
        <h1 className="display-md">Kiwi Command.</h1>
        <p className="lede">A preview of the operating system. Live accounts follow a signed engagement.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sessionStorage.setItem("kiwi-client", email || "preview");
            nav("/client");
          }}
        >
          <label className="sr-only" htmlFor="client-email">Email</label>
          <input
            id="client-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
          <button className="btn btn-primary" type="submit">Enter preview</button>
        </form>
      </div>
    </div>
  );
}

export function Client() {
  const [mod, setMod] = useState(commandModules[0]);
  const sample = {
    projects: ["Harbour — composition", "Atelier — timetable", "Chambers — portal"],
    approvals: ["Homepage lock-up — awaiting you", "Agent greeting — draft"],
    invoices: ["Engagement — current month"],
    analytics: ["This week, in language, once the site is live."],
    ai: ["Ask the system about the system."],
    support: ["No open tickets in this preview."],
    documents: ["Vision Blueprint", "Scope note"],
    reports: ["Nothing invented. Reports appear when there is something true to say."],
  };

  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">Client</p>
        <h1 className="display-md">Command.</h1>
        <p className="lede">Preview. One surface at a time.</p>
      </header>
      <div className="command-shell">
        <div className="command-top">
          <span>Kiwi Command</span>
          <Link to="/">Leave</Link>
        </div>
        <div className="command-nav">
          {commandModules.map((m) => (
            <button key={m.id} type="button" className={mod.id === m.id ? "is-on" : ""} onClick={() => setMod(m)}>
              {m.name}
            </button>
          ))}
        </div>
        <div className="command-body">
          <h3>{mod.name}</h3>
          <p className="lede">{mod.line}</p>
          <ul className="list-plain" style={{ marginTop: "2rem" }}>
            {(sample[mod.id] || []).map((line) => (
              <li key={line} className="link-line" style={{ fontSize: "1.4rem" }}>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
