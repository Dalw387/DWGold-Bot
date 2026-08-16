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
          background: "#050816",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 6,
            width: 3,
            height: 20,
            background: "#326BFF",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 23,
            width: 16,
            height: 3,
            background: "#39D9FF",
          }}
        />
      </div>
    ),
    size,
  );
}
