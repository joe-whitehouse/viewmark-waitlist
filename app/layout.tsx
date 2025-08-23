import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

// Optimize custom fonts with Next.js localFont
const abcoracleBook = localFont({
  src: '../public/ABCOracle-Book.woff2',
  variable: '--font-abcoracle-book',
  display: 'optional',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto'],
});

const abcoracleLight = localFont({
  src: '../public/ABCOracle-Light.woff2',
  variable: '--font-abcoracle-light',
  display: 'optional',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto'],
});

const abcfavoritMono = localFont({
  src: '../public/ABCFavoritMono-Regular.woff2',
  variable: '--font-abcfavorit-mono',
  display: 'optional',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas'],
});

export const metadata: Metadata = {
  title: "Viewmark - Guerrilla marketing for short form",
  description: "Put your brand on viral short-form videos with top creators. Get seen, sell more, and scale faster.",
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico',
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
    <html lang="en" className={`${abcoracleBook.variable} ${abcoracleLight.variable} ${abcfavoritMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
