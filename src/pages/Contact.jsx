import { EMAIL } from "../content/site.js";
import { faqs } from "../content/site.js";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">Contact</p>
        <h1 className="display">
          Direct,
          <br />
          and quiet.
        </h1>
      </header>
      <div className="prose">
        <p>
          Email is the confirmed channel:{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <p>
          Telephone and WhatsApp will be published here once the owner confirms the number.
          We will not invent one.
        </p>
        <p>
          A suggested mailbox — {`kiwivisionmedialtd@gmail.com`} — waits on the owner creating the account.
        </p>
      </div>
      <div className="actions">
        <a className="btn btn-primary" href={`mailto:${EMAIL}`}>Email</a>
        <Link className="btn btn-ghost" to="/ask">Ask Kiwi</Link>
        <Link className="btn btn-text" to="/build">Start a project</Link>
      </div>
      <div className="contact-row">
        <span>WhatsApp — awaiting number</span>
        <span>Call — awaiting number</span>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">FAQ</p>
        <h1 className="display">Asked plainly.</h1>
      </header>
      {faqs.map((f) => (
        <details key={f.q} className="faq-item">
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Support() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">Support</p>
        <h1 className="display">A person, when a person is needed.</h1>
        <p className="lede">
          Clients raise tickets inside Kiwi Command. Everyone else may email or ask Kiwi.
        </p>
      </header>
      <div className="actions">
        <a className="btn btn-primary" href={`mailto:${EMAIL}?subject=Support`}>Email support</a>
        <Link className="btn btn-ghost" to="/login">Client login</Link>
        <Link className="btn btn-text" to="/ask">Ask Kiwi</Link>
      </div>
    </div>
  );
}

export function Voice() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">Voice AI</p>
        <h1 className="display">Spoken, when it helps.</h1>
        <p className="lede voice-note">
          Voice is optional. Text is always available. A human handoff is always available.
          Pulse can take a call in the manner of the house — then stop, the moment judgement is required.
        </p>
      </header>
      <div className="actions">
        <Link className="btn btn-primary" to="/ask">Try Ask Kiwi</Link>
        <Link className="btn btn-ghost" to="/ai">The AI system</Link>
      </div>
    </div>
  );
}
