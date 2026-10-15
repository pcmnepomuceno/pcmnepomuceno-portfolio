import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Czed Nepomuceno",
  description: "Portfolio of Czed Nepomuceno",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
