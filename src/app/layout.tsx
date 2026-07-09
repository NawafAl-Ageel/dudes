import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ibmPlexSansArabic = localFont({
  src: "../fonts/IBMPlexArabic-Text.ttf",
  variable: "--font-ibm-plex-sans-arabic",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://dudesco.com"),
  title: "دودز كومباني",
  description: "دعوات دودز كومباني",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmPlexSansArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
