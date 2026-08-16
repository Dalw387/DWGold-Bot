import { ImageResponse } from "next/og";

export const alt = "LocalLaunch AI";
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
          background: "#12100e",
          color: "#f6f1e8",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#d7c4a1" }}>
          LocalLaunch AI
        </div>
        <div style={{ fontSize: 64, lineHeight: 1.1, maxWidth: 900 }}>
          Quiet words. House agents. Honest proof.
        </div>
        <div style={{ fontSize: 24, color: "#e8dcc8" }}>
          Read the offer. Pay £197. Use the desk.
        </div>
      </div>
    ),
    size,
  );
}
