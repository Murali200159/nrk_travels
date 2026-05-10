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

const BookingCard = () => {
  const [activeTab, setActiveTab] = useState("outstation");

  return (
    <div className="w-full max-w-7xl mx-auto z-20 relative px-4">

      <div className="bg-white/95 backdrop-blur-3xl rounded-[2rem] lg:rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/50 relative">

        {/* Info Badge - Top on Mobile */}
        <div className="bg-blue-600 p-3 lg:hidden flex items-center justify-between px-6 rounded-t-[2rem]">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">New</div>
            <span className="text-xs font-bold text-white">Urbania now available!</span>
          </div>
          <button className="bg-white text-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase">Book</button>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between border-b border-gray-100 lg:pr-8 rounded-t-[2.5rem] lg:rounded-t-[2.5rem] bg-white">
          <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Info Badge - Integrated on Desktop */}
          <div className="hidden lg:flex items-center gap-3 px-5 py-2 bg-blue-50 border border-blue-100 rounded-2xl my-2">
            <div className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">New</div>
            <span className="text-sm font-bold text-blue-900">Urbania now available!</span>
            <button className="text-blue-600 hover:text-blue-800 font-black text-xs uppercase tracking-widest flex items-center gap-1 transition-colors">
              Book Now <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="rounded-b-[2.5rem] bg-white/50">

          <BookingForm activeTab={activeTab} />
        </div>

      </div>



    </div>

  );
};

export default BookingCard;
