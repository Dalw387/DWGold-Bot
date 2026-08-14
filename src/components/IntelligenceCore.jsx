import { useId } from "react";

export default function IntelligenceCore({
  compact = false,
  agent = "atlas",
  className = "",
}) {
  const uid = useId().replace(/:/g, "");
  const src = agent === "signal" || agent === "nexus" ? "/art/iris-alt.webp" : "/art/iris-core.webp";

  return (
    <div
      className={`core ${compact ? "compact" : "hero"} breathe spin ${className}`}
      aria-hidden="true"
    >
      <div className="core-orbit">
        <svg viewBox="0 0 200 200">
          <defs>
            <linearGradient id={`goldOrbit-${uid}`} x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#8a7350" />
              <stop offset="28%" stopColor="#e8d3b0" />
              <stop offset="52%" stopColor="#c6a97a" />
              <stop offset="78%" stopColor="#7a6244" />
              <stop offset="100%" stopColor="#d9c19a" />
            </linearGradient>
          </defs>
          <ellipse
            cx="100"
            cy="100"
            rx="92"
            ry="90"
            fill="none"
            stroke={`url(#goldOrbit-${uid})`}
            strokeWidth="0.9"
            opacity="0.92"
          />
          <circle cx="100" cy="10" r="1.15" className="core-agent-pip" />
        </svg>
      </div>
      <div className="core-stage">
        <img className="core-iris" src={src} alt="" width="1024" height="1024" decoding="async" />
        <div className="core-light" />
      </div>
    </div>
  );
}
