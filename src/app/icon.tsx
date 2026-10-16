import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

// Hex values are allowed in this file only: ImageResponse renders outside CSS,
// so the globals.css tokens are unavailable. Default font, no network fetch.
const vermilion = "#C8102E";
const white = "#FFFFFF";

export default function Icon() {
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
          fontSize: 34,
          fontWeight: 700,
          borderRadius: 10,
        }}
      >
        C
      </div>
    ),
    size,
  );
}
