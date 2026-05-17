"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LucideIcon, ChevronRight, Map, Palmtree, Mountain, Landmark, Compass, MapPin } from "lucide-react";
import { ROUTES } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  info?: string;
  href?: string;
}

interface MenuSection {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  items: MenuItem[];
}

const tourMenuData: MenuSection[] = [
  {
    id: "all",
    title: "View All Tours",
    icon: Compass,
    description: "Full Catalog",
    items: [
      { title: "3 Days Vizag & Araku Valley Tour", info: "Complete exploration", href: "/tours/vizag-araku-3d" },
      { title: "Araku Valley Tour", info: "Day trip to the valley", href: "/tours/araku-valley" },
      { title: "Arasavalli & Srikurmam Temple Tour", info: "Spiritual journey", href: "/tours/arasavalli-temple" },
      { title: "Lambasingi Tour", info: "Experience the cool weather", href: "/tours/lambasingi" },
      { title: "Vanajangi Tour", info: "Spectacular sunrise views", href: "/tours/vanajangi" },
      { title: "Vizag Full City Tour", info: "Complete City Exploration", href: "/tours/vizag-city-tour" },
    ]
  },
  {
    id: "araku",
    title: "Araku Valley Tour",
    icon: Mountain,
    description: "Nature & Adventure",
    items: [
      { title: "Borra Caves Visit", href: "/tours/araku-valley" },
      { title: "Coffee Museum", href: "/tours/araku-valley" },
      { title: "Galikonda View Point", href: "/tours/araku-valley" },
      { title: "Tribal Museum", href: "/tours/araku-valley" },
      { title: "Katiki Waterfalls", href: "/tours/araku-valley" },
      { title: "Padmapuram Gardens", href: "/tours/araku-valley" },
    ]
  },
  {
    id: "lambasingi",
    title: "Lambasingi Tour",
    icon: Palmtree,
    description: "Winter Paradise",
    items: [
      { title: "Sunrise at Lammasingi", href: "/tours/lambasingi" },
      { title: "Strawberry Farms", href: "/tours/lambasingi" },
      { title: "Kothapalli Waterfalls", href: "/tours/lambasingi" },
      { title: "Pine Forests", href: "/tours/lambasingi" },
    ]
  },
  {
    id: "vizag",
    title: "Vizag Full City Tour",
    icon: Landmark,
    description: "City Exploration",
    items: [
      { title: "Kailasagiri & Simhachalam", href: "/tours/vizag-city-tour" },
      { title: "Rishikonda & Thotlakonda", href: "/tours/vizag-city-tour" },
      { title: "Submarine & Aircraft Museums", href: "/tours/vizag-city-tour" },
      { title: "Dolphin's Nose & Yarada", href: "/tours/vizag-city-tour" },
      { title: "RK Beach & Central Park", href: "/tours/vizag-city-tour" },
      { title: "Indira Gandhi Zoo Park", href: "/tours/vizag-city-tour" },
    ]
  },
  {
    id: "outstation",
    title: "Outstation Tours",
    icon: MapPin,
    description: "Long Distance Travel",
    items: [
      { title: "Amadalavalasa" }, { title: "Annavaram" }, { title: "Araku Valley" }, { title: "Arasavalli" },
      { title: "Bangalore" }, { title: "Bhadrachalam" }, { title: "Bhubaneswar" }, { title: "Bobbili" },
      { title: "Chennai" }, { title: "Eluru" }, { title: "Guntur" }, { title: "Hyderabad" },
      { title: "Ichchapuram" }, { title: "Jagdalpur" }, { title: "Kakinada" }, { title: "Khammam" },
      { title: "Kolkata" }, { title: "Kurnool" }, { title: "Lambasingi" }, { title: "Narasannapeta" },
      { title: "Nellore" }, { title: "Palakollu" }, { title: "Palakonda" }, { title: "Palasa" },
      { title: "Parvathipuram" }, { title: "Raipur" }, { title: "Rajahmundry" }, { title: "Ravulapalem" },
      { title: "Razam" }, { title: "Sompeta" }, { title: "Srikakulam" }, { title: "Srimukhalingam" },
      { title: "Tirupati" }, { title: "Tuni" }, { title: "Vijayawada" }, { title: "Vizianagaram" }
    ]
  }
];

interface TourMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const TourMegaMenu: React.FC<TourMegaMenuProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(tourMenuData[0].id);

  const currentData = tourMenuData.find(d => d.id === activeTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            "absolute top-full left-1/2 -translate-x-1/2 mt-4 z-[100] flex h-[500px] overflow-hidden",
            "bg-white/95 backdrop-blur-3xl",
            "border border-slate-200/50",
            "shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]",
            "rounded-[2.5rem]"
          )}
          style={{ width: "1000px" }}
        >
          {/* Sidebar */}
          <div className="w-[320px] bg-slate-50/50 border-r border-slate-100 p-8 space-y-3">
            {tourMenuData.map((tab) => (
              <button
                key={tab.id}
                onMouseEnter={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group",
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20"
                    : "hover:bg-white text-slate-600 hover:text-emerald-600"
                )}
              >
                <div className="flex items-center gap-4">
                  <tab.icon className={cn("w-5 h-5 transition-transform duration-500", activeTab === tab.id ? "text-white scale-110" : "text-slate-400 group-hover:text-emerald-500")} />
                  <span className="text-sm font-bold tracking-tight">{tab.title}</span>
                </div>
                <ChevronRight className={cn("w-4 h-4 transition-all duration-300", activeTab === tab.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0")} />
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
            <div className="mb-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-2 opacity-80">{currentData?.description}</h4>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">{currentData?.title}</h3>
            </div>

            <div className={cn(
              "grid gap-x-6 gap-y-3",
              activeTab === "outstation" ? "grid-cols-4" : "grid-cols-2"
            )}>
              {currentData?.items?.map((item, i) => {
                const slug = item.title.toLowerCase().replace(/ /g, "-").replace(/&/g, "and");
                const itemHref = item.href || `/booking/${slug}`;
                return (
                  <Link
                    key={i}
                    href={itemHref}
                    onClick={onClose}
                    className={cn(
                      "block p-3 rounded-xl border border-transparent transition-all duration-300 cursor-pointer group",
                      "hover:border-emerald-500/20 hover:bg-emerald-50/50",
                      "hover:shadow-lg hover:shadow-emerald-500/5"
                    )}
                  >
                    <h5 className="text-[13px] font-bold text-slate-800 group-hover:text-emerald-600 transition-colors whitespace-nowrap">{item.title}</h5>
                    {item.info && (
                      <p className="text-[10px] text-slate-600 font-bold mt-1 leading-relaxed">{item.info}</p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TourMegaMenu;
