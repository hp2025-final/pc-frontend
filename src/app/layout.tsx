import type { Metadata } from "next";
import { Suspense } from "react";
import { Press_Start_2P, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MetaPixel from "@/components/analytics/MetaPixel";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PC Wala Online — Gaming & PC Parts Store",
  description:
    "Pakistan's retro-cool PC parts store. Shop GPUs, CPUs, Motherboards, Cases & more. Order via WhatsApp for fast delivery.",
  keywords:
    "PC parts Pakistan, gaming PC, GPU, CPU, motherboard, RAM, PC cases, laptop Pakistan, PC Wala Online",
  authors: [{ name: "PC Wala Online" }],
  creator: "PC Wala Online",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "PC Wala Online",
    title: "PC Wala Online — Gaming & PC Parts Store",
    description:
      "Pakistan's retro-cool PC parts store. Shop GPUs, CPUs, Motherboards & more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PC Wala Online — Gaming & PC Parts Store",
    description:
      "Pakistan's retro-cool PC parts store. Shop GPUs, CPUs, Motherboards & more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${spaceMono.variable}`}>
      <body className="antialiased bg-white text-black">
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

