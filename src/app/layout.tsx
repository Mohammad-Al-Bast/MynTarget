import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Schibsted_Grotesk } from "next/font/google";

const schibsted = Schibsted_Grotesk({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MYN Target | Creative marketing agency",
    template: "%s | MYN Target",
  },
  description:
    "MYN Target combines strategy, branding, creative production and marketing to help your brand grow across Lebanon, the UAE and Türkiye.",
  openGraph: {
    type: "website",
    siteName: "MYN Target",
    locale: "en",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f5fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1226" },
  ],
};

/**
 * Document shell only. The site chrome and global styles live in `(site)/layout.tsx`
 * so the Sanity Studio at `/admin` renders without them.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${schibsted.variable} ${geist.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
