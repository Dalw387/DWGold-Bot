import { ImageResponse } from "next/og";

export const alt = "LocalLaunch";
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
          background: "#f4f3ef",
          color: "#191919",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: "#191919",
              display: "flex",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 10,
                top: 7,
                width: 8,
                height: 26,
                background: "#f4f3ef",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 10,
                top: 25,
                width: 20,
                height: 8,
                background: "#f4f3ef",
              }}
            />
          </div>
          <div style={{ fontSize: 28, letterSpacing: -0.5 }}>LocalLaunch</div>
        </div>
        <div style={{ fontSize: 56, lineHeight: 1.15, maxWidth: 920 }}>
          One extra job can cover £197. The next customer is the return.
        </div>
        <div style={{ fontSize: 22, color: "#5f5c56" }}>
          A customer-getting desk for local businesses.
        </div>
      </div>
    ),
    size,
  );
}
