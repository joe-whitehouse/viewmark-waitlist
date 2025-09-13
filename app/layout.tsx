import type { Metadata } from "next";
import "./globals.css";
import FontLoader from "./components/FontLoader";

export const metadata: Metadata = {
  title: "Viewmark – Put your brand on viral videos",
  description: "Stop wasting money on ads no one watches. Get your brand seen by millions who actually care. Join the waitlist for Viewmark.",
  keywords: "viral marketing, brand visibility, logo placement, content marketing, waitlist",
  authors: [{ name: "Viewmark" }],
  creator: "Viewmark",
  publisher: "Viewmark",
  robots: "index, follow",
  openGraph: {
    title: "Viewmark – Put your brand on viral videos",
    description: "Stop wasting money on ads no one watches. Get your brand seen by millions who actually care.",
    type: "website",
    url: "https://viewmark.co",
    siteName: "Viewmark",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viewmark – Put your brand on viral videos",
    description: "Stop wasting money on ads no one watches. Get your brand seen by millions who actually care.",
    creator: "@viewmarkco",
  },
          icons: {
          icon: [
            {
              url: '/vm-favicon.svg',
              type: 'image/svg+xml',
            },
            {
              url: '/vm-favicon.ico',
              sizes: '16x16 32x32 48x48',
              type: 'image/x-icon',
            }
          ],
          apple: [
            {
              url: '/vm-favicon.svg',
              sizes: '180x180',
              type: 'image/svg+xml',
            }
          ],
        },
        other: {
          'apple-mobile-web-app-capable': 'yes',
          'apple-mobile-web-app-status-bar-style': 'black-translucent',
          'apple-mobile-web-app-title': 'Viewmark',
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



        {/* Online Inter font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        />

        {/* Preload critical fonts to prevent FOUT */}
        <link
          rel="preload"
          href="/fonts/neueSingular-D-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* iOS PWA and theming support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Viewmark" />
        <meta name="theme-color" content="#0A0B0C" />
        <meta name="msapplication-TileColor" content="#0A0B0C" />
      </head>
      <body>
        <FontLoader />
        {children}
      </body>
    </html>
  );
}
