import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import CommandPalette from "@/components/CommandPalette";
import SiteNav from "@/components/SiteNav";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { backToTop, profile, siteDescription, siteUrl, skipLink } from "@/content";
import "./globals.css";

// Self-hosted latin subset of Noto Serif JP 600. next/font/google would add ~120 CJK @font-face
// rules (about 34 KB gzip) to the render-blocking stylesheet. The site has no Japanese text.
// next/font/local names the family after this constant, so it must not be a CSS generic like "serif".
const notoSerifJP = localFont({
  src: "./fonts/NotoSerifJP-600-latin.woff2",
  weight: "600",
  style: "normal",
  display: "swap",
  variable: "--font-noto-serif-jp",
  adjustFontFallback: "Times New Roman",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: profile.name,
  description: siteDescription,
  openGraph: { title: profile.name, description: siteDescription, url: "/", type: "website" },
  // Images come from app/opengraph-image.tsx; Next copies them into twitter:image.
  twitter: { card: "summary_large_image", title: profile.name, description: siteDescription },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${notoSerifJP.variable} ${mono.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:font-mono focus:text-sm"
        >
          {skipLink}
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* z-40: below the skip link (z-50); the palette dialog sits in the top layer above both. */}
          <header className="sticky top-0 z-40 border-b border-border bg-background">
            <SiteNav>
              <CommandPalette />
              <ThemeToggle />
            </SiteNav>
          </header>
          {children}
          <footer className="border-t border-border">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 px-4 py-3 text-sm text-muted">
              <p>
                © {new Date().getFullYear()} {profile.name}
              </p>
              <a
                href="#home"
                className="inline-flex min-h-11 items-center font-mono hover:text-accent motion-safe:transition-colors"
              >
                {backToTop}
              </a>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
