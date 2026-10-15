import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Serif_JP } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ui/ThemeToggle";
import "./globals.css";

const nav = ["Home", "Experience", "Projects", "Skills", "Contact"];

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
  title: "Prince Czedrick Nepomuceno",
  description: "Portfolio of Prince Czedrick Nepomuceno",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${mono.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="border-b border-border">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4">
              <a href="#home" className="font-serif text-lg">
                Prince Czedrick Nepomuceno
              </a>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <nav aria-label="Primary">
                  <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
                    {nav.map((item) => (
                      <li key={item}>
                        <a href={`#${item.toLowerCase()}`}>{item}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <ThemeToggle />
              </div>
            </div>
          </header>
          {children}
          <footer className="border-t border-border">
            <p className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted">
              © {new Date().getFullYear()} Prince Czedrick Nepomuceno
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
