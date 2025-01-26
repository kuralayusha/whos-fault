import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Who's Fault? | Fun Blame Game",
  description:
    "Resolve disputes with friends through humor! Features AI judge, random wheel, and number games to decide who's to blame. Available in English & Turkish.",
  keywords:
    "blame game, dispute resolution, AI judge, fun game, friend arguments, who's fault, conflict resolution game",
  authors: [{ name: "Yusha Kuralay" }],
  openGraph: {
    title: "Who's Fault? | Fun Blame Game",
    description:
      "Resolve disputes with friends through humor! Let AI handle the finger-pointing while you relax.",
    url: "https://whos-fault.vercel.app",
    siteName: "Who's Fault?",
    images: [
      {
        url: "/og-image.png", // Sosyal medya paylaşımları için bir görsel eklemelisiniz
        width: 1200,
        height: 630,
        alt: "Who's Fault? - Fun Blame Game",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Who's Fault? | Fun Blame Game",
    description:
      "Resolve disputes with friends through humor! Let AI handle the finger-pointing while you relax.",
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
  verification: {
    google: "your-google-verification-code", // Google Search Console doğrulama kodu
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

// "icons": [
//     {
//       "src": "/icon-192x192.png",
//       "sizes": "192x192",
//       "type": "image/png"
//     },
//     {
//       "src": "/icon-512x512.png",
//       "sizes": "512x512",
//       "type": "image/png"
//     }
//   ]
