import type { Metadata, Viewport } from "next";
import { EB_Garamond, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Font setup lives here. To change a font, swap the import + call below;
// the CSS variable names stay the same, so nothing else needs editing.
// Serif (eyebrow, card titles): EB Garamond is the closest match to the Figma reference.
const serif = EB_Garamond({
  variable: "--font-serif-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Display serif for section headings ("Featured Listings"): matches the high-contrast serif in Figma.
const display = Playfair_Display({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Sans (headline + body): Plus Jakarta Sans, variable font so light/regular/medium all work.
const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-face",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marci Metzger Homes | Pahrump, Nevada Real Estate",
  description: "Real estate guidance for buyers and sellers in Pahrump, Nevada.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f1e9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${display.variable} ${sans.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
