import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EMAIL, buildQuestions } from "../content/site.js";

export default function Build() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [draft, setDraft] = useState("");
  const q = buildQuestions[step];
  const done = step >= buildQuestions.length;

  const blueprint = useMemo(() => answers, [answers]);

  const commit = (value) => {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    setDraft("");
    setStep((s) => s + 1);
  };

  if (done) {
    return (
      <div className="page">
        <header className="page-head">
          <p className="kicker">Vision Blueprint</p>
          <h1 className="display">A beginning.</h1>
        </header>
        <div className="blueprint">
          <dl>
            {buildQuestions.map((item) => (
              <div key={item.id}>
                <dt>{item.kicker}</dt>
                <dd>{blueprint[item.id]}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="lede">
          This is enough to start. A person will read it. Kiwi will not publish anything from this page.
        </p>
        <div className="actions">
          <a
            className="btn btn-primary"
            href={`mailto:${EMAIL}?subject=Vision%20Blueprint&body=${encodeURIComponent(
              buildQuestions.map((item) => `${item.prompt}\n${blueprint[item.id]}`).join("\n\n")
            )}`}
          >
            Send to Kiwi
          </a>
          <button className="btn btn-ghost" type="button" onClick={() => { setStep(0); setAnswers({}); }}>
            Begin again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="build-stage">
        <p className="kicker">
          {String(step + 1).padStart(2, "0")} / {String(buildQuestions.length).padStart(2, "0")} · {q.kicker}
        </p>
        <h1 className="display-md">{q.prompt}</h1>
        {q.type === "text" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (draft.trim()) commit(draft.trim());
            }}
            style={{ marginTop: "2.5rem" }}
          >
            <label className="sr-only" htmlFor="build-a">{q.prompt}</label>
            <textarea
              id="build-a"
              rows={3}
              value={draft}
              placeholder={q.placeholder}
              onChange={(e) => setDraft(e.target.value)}
            />
            <div className="actions">
              <button className="btn btn-primary" type="submit" disabled={!draft.trim()}>
                Continue
              </button>
              {step > 0 && (
                <button className="btn btn-text" type="button" onClick={() => setStep((s) => s - 1)}>
                  Back
                </button>
              )}
            </div>
          </form>
        )}
        {q.type === "choice" && (
          <div className="choice-list">
            {q.options.map((opt) => (
              <button key={opt} type="button" onClick={() => commit(opt)}>
                {opt}
              </button>
            ))}
          </div>
        )}
        <p className="muted" style={{ marginTop: "3rem", fontSize: "0.85rem" }}>
          One decision at a time. <Link to="/watch/build-my-site">Watch how this works</Link>.
        </p>
      </div>
    </div>
  );
}
