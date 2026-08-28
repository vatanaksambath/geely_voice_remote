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
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${kantumruy.className} antialiased bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-gray-100 min-h-[100dvh] flex flex-col`}
      >
        <div className="flex-1 max-w-md mx-auto w-full relative bg-slate-50 dark:bg-[#0a0a0a] shadow-2xl overflow-x-hidden min-h-[100dvh]">
          {children}
        </div>
      </body>
    </html>
  );
}
