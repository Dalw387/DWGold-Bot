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
          background: "#f7f6f2",
          color: "#0c0c0c",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: "#0c0c0c",
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
                background: "#f7f6f2",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 10,
                top: 25,
                width: 20,
                height: 8,
                background: "#f7f6f2",
              }}
            />
          </div>
          <div style={{ fontSize: 28, letterSpacing: -0.5 }}>LocalLaunch</div>
        </div>
        <div style={{ fontSize: 52, lineHeight: 1.12, maxWidth: 960 }}>
          You run the business. The desk writes the next customer.
        </div>
        <div style={{ fontSize: 22, color: "#5c5a55" }}>
          £197 once. Named desks for leads, ads, social, appointments, reviews and search.
        </div>
      </div>
    ),
    size,
  );
}
