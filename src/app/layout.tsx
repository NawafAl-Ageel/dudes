import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";

const ibmPlexSansArabic = localFont({
  src: "../fonts/IBMPlexArabic-Text.ttf",
  variable: "--font-ibm-plex-sans-arabic",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://dudesco.com"),
  title: "دودز كومباني — Dudes Company",
  description: "شركة سعودية، علامات تجارية متعددة في الرياضة والتقنية.",
};

const themeInitScript = `
  try {
    var stored = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', stored === 'dark' ? 'dark' : 'light');
  } catch (e) {}
`;

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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
