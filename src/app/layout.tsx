import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navigation from "../components/Navigation";
import AskMach from "../components/AskMach";
import { ProjectProvider } from "../contexts/ProjectContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aaryan Lath - Aerospace Engineer",
  description: "Personal portfolio of Aaryan Lath, aspiring aerospace engineer showcasing projects, research, and extracurricular activities",
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
