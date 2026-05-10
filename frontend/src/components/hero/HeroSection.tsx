/**
 * =========================================
 * HeroSection Component
 * Cinematic background and landing visuals
 * =========================================
 */

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BookingCard from "./BookingCard";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Container */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">

          {/* Main Hero Image */}
          <Image
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Travel Background"
            fill
            className="object-cover object-center grayscale-[0.2]"
            priority
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-white" />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </div>


      </div>

      {/* Hero Content Text */}
      <div className="container max-w-7xl mx-auto z-10 px-6 text-center mb-16">
        <div className="space-y-6">

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
            PREMIUM TRAVEL <br />
            <span className="text-blue-500 italic">EXPERIENCE</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Experience the pinnacle of luxury mobility. We provide premium vehicle 
            rentals and curated tour packages for discerning travelers.
          </p>
        </div>

      </div>

      {/* Floating Booking Card */}
      <BookingCard />

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
