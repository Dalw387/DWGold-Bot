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
          background: "#191919",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 44,
            top: 34,
            width: 34,
            height: 112,
            background: "#f4f3ef",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 44,
            top: 112,
            width: 92,
            height: 34,
            background: "#f4f3ef",
          }}
        />
      </div>
    ),
    size,
  );
}
