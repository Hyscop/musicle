import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Müzikle - Günlük Müzik Tahmin Oyunu",
  description:
    "Müzikle ile her gün yeni bir şarkı tahmin edin! Rock, Hip Hop ve daha fazla kategoride günlük müzik bulmacası.",
  keywords: [
    "müzikle",
    "müzik oyunu",
    "şarkı tahmin oyunu",
    "wordle müzik",
    "heardle türkçe",
    "günlük müzik oyunu",
    "rock müzik oyunu",
    "hip hop oyunu",
    "online müzik oyunu",
    "ücretsiz müzik oyunu",
    "şarkı tahmin etmece",
    "şarkıdle",
    "songdle",
  ],
  authors: [{ name: "Hyscop", url: "https://www.hyscop.com" }],
  creator: "Hyscop",
  publisher: "Hyscop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://muzikle.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Müzikle - Günlük Müzik Tahmin Oyunu",
    description:
      "Her gün yeni bir şarkı tahmin edin! Rock, Hip Hop ve daha fazla kategoride eğlenceli müzik bulmacası.",
    url: "https://muzikle.vercel.app",
    siteName: "Müzikle",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Müzikle - Günlük Müzik Tahmin Oyunu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Müzikle - Günlük Müzik Tahmin Oyunu",
    description:
      "Her gün yeni bir şarkı tahmin edin! Rock, Hip Hop ve daha fazla kategoride eğlenceli müzik bulmacası.",
    creator: "@hyscopp",
    images: ["/og-image.png"],
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: "S1_ZSajtAo6L9fQL-I2C2IO_r0uKwWDO9yaJrX9yHBw",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#9333ea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Müzikle",
    description:
      "Günlük müzik tahmin oyunu. Her gün yeni bir şarkı tahmin edin!",
    url: "https://muzikle.vercel.app",
    applicationCategory: "Game",
    genre: "Music Game",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TRY",
    },
    author: {
      "@type": "Person",
      name: "Hyscop",
      url: "https://www.hyscop.com",
    },
    inLanguage: "tr",
    isAccessibleForFree: true,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1000",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
