/**
 * =========================================
 * BookingTabs Component
 * Categorical tabs for the booking search
 * =========================================
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Car, Clock, Plane, Map } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "outstation", label: "Outstation", sub: "Trips", icon: Car },
  { id: "local", label: "Hourly", sub: "Rentals", icon: Clock },
  { id: "airport", label: "Airport", sub: "Transfer", icon: Plane },
  { id: "tour", label: "Tour", sub: "Packages", icon: Map },
];

interface BookingTabsProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const BookingTabs: React.FC<BookingTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="grid grid-cols-4 w-full lg:flex lg:w-auto overflow-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-3 px-2 lg:px-8 py-3 lg:py-5 transition-all relative border-r border-gray-50 last:border-r-0 lg:border-r-0",
            activeTab === tab.id 
              ? "bg-blue-50/50 lg:bg-transparent text-blue-600" 
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-50/50 lg:hover:bg-transparent"
          )}
        >
          <tab.icon className={cn("w-5 h-5 lg:w-5 lg:h-5", activeTab === tab.id ? "text-blue-600" : "text-gray-300")} />
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-[10px] lg:text-sm font-black whitespace-nowrap">{tab.label}</span>
            <span className="text-[8px] lg:hidden opacity-60 font-bold uppercase tracking-tighter">{tab.sub}</span>
          </div>
          
          {activeTab === tab.id && (
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-t-full transition-all duration-300"
            />
          )}
        </button>
      ))}
    </div>
  );
};


export default BookingTabs;
