import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/providers/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body" suppressHydrationWarning>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

