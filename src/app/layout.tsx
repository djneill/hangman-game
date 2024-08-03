import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hangman",
  description: "Hangman created by DJ Neill",
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
