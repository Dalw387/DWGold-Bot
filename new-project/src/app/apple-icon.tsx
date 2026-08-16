import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#050611",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 42, top: 52, width: 12, height: 92, background: "#49E6FF" }} />
        <div style={{ position: "absolute", left: 42, top: 52, width: 62, height: 12, background: "#8B5CFF" }} />
        <div style={{ position: "absolute", left: 78, top: 128, width: 64, height: 12, background: "#E447D1" }} />
        <div style={{ position: "absolute", left: 130, top: 48, width: 12, height: 92, background: "#E447D1" }} />
        <div style={{ position: "absolute", left: 124, top: 36, width: 24, height: 24, borderRadius: 24, background: "#FF4DB8" }} />
        <div style={{ position: "absolute", left: 36, top: 132, width: 22, height: 22, borderRadius: 22, background: "#49E6FF" }} />
      </div>
    ),
    size,
  );
}
