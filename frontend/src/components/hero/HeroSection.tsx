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
    <section className="relative min-h-[95vh] lg:min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
      {/* Background Container */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 15, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          {/* Main Hero Image - Use a lighter, cleaner image if possible or adjust brightness */}
          <Image
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Travel Background"
            fill
            className="object-cover object-center opacity-20 transition-all duration-1000 grayscale-[0.5]"
            priority
          />

          {/* Light Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-white" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* Hero Content Text */}
      <div className="container max-w-[100%] mx-auto z-10 px-6 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/20 px-5 py-2.5 rounded-full mb-4 shadow-emerald/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 text-[11px] font-black uppercase tracking-[0.4em]">Visakhapatnam's #1 Premium Taxi Hub</span>
          </div>

          <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black text-slate-900 tracking-tighter leading-[0.85]">
            LUXURY <br />
            <span className="text-emerald-600 italic">TRAVELS</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-slate-700 md:text-2xl font-bold max-w-3xl mx-auto leading-relaxed opacity-90"
          >
            Experience the pinnacle of luxury mobility. We provide premium vehicle
            rentals and curated tour packages for discerning travelers.
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Booking Card with Entrance Delay */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="w-full relative z-20"
      >
        <BookingCard />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-emerald-500/50 uppercase font-black tracking-widest">Scroll</span>
          <div className="w-[1px] h-14 bg-gradient-to-b from-emerald-500/0 via-emerald-500 to-emerald-500/0" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
