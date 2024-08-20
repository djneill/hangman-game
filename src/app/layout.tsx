import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hangman",
  description: "Hangman created by DJ Neill",
  openGraph: {
    title: 'Hangman',
    description: 'Hangman created by DJ Neill',
    images: [
      {
        url: 'https://hangman-game-fun.vercel.app/images/preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Hangman Game',
      },
    ],
    siteName: 'Hangman Game',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hangman',
    description: 'Hangman created by DJ Neill',
    images: ['https://hangman-game-fun.vercel.app/images/preview.jpg'],
    creator: '@CodingGuitarist',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
