import { useState } from "react";
import { Link } from "react-router-dom";
import { commandModules } from "../content/site.js";

export default function Command() {
  const [mod, setMod] = useState(commandModules[0]);
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">Kiwi Command</p>
        <h1 className="display">
          You remain
          <br />
          in command.
        </h1>
        <p className="lede">
          The operating system for the engagement. Not a dashboard dumped onto the homepage.
        </p>
      </header>
      <div className="command-shell">
        <div className="command-top">
          <span>Kiwi Command</span>
          <span>Client preview</span>
        </div>
        <div className="command-nav">
          {commandModules.map((m) => (
            <button
              key={m.id}
              type="button"
              className={mod.id === m.id ? "is-on" : ""}
              onClick={() => setMod(m)}
            >
              {m.name}
            </button>
          ))}
        </div>
        <div className="command-body">
          <h3>{mod.name}</h3>
          <p className="lede">{mod.line}</p>
        </div>
      </div>
      <div className="actions">
        <Link className="btn btn-ghost" to="/watch/kiwi-command">Watch Kiwi Command</Link>
        <Link className="btn btn-primary" to="/login">Client login</Link>
      </div>
    </div>
  );
}
