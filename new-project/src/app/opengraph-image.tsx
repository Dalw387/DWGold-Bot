import { ImageResponse } from "next/og";

export const alt = "LocalLaunch — AI marketing workforce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #050611 0%, #0c1638 40%, #2a1760 72%, #e447d1 100%)",
          color: "#F4F7FF",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 4, color: "#49E6FF" }}>
          LOCALLAUNCH · AI WORKFORCE
        </div>
        <div style={{ fontSize: 58, lineHeight: 1.05, maxWidth: 980, fontWeight: 600 }}>
          Meet the AI team that grows your business.
        </div>
        <div style={{ fontSize: 22, color: "#D7DEF0" }}>
          Six specialists · 24 work rooms · £197 once
        </div>
      </div>
    ),
    size,
  );
}
