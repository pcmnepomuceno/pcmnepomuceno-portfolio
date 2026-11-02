import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import CommandPalette from "@/components/CommandPalette";
import SiteNav from "@/components/SiteNav";
import Seal from "@/components/ui/Seal";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { backToTop, profile, siteDescription, siteUrl, skipLink } from "@/content";
import "./globals.css";

// The only font. No 600/700 is loaded, so font-semibold and font-bold would render faux bold.
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
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
    <html lang="en" className={sans.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:text-sm"
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
          {/* On the canvas, not the red band: it also closes the case study, and the red seal would vanish on red.
              No top hairline: the red band's edge (home) or the credit line's hairline (case study) separates it. */}
          <footer>
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 px-4 py-3 text-sm text-muted">
              <p className="flex items-center gap-3">
                <Seal className="size-5 text-xs" />
                {/* Short name below sm so the footer stays one row at 320px. */}
                <span>
                  <span className="sm:hidden">{profile.shortName}</span>
                  <span className="hidden sm:inline">{profile.name}</span> © {new Date().getFullYear()}
                </span>
              </p>
              <a
                href="#main"
                className="inline-flex min-h-11 items-center hover:text-accent motion-safe:transition-colors"
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
