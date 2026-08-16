import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
        <div style={{ position: "absolute", left: 8, top: 10, width: 2, height: 16, background: "#AEB9C8" }} />
        <div style={{ position: "absolute", left: 8, top: 10, width: 10, height: 2, background: "#AEB9C8" }} />
        <div style={{ position: "absolute", left: 17, top: 6, width: 8, height: 2, background: "#3475FF", transform: "rotate(-32deg)" }} />
        <div style={{ position: "absolute", left: 7, top: 24, width: 4, height: 4, borderRadius: 4, background: "#DCE4EC" }} />
        <div style={{ position: "absolute", left: 22, top: 5, width: 5, height: 5, borderRadius: 5, background: "#3475FF" }} />
      </div>
    ),
    size,
  );
}
