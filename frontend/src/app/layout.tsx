/**
 * =========================================
 * Root Layout
 * Global layout with fonts and navbar
 * =========================================
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import BottomNav from "@/components/navbar/BottomNav";


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Shannu Car Travels | Premium Travel Experience",
  description: "Luxury car rentals and tour packages in Vizag. Professional drivers and premium fleet for your travel needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <BottomNav />

      </body>
    </html>
  );
}
