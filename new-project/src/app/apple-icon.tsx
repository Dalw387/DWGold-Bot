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
          background: "#050812",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 48, top: 58, width: 10, height: 86, background: "#AEB9C8" }} />
        <div style={{ position: "absolute", left: 48, top: 58, width: 54, height: 10, background: "#AEB9C8" }} />
        <div style={{ position: "absolute", left: 98, top: 36, width: 44, height: 10, background: "#3475FF", transform: "rotate(-32deg)" }} />
        <div style={{ position: "absolute", left: 44, top: 138, width: 18, height: 18, borderRadius: 18, background: "#DCE4EC" }} />
        <div style={{ position: "absolute", left: 126, top: 28, width: 22, height: 22, borderRadius: 22, background: "#3475FF" }} />
        <div style={{ position: "absolute", left: 44, top: 54, width: 16, height: 16, borderRadius: 16, background: "#36D8FF" }} />
      </div>
    ),
    size,
  );
}
