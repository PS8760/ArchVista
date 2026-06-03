import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/providers/LenisProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ArchVista — Architecture Beyond Imagination",
  description:
    "A new era of luxury living crafted through technology, design, and vision. ArchVista redefines architectural excellence with intelligent design and modern luxury.",
  keywords: [
    "luxury architecture",
    "modern villa",
    "architectural design",
    "luxury living",
    "smart home",
    "ArchVista",
  ],
  openGraph: {
    title: "ArchVista — Architecture Beyond Imagination",
    description:
      "A new era of luxury living crafted through technology, design, and vision.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
