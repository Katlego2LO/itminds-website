import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "IT Minds Institute";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0f2a24",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, opacity: 0.7 }}>
          QCTO ACCREDITED | NQF ALIGNED
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24 }}>{site.name}</div>
        <div style={{ fontSize: 36, marginTop: 24, opacity: 0.85 }}>{site.tagline}</div>
        <div style={{ fontSize: 28, marginTop: 60, opacity: 0.7 }}>{site.domain}</div>
      </div>
    ),
    { ...size },
  );
}