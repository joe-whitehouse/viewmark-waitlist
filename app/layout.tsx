import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viewmark",
  description: "Join the waitlist",
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
          {
      url: '/vm-favicon.ico',
      sizes: 'any',
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
        <link
          rel="preload"
          href="/Viewmark-SemiBold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/ABCOracle-Light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/Inter_18pt-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/Inter_18pt-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/Inter_18pt-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/Inter_18pt-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Viewmark-SemiBold';
              src: url('/Viewmark-SemiBold.woff') format('woff');
              font-weight: 600;
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
              font-family: 'ABCOracle-Light';
              src: url('/ABCOracle-Light.woff2') format('woff2');
              font-weight: 300;
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
            
            /* Inter font declarations - local files for reliable loading */
            @font-face {
              font-family: 'Inter';
              src: url('/Inter_18pt-Regular.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            
            @font-face {
              font-family: 'Inter';
              src: url('/Inter_18pt-Medium.woff2') format('woff2');
              font-weight: 500;
              font-style: normal;
              font-display: swap;
            }
            
            @font-face {
              font-family: 'Inter';
              src: url('/Inter_18pt-SemiBold.woff2') format('woff2');
              font-weight: 600;
              font-style: normal;
              font-display: swap;
            }
            
            @font-face {
              font-family: 'Inter';
              src: url('/Inter_18pt-Bold.woff2') format('woff2');
              font-weight: 700;
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
