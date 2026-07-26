import type { Metadata } from "next";
import { Fraunces, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Rizqi Akbar Pratama — Portofolio",
  description:
    "Portofolio Rizqi Akbar Pratama — Builder, Solo Developer & Funded Trader dari Kebumen, Jawa Tengah.",
  keywords: [
    "Rizqi Akbar Pratama",
    "portofolio",
    "solo developer",
    "funded trader",
    "LuxTrade",
    "trading journal",
    "Kebumen",
  ],
  authors: [{ name: "Rizqi Akbar Pratama" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${manrope.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
