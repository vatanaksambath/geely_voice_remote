import type { Metadata } from "next";
import { Kantumruy_Pro } from 'next/font/google';
import "./globals.css";

const kantumruy = Kantumruy_Pro({ 
  subsets: ['khmer', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Geely Voice Command",
  description: "Voice command remote control for Geely Galaxy vehicle",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import Script from 'next/script';
import ThemeController from '@/components/ThemeController';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var hour = new Date().getHours();
                  if (hour >= 18 || hour < 6) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${kantumruy.className} antialiased bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-gray-100 min-h-[100dvh] flex flex-col`}
      >
        <ThemeController />
        <div className="flex-1 max-w-md mx-auto w-full relative bg-slate-50 dark:bg-[#0a0a0a] shadow-2xl overflow-x-hidden min-h-[100dvh]">
          {children}
        </div>
      </body>
    </html>
  );
}
