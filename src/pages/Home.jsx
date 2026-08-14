import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import IntelligenceCore from "../components/IntelligenceCore.jsx";
import VideoStage from "../components/VideoStage.jsx";
import {
  EMAIL,
  agents,
  capabilities,
  commandModules,
  films,
  nexus,
  projects,
} from "../content/site.js";
import { replyTo } from "../lib/ask.js";

function useActiveIndex(length, rootMargin = "-40% 0px -40% 0px") {
  const refs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = refs.current.filter(Boolean);
    if (!nodes.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number(e.target.dataset.i);
            if (!Number.isNaN(i)) setActive(i);
          }
        });
      },
      { rootMargin, threshold: 0.35 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [length, rootMargin]);

  return { refs, active };
}

export default function Home() {
  const cap = useActiveIndex(capabilities.length);
  const [agent, setAgent] = useState(0);
  const [ask, setAsk] = useState("");
  const [asked, setAsked] = useState("");
  const [priceStep, setPriceStep] = useState(0);
  const flagship = films[0];
  const current = agents[agent];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPriceStep(2);
      return undefined;
    }
    const t1 = setTimeout(() => setPriceStep(1), 900);
    const t2 = setTimeout(() => setPriceStep(2), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <section className="hero" aria-label="Vision">
        <div className="hero-copy">
          <h1 className="display">
            We build
            <br />
            digital systems
            <br />
            that move business.
          </h1>
          <p className="hero-prop">
            Websites. AI agents. Automation. Digital experiences.
            <br />
            Built by AI. Directed by humans.
          </p>
          <div className="actions">
            <a className="btn btn-ghost" href="#what-kiwi-builds">
              Explore Kiwi
            </a>
            <Link className="btn btn-primary" to="/build">
              Start a project
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <IntelligenceCore />
        </div>
        <span className="hero-scroll">Scroll</span>
      </section>

      <section className="chapter" id="what-kiwi-builds">
        <p className="chapter-index">02 — What Kiwi builds</p>
        <h2 className="display">
          More than
          <br />
          websites.
        </h2>
        <p className="lede" style={{ marginTop: "1.6rem" }}>
          We build digital business systems.
        </p>
      </section>

      <section className="chapter cap-stage" aria-label="Capabilities">
        <p className="chapter-index">The complete capability</p>
        <div>
          {capabilities.map((c, i) => (
            <p
              key={c.name}
              ref={(el) => {
                cap.refs.current[i] = el;
              }}
              data-i={i}
              className={`cap-word ${i === cap.active ? "" : "is-dim"}`}
            >
              <Link to={c.href}>{c.name}</Link>
            </p>
          ))}
        </div>
      </section>

      <section className="chapter" id="explain">
        <p className="chapter-index">03 — Explain Kiwi</p>
        <h2 className="display-md">What is Kiwi Vision Media?</h2>
        <p className="lede" style={{ marginBottom: "2.5rem" }}>
          One film. Then the rest of Watch Kiwi, when you want it.
        </p>
        <VideoStage film={flagship} />
        <div className="actions">
          <Link className="btn btn-text" to="/watch">
            Watch Kiwi
          </Link>
        </div>
      </section>

      <section className="chapter">
        <p className="chapter-index">04 — Show, don’t claim</p>
        <h2 className="display">
          Don’t take
          <br />
          our word for it.
        </h2>
        <p className="lede" style={{ marginTop: "1.4rem" }}>
          Showroom concepts. One at a time. Not a wall of thumbnails.
        </p>
      </section>

      {projects.map((p) => (
        <section className="chapter" key={p.slug} aria-label={p.title}>
          <div className="showroom-slide">
            <div className="show-meta">
              <p className="kicker">{p.sector}</p>
              <h2 className="display-md">{p.title}</h2>
              <p className="lede" style={{ marginTop: "1.2rem" }}>
                {p.statement}
              </p>
              <div className="actions">
                <Link className="btn btn-ghost" to={`/work/${p.slug}`}>
                  View project
                </Link>
                <Link className="btn btn-text" to={`/watch/${p.watch}`}>
                  Watch story
                </Link>
                <Link className="btn btn-text" to={`/work/${p.slug}`}>
                  Explore experience
                </Link>
              </div>
            </div>
            <div className="show-frame">
              <img src={p.image} alt="" loading="lazy" />
            </div>
          </div>
        </section>
      ))}

      <section className="chapter" id="ai">
        <p className="chapter-index">05 — The AI system</p>
        <h2 className="display">
          One intelligence.
          <br />
          Specialist capabilities.
        </h2>
        <div className="agent-stage" style={{ marginTop: "3.5rem" }}>
          <IntelligenceCore compact agent={current.id} />
          <div className="agent-copy">
            <div className="agent-nav" role="tablist" aria-label="Agents">
              {agents.map((a, i) => (
                <button
                  key={a.id}
                  type="button"
                  className={i === agent ? "is-on" : ""}
                  onClick={() => setAgent(i)}
                >
                  {a.name}
                </button>
              ))}
            </div>
            <p className="agent-role">{current.role}</p>
            <h3>{current.name}</h3>
            <dl>
              <dt>What it does</dt>
              <dd>{current.does}</dd>
              <dt>Why a business would care</dt>
              <dd>{current.care}</dd>
              <dt>Example outcome</dt>
              <dd>{current.outcome}</dd>
              <dt>Human boundary</dt>
              <dd>{current.human}</dd>
            </dl>
          </div>
        </div>
      </section>

      <section className="chapter">
        <p className="chapter-index">Nexus</p>
        <h2 className="display-md">Meet Nexus.</h2>
        <p className="lede" style={{ marginTop: "1.4rem" }}>
          {nexus.does}
        </p>
        <p className="lede">{nexus.human}</p>
        <div className="actions">
          <Link className="btn btn-ghost" to="/ai">
            The AI system
          </Link>
        </div>
      </section>

      <section className="chapter" id="build">
        <p className="chapter-index">06 — Build my site</p>
        <h2 className="display">
          Your business.
          <br />
          Your vision.
          <br />
          Built with Kiwi.
        </h2>
        <p className="lede" style={{ marginTop: "1.5rem" }}>
          A Vision Blueprint. One decision at a time. Not a form.
        </p>
        <div className="actions">
          <Link className="btn btn-primary" to="/build">
            Begin
          </Link>
        </div>
      </section>

      <section className="chapter" id="command">
        <p className="chapter-index">07 — Kiwi Command</p>
        <div className="split">
          <div>
            <h2 className="display-md">
              The operating
              <br />
              system.
            </h2>
            <p className="lede" style={{ marginTop: "1.3rem" }}>
              Projects. Approvals. Invoices. Analytics. AI. Support. Documents. Reports.
            </p>
            <div className="actions">
              <Link className="btn btn-ghost" to="/watch/kiwi-command">
                Watch Kiwi Command
              </Link>
              <Link className="btn btn-primary" to="/command">
                Explore Kiwi Command
              </Link>
            </div>
          </div>
          <div className="device" aria-hidden="true">
            <div className="device-bar">
              <i />
              <i />
              <i />
            </div>
            <h3>Command</h3>
            <p>One surface. One thing at a time.</p>
            <ul>
              {commandModules.slice(0, 5).map((m) => (
                <li key={m.id}>
                  {m.name}
                  <span>Open</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="chapter" id="model">
        <p className="chapter-index">08 — The business model</p>
        <div className="price-hold">
          <h2 className="display">£0 upfront.</h2>
          {priceStep >= 1 && (
            <h3 className="display" style={{ marginTop: "1.2rem" }}>
              From £99/month.
            </h3>
          )}
          {priceStep >= 2 && (
            <>
              <p className="lede" style={{ marginTop: "2rem" }}>
                The work is the engagement — not a surprise invoice at the start.
                Detail waits until you want it.
              </p>
              <div className="actions">
                <Link className="btn btn-ghost" to="/pricing">
                  See pricing
                </Link>
                <Link className="btn btn-text" to="/watch/pricing">
                  Watch the model
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="chapter">
        <p className="chapter-index">09 — AI + humans</p>
        <h2 className="display">
          AI speed.
          <br />
          Human judgement.
        </h2>
        <p className="lede" style={{ marginTop: "1.6rem" }}>
          AI prepares and constructs. People set the standard, approve what is public,
          and keep every promise. There are no invented faces here, and no invented numbers.
        </p>
        <div className="actions">
          <Link className="btn btn-text" to="/about">
            How we work
          </Link>
        </div>
      </section>

      <section className="chapter" id="ask">
        <p className="chapter-index">10 — Ask Kiwi</p>
        <div className="ask-home">
          <h2 className="display">
            Have a question?
            <br />
            Ask Kiwi.
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setAsked(replyTo(ask));
            }}
          >
            <label className="sr-only" htmlFor="home-ask">
              Ask Kiwi
            </label>
            <input
              id="home-ask"
              value={ask}
              onChange={(e) => setAsk(e.target.value)}
              placeholder="Type, then return."
              autoComplete="off"
            />
            <button className="btn btn-text" type="submit">
              Ask
            </button>
          </form>
          {asked && <p className="lede" style={{ marginTop: "1.5rem" }}>{asked}</p>}
          <div className="actions">
            <Link className="btn btn-ghost" to="/ask">
              Open conversation
            </Link>
            <a className="btn btn-text" href={`mailto:${EMAIL}`}>
              A person instead
            </a>
          </div>
        </div>
      </section>

      <section className="chapter invite">
        <p className="chapter-index">11 — Invitation</p>
        <div className="split">
          <div>
            <h2 className="display">
              What should we
              <br />
              build together?
            </h2>
            <div className="actions">
              <Link className="btn btn-primary" to="/build">
                Start a project
              </Link>
              <Link className="btn btn-ghost" to="/ask">
                Talk to Kiwi
              </Link>
            </div>
            <div className="contact-row">
              <a href={`mailto:${EMAIL}`}>Email</a>
              <span>WhatsApp — awaiting number</span>
              <span>Call — awaiting number</span>
            </div>
          </div>
          <IntelligenceCore compact />
        </div>
      </section>
    </>
  );
}
