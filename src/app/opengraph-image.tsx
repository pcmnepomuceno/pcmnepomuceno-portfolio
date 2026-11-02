import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hex values are allowed in this file only: ImageResponse renders outside CSS,
// so the globals.css tokens are unavailable. Values match the light theme tokens
// (canvas, ink, ink-2) and the seal's fixed vermilion.
const paper = "#F2EDE4";
const ink = "#1A1614";
const ink2 = "#635C56";
const vermilion = "#D7261E";

// Static TTFs (Satori can't read woff2), SIL OFL 1.1; see og-fonts/OFL.txt.
const font = (weight: number) =>
  readFile(join(process.cwd(), `src/app/og-fonts/PlusJakartaSans-${weight}.ttf`));
const [light, regular, medium] = await Promise.all([font(300), font(400), font(500)]);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: paper,
          color: ink,
          fontFamily: "Plus Jakarta Sans",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 90px",
          }}
        >
          {/* Seal: same as components/ui/Seal.tsx, square, white C at weight 500. */}
          <div
            style={{
              width: 96,
              height: 96,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: vermilion,
              color: "#FFFFFF",
              fontSize: 56,
              fontWeight: 500,
            }}
          >
            C
          </div>
          <div style={{ marginTop: 56, fontSize: 88, lineHeight: 1.1, fontWeight: 300 }}>{profile.name}</div>
          <div style={{ marginTop: 24, fontSize: 40, fontWeight: 400, color: ink2 }}>{profile.role}</div>
        </div>
        <div style={{ height: 72, background: vermilion }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plus Jakarta Sans", data: light, weight: 300, style: "normal" },
        { name: "Plus Jakarta Sans", data: regular, weight: 400, style: "normal" },
        { name: "Plus Jakarta Sans", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
