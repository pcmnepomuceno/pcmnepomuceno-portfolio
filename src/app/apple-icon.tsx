import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Hex values are allowed in this file only: ImageResponse renders outside CSS,
// so the globals.css tokens are unavailable. Same as the seal: fixed vermilion, white C, square
// (iOS applies its own corner mask).
const vermilion = "#D7261E";
const white = "#FFFFFF";

// Static TTF (Satori can't read woff2), SIL OFL 1.1; see og-fonts/OFL.txt.
const medium = await readFile(join(process.cwd(), "src/app/og-fonts/PlusJakartaSans-500.ttf"));

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: vermilion,
          color: white,
          fontFamily: "Plus Jakarta Sans",
          fontSize: 120,
          fontWeight: 500,
        }}
      >
        C
      </div>
    ),
    { ...size, fonts: [{ name: "Plus Jakarta Sans", data: medium, weight: 500, style: "normal" }] },
  );
}
