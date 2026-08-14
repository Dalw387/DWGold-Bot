import { useRef, useState } from "react";
import { EMAIL } from "../content/site.js";
import { replyTo } from "../lib/ask.js";

export default function Ask() {
  const [text, setText] = useState("");
  const [thread, setThread] = useState([
    {
      who: "kiwi",
      text: "Ask anything about Kiwi. Text is always available. A person is always available.",
    },
  ]);
  const listening = useRef(false);

  const send = (value) => {
    const msg = (value ?? text).trim();
    if (!msg) return;
    const answer = replyTo(msg);
    setThread((t) => [...t, { who: "you", text: msg }, { who: "kiwi", text: answer }]);
    setText("");
  };

  const voice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setThread((t) => [
        ...t,
        { who: "kiwi", text: "Voice is not available in this browser. Type instead, or email a person." },
      ]);
      return;
    }
    const rec = new SR();
    rec.lang = "en-GB";
    rec.onresult = (e) => {
      const said = e.results[0][0].transcript;
      send(said);
    };
    rec.start();
    listening.current = true;
  };

  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">Ask Kiwi</p>
        <h1 className="display">
          Have a question?
        </h1>
      </header>
      <div className="ask-thread" aria-live="polite">
        {thread.map((m, i) => (
          <div key={i} className={`ask-bubble ${m.who}`}>
            <div className="ask-who">{m.who === "kiwi" ? "Kiwi" : "You"}</div>
            <p style={{ margin: 0, lineHeight: 1.55 }}>{m.text}</p>
          </div>
        ))}
      </div>
      <form
        className="ask-composer"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <label className="sr-only" htmlFor="ask-box">Message</label>
        <textarea
          id="ask-box"
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write to Kiwi."
        />
        <button className="btn btn-primary" type="submit">Send</button>
      </form>
      <div className="actions">
        <button className="btn btn-ghost" type="button" onClick={voice}>Voice</button>
        <a className="btn btn-text" href={`mailto:${EMAIL}`}>Human handoff</a>
      </div>
    </div>
  );
}
