import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navigation from "../components/Navigation";
import AskMach from "../components/AskMach";
import Footer from "../components/Footer";
import { ProjectProvider } from "../contexts/ProjectContext";
import JsonLd from "../components/JsonLd";
import { SITE_URL, baseKnowsAbout, personJsonLd, webSiteJsonLd } from "../data/structured-data";
import { getAllExpertise } from "../lib/expertise";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// Search-engine ownership verification. Set these in the environment (Vercel
// project env, or .env.local for a local check) to emit the corresponding
// <meta> tag; when unset, nothing is rendered. Google Search Console reads
// GOOGLE_SITE_VERIFICATION; Bing Webmaster reads BING_SITE_VERIFICATION.
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aaryan Lath - Aerospace Engineer",
    template: "%s | Aaryan Lath",
  },
  description:
    "Aerospace engineer, Purdue AAE graduate, mechanical engineer and product designer at Siemens, and cofounder and CFO of CryptiQ. Projects, research, resume.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Aaryan Lath",
    type: "website",
    locale: "en_US",
    images: ["/images/profile.jpeg"],
  },
  twitter: {
    card: "summary",
  },
  // Emitted only when the env vars are set (see the consts above).
  verification: {
    ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
    ...(bingSiteVerification ? { other: { "msvalidate.01": bingSiteVerification } } : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'auto' }}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ scrollBehavior: 'auto' }}
      >
        {/* Sitewide schema.org entities; page-level JSON-LD references these by @id.
            knowsAbout merges the expertise records, so every build validates them. */}
        <JsonLd
          data={personJsonLd(
            Array.from(new Set([...baseKnowsAbout, ...getAllExpertise().map((r) => r.knowsAbout)]))
          )}
        />
        <JsonLd data={webSiteJsonLd} />
        {/* App-wide layout wrapper: navigation + shared project context */}
        <ProjectProvider>
          <Navigation />
          {children}
          <Footer />
          <AskMach />
        </ProjectProvider>
        <Analytics />
      </body>
    </html>
  );
}
