import type { Metadata } from "next";
import "./globals.css";
import FontLoader from "./components/FontLoader";

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
          apple: [
            {
              url: '/apple-touch-icon.png',
              sizes: '180x180',
              type: 'image/png',
            }
          ],
        },
        other: {
          'apple-mobile-web-app-capable': 'yes',
          'apple-mobile-web-app-status-bar-style': 'default',
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



        {/* Preload critical fonts to prevent FOUT */}
        <link
          rel="preload"
          href="/fonts/neueSingular-D-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Inter_18pt-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* iOS PWA and theming support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Viewmark" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
      </head>
      <body>
        <FontLoader />
        {children}
      </body>
    </html>
  );
}
