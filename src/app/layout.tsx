import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Store - Premium Computers & Components",
  description: "Professional tech store offering premium computers, components, and accessories with WhatsApp ordering.",
  keywords: "computers, PC, laptops, components, graphics cards, CPUs, RAM, tech store",
  authors: [{ name: "Tech Store" }],
  creator: "Tech Store",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Tech Store",
    title: "Tech Store - Premium Computers & Components",
    description: "Professional tech store offering premium computers, components, and accessories with WhatsApp ordering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Store - Premium Computers & Components",
    description: "Professional tech store offering premium computers, components, and accessories with WhatsApp ordering.",
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
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
