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
          background: "#050611",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 7, top: 9, width: 2, height: 17, background: "#49E6FF" }} />
        <div style={{ position: "absolute", left: 7, top: 9, width: 11, height: 2, background: "#8B5CFF" }} />
        <div style={{ position: "absolute", left: 14, top: 24, width: 12, height: 2, background: "#E447D1" }} />
        <div style={{ position: "absolute", left: 24, top: 8, width: 2, height: 18, background: "#E447D1" }} />
        <div style={{ position: "absolute", left: 23, top: 6, width: 5, height: 5, borderRadius: 5, background: "#FF4DB8" }} />
        <div style={{ position: "absolute", left: 6, top: 24, width: 4, height: 4, borderRadius: 4, background: "#49E6FF" }} />
      </div>
    ),
    size,
  );
}
