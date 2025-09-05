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
        <script dangerouslySetInnerHTML={{
          __html: `
            // Font loading detection and fallback
            if ('fonts' in document) {
              Promise.all([
                document.fonts.load('300 16px ABCOracle-Light'),
                document.fonts.load('400 16px ABCOracle-Book'),
                document.fonts.load('400 16px ABCFavoritMono')
              ]).then(() => {
                document.documentElement.classList.add('fonts-loaded');
              }).catch(() => {
                document.documentElement.classList.add('fonts-failed');
              });
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
