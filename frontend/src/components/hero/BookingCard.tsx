/**
 * =========================================
 * BookingCard Component
 * Central floating card in the Hero section
 * =========================================
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BookingTabs from "./BookingTabs";
import BookingForm from "./BookingForm";
import { ROUTES } from "@/lib/navigation";
import Link from "next/link";

const BookingCard = () => {
  const [activeTab, setActiveTab] = useState("outstation");

  return (
    <div className="w-full max-w-[100%] mx-auto z-20 relative px-4">
      <div className="bg-white rounded-[2.5rem] lg:rounded-[3rem] shadow-premium relative overflow-hidden border border-emerald-500/10 backdrop-blur-3xl">
        {/* Info Badge - Top on Mobile */}
        <div className="bg-orange-600 p-3 lg:hidden flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">New</div>
            <span className="text-xs font-bold text-white tracking-tight">Urbania Luxury now available!</span>
          </div>
          <Link href={ROUTES.FLEET_SECTION} className="bg-white text-orange-600 px-4 py-1 rounded-lg text-[10px] font-black uppercase">Book</Link>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between border-b border-emerald-500/10 lg:pr-10">
          <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Info Badge - Integrated on Desktop */}
          <div className="hidden lg:flex items-center gap-4 px-6 py-2.5 bg-emerald-50 border border-emerald-500/10 rounded-2xl my-3 group">
            <div className="bg-orange-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest">New</div>
            <span className="text-sm font-bold text-slate-900">Urbania Luxury now available!</span>
            <Link
              href={ROUTES.FLEET_SECTION}
              className="text-orange-600 hover:text-orange-500 font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-all group-hover:gap-3"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="p-2">
          <BookingForm activeTab={activeTab} />
        </div>
      </div>
    </div>

  );
};

export default BookingCard;
