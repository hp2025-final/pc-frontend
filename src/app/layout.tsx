import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { Press_Start_2P, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PixelProgressBar from "@/components/PixelProgressBar";
import { woo } from "@/lib/woocommerce";

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

export const revalidate = 7200; // 2 hours

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch categories to pass down live counts for the "Coming Soon" badges
  const wooCategories = await woo.getCategories({ per_page: 100 });
  const catCountMap: Record<string, number> = {};
  for (const c of wooCategories) {
    catCountMap[c.slug] = c.count;
  }

  return (
    <html lang="en" className={`${pressStart2P.variable} ${spaceMono.variable}`}>
      <body className="antialiased bg-white text-black">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WXR3WTQ5"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WXR3WTQ5');`,
          }}
        />
        <Suspense fallback={null}>
          <PixelProgressBar />
        </Suspense>
        <Navigation catCountMap={catCountMap} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

