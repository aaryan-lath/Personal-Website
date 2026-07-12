import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navigation from "../components/Navigation";
import AskMach from "../components/AskMach";
import { ProjectProvider } from "../contexts/ProjectContext";
import JsonLd from "../components/JsonLd";
import { SITE_URL, personJsonLd, webSiteJsonLd } from "../data/structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aaryan Lath - Aerospace Engineer",
    template: "%s | Aaryan Lath",
  },
  description:
    "Aerospace engineering senior at Purdue AAE, cofounder and CFO of CryptiQ, and SkyBase Manager at LuftCar. Projects, research, coursework, and resume.",
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
        {/* Sitewide schema.org entities; page-level JSON-LD references these by @id */}
        <JsonLd data={personJsonLd()} />
        <JsonLd data={webSiteJsonLd} />
        {/* App-wide layout wrapper: navigation + shared project context */}
        <ProjectProvider>
          <Navigation />
          {children}
          <AskMach />
        </ProjectProvider>
        <Analytics />
      </body>
    </html>
  );
}
