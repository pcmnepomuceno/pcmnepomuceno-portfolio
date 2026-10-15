import { ImageResponse } from "next/og";
import { profile } from "@/content";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hex values are allowed in this file only: ImageResponse renders outside CSS,
// so the globals.css tokens are unavailable. Values match the light theme tokens.
const washi = "#FAF7F2";
const sumi = "#1A1614";
const vermilion = "#C8102E";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: washi,
          color: sumi,
          borderLeft: `24px solid ${vermilion}`,
        }}
      >
        <div style={{ fontSize: 88, lineHeight: 1.1, fontWeight: 700 }}>{profile.name}</div>
        <div style={{ marginTop: 32, fontSize: 44, color: vermilion }}>{profile.role}</div>
      </div>
    ),
    size,
  );
}
