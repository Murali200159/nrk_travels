/**
 * =========================================
 * Root Layout
 * Global layout with fonts and navbar
 * =========================================
 */

import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";
import BottomNav from "@/components/navbar/BottomNav";
import ScrollToTop from "@/components/ui/ScrollToTop";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: 'swap',
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "VIZAG TAXI | Journeys that connect, Memories that last",
  description: "Luxury car rentals and tour packages in Visakhapatnam. Professional drivers and premium fleet for your elite travel needs.",
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${syne.variable} font-jakarta antialiased bg-white text-slate-900 transition-colors duration-500`}>
        <Providers>
          <Suspense fallback={null}>
            <ScrollToTop />
            <Navbar />
            <div className="relative overflow-hidden">
              {children}
            </div>
            <BottomNav />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
