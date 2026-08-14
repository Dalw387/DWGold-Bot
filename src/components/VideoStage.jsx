import { useEffect, useMemo, useRef, useState } from "react";

function formatTime(s) {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
}

export default function VideoStage({ film, autoPoster = true }) {
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [captionsOn, setCaptionsOn] = useState(true);
  const raf = useRef(0);
  const started = useRef(0);

  const duration = useMemo(() => {
    const last = film.beats[film.beats.length - 1];
    return (last?.t || 0) + 8;
  }, [film]);

  const beat = useMemo(() => {
    let current = film.beats[0];
    for (const b of film.beats) {
      if (t >= b.t) current = b;
    }
    return current;
  }, [film, t]);

  useEffect(() => {
    if (!playing) {
      cancelAnimationFrame(raf.current);
      return;
    }
    const tick = (now) => {
      if (!started.current) started.current = now - t * 1000;
      const next = Math.min((now - started.current) / 1000, duration);
      setT(next);
      if (next >= duration) {
        setPlaying(false);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, duration]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === " " && playing) {
        e.preventDefault();
        setPlaying(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  const restart = () => {
    started.current = 0;
    setT(0);
    setPlaying(true);
  };

  const pause = () => {
    setPlaying(false);
    started.current = 0;
  };

  const caption = captionsOn ? beat.sub || beat.line.replace(/\n/g, " ") : "";

  return (
    <div>
      <div className="video-stage cinema" role="region" aria-label={film.title}>
        {autoPoster && <img className="video-poster" src={film.poster} alt="" loading="lazy" />}
        <div className="video-veil" />
        {!playing && t === 0 && (
          <button className="video-play" type="button" onClick={restart} aria-label={`Play ${film.title}`}>
            <span>Play</span>
          </button>
        )}
        {(playing || t > 0) && (
          <div className="film">
            <p className="film-line">{beat.line}</p>
            {beat.sub ? <p className="film-sub">{beat.sub}</p> : <p className="film-sub"> </p>}
          </div>
        )}
        {captionsOn && (playing || t > 0) && caption && <div className="captions">{caption}</div>}
        <div className="film-controls">
          <button type="button" onClick={playing ? pause : restart}>
            {playing ? "Pause" : t > 0 && t < duration ? "Play" : "Play"}
          </button>
          <div className="film-bar" aria-hidden="true">
            <i style={{ width: `${Math.min(100, (t / duration) * 100)}%` }} />
          </div>
          <span>{formatTime(t)} / {formatTime(duration)}</span>
          <button type="button" onClick={() => setCaptionsOn((v) => !v)} aria-pressed={captionsOn}>
            {captionsOn ? "Captions on" : "Captions off"}
          </button>
        </div>
      </div>
      <details className="transcript">
        <summary>Transcript</summary>
        {film.transcript.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </details>
    </div>
  );
}
