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
          background: "#0c0c0c",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 6,
            width: 6,
            height: 20,
            background: "#f7f6f2",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 20,
            width: 16,
            height: 6,
            background: "#f7f6f2",
          }}
        />
      </div>
    ),
    size,
  );
}
