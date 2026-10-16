import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Serif_JP } from "next/font/google";
import { ThemeProvider } from "next-themes";
import CommandPalette from "@/components/CommandPalette";
import SiteNav from "@/components/SiteNav";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { profile, siteDescription, siteUrl, skipLink } from "@/content";
import "./globals.css";

const serif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  variable: "--font-noto-serif-jp",
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
      className={`${serif.variable} ${mono.variable} ${sans.variable}`}
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
            <p className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted">
              © {new Date().getFullYear()} {profile.name}
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
