import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Serif_JP } from "next/font/google";
import { ThemeProvider } from "next-themes";
import CommandPalette from "@/components/CommandPalette";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { nav, profile, siteDescription, siteUrl, skipLink } from "@/content";
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
          <header className="border-b border-border">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2">
              <a
                href="#home"
                className="inline-flex min-h-11 grow basis-0 items-center font-serif text-lg sm:min-h-0 sm:grow-0 sm:basis-auto hover:text-accent motion-safe:transition-colors"
              >
                {profile.name}
              </a>
              {/* Below sm this wrapper is display: contents, so nav and tools join the outer row:
                  name and toggle on row 1, nav (order-last) below. DOM order is unchanged. */}
              <div className="contents sm:flex sm:flex-wrap sm:items-center sm:gap-x-3">
                <nav aria-label="Primary" className="order-last basis-full sm:order-none sm:basis-auto">
                  {/* links carry the spacing as padding (44px hit area); -mx-2 keeps text aligned */}
                  <ul role="list" className="-mx-2 flex flex-wrap font-mono text-sm">
                    {nav.map((item) => (
                      <li key={item}>
                        <a
                          href={`#${item.toLowerCase()}`}
                          className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 hover:text-accent motion-safe:transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="flex items-center gap-2">
                  <CommandPalette />
                  <ThemeToggle />
                </div>
              </div>
            </div>
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
