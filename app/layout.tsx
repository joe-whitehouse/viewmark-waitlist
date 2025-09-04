import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viewmark – Put your logo on viral content",
  description: "Stop wasting money on ads no one watches. Get your brand seen by millions who actually care. Join the waitlist for Viewmark.",
  keywords: "viral marketing, brand visibility, logo placement, content marketing, waitlist",
  authors: [{ name: "Viewmark" }],
  creator: "Viewmark",
  publisher: "Viewmark",
  robots: "index, follow",
  openGraph: {
    title: "Viewmark – Put your logo on viral content",
    description: "Stop wasting money on ads no one watches. Get your brand seen by millions who actually care.",
    type: "website",
    url: "https://viewmark.co",
    siteName: "Viewmark",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viewmark – Put your logo on viral content",
    description: "Stop wasting money on ads no one watches. Get your brand seen by millions who actually care.",
    creator: "@viewmarkco",
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>



        {/* Preload critical fonts to prevent FOUT */}
        <link
          rel="preload"
          href="/ABCOracle-Light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/ABCOracle-Book.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/ABCFavoritMono-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Optimized font declarations for FOUT prevention */
            @font-face {
              font-family: 'ABCOracle-Light';
              src: url('/ABCOracle-Light.woff2') format('woff2');
              font-weight: 300;
              font-style: normal;
              font-display: swap;
            }
            
            @font-face {
              font-family: 'ABCOracle-Book';
              src: url('/ABCOracle-Book.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            
            @font-face {
              font-family: 'ABCFavoritMono';
              src: url('/ABCFavoritMono-Regular.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
