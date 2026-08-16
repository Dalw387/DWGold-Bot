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
          background: "#050812",
          color: "#F5F8FF",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#9BA9BE" }}>
          LOCALLAUNCH
        </div>
        <div style={{ fontSize: 58, lineHeight: 1.05, maxWidth: 980, fontWeight: 500 }}>
          Meet the AI team that grows your business.
        </div>
        <div style={{ fontSize: 22, color: "#9BA9BE" }}>
          Trades · clinics · estate agents · professional services · £197 once
        </div>
      </div>
    ),
    size,
  );
}
