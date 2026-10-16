import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Hex values are allowed in this file only: ImageResponse renders outside CSS,
// so the globals.css tokens are unavailable. Default font, no network fetch.
const vermilion = "#C8102E";
const white = "#FFFFFF";

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
          fontSize: 128,
          fontWeight: 700,
        }}
      >
        C
      </div>
    ),
    size,
  );
}
