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
          background: "#050816",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 44,
            top: 34,
            width: 16,
            height: 112,
            background: "#326BFF",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 44,
            top: 130,
            width: 92,
            height: 16,
            background: "#39D9FF",
          }}
        />
      </div>
    ),
    size,
  );
}
