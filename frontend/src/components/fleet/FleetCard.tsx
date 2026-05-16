"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface FleetCardProps {
  slug: string;
  model: string;
  pricePerKm: string;
  pax: string;
  image: string;
  index: number;
}

const FleetCard: React.FC<FleetCardProps> = ({ slug, model, pricePerKm, pax, index, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 1, 0.5, 1]
      }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-emerald transition-all duration-500 border border-emerald-500/5 group h-full flex flex-col"
    >
      {/* Vehicle Image Container */}
      <div className="relative aspect-[16/10] bg-emerald-50 flex items-center justify-center overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={image}
            alt={model}
            fill
            className="object-cover group-hover:brightness-110 transition-all duration-1000"
          />
        </motion.div>

        {/* Overlaid Badges */}
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-600 text-white text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest shadow-lg">
            {model}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-md border border-emerald-500/10 rounded-lg px-3 py-1 flex items-center gap-1.5 shadow-lg">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[10px] font-extrabold text-emerald-900">{pax} Pax</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-1">
        <div className="mb-8">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-emerald-950 tracking-tighter">₹{pricePerKm}</span>
            <span className="text-xs font-bold text-emerald-900/40 uppercase tracking-widest">PER KM</span>
          </div>
          <p className="text-[10px] text-emerald-900/30 font-black mt-2 uppercase tracking-[0.1em] leading-snug">
            * MIN 300 KM FOR OUTSTATION TRIPS
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-auto space-y-4 pt-6 border-t border-emerald-500/5">
          <Link
            href={`/fleet/${slug}`}
            className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center shadow-xl shadow-emerald-600/10 active:scale-95"
          >
            VIEW DETAILS
          </Link>
          <div className="flex gap-2">
            <div className="flex-1 bg-emerald-50/50 px-3 py-3 rounded-2xl border border-emerald-100/50 text-center">
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">PREMIUM AC</span>
            </div>
            <div className="flex-1 bg-emerald-50/50 px-3 py-3 rounded-2xl border border-emerald-100/50 text-center">
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">LUXURY CABIN</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FleetCard;
