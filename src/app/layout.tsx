import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const soraSerif = Sora({
  variable: "--font-sora-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sublime Esthetics",
  description: "Página de orçamentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${soraSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
