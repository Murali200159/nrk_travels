"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES, MEGA_MENU_DATA } from "@/lib/navigation";

interface MenuItem {
  title: string;
  href?: string;
  info?: string;
}

interface MenuSection {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  items: MenuItem[];
}

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(MEGA_MENU_DATA[0].id);

  const currentData = (MEGA_MENU_DATA as MenuSection[]).find(d => d.id === activeTab);

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
            {(MEGA_MENU_DATA as MenuSection[]).map((tab) => (
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
              "grid gap-5",
              activeTab === "outstation" ? "grid-cols-3" : "grid-cols-2"
            )}>
              {currentData?.items?.map((item, i) => (
                <Link
                  key={i}
                  href={item.href || ROUTES.FLEET}
                  onClick={onClose}
                  className={cn(
                    "block p-5 rounded-2xl border border-transparent transition-all duration-300 cursor-pointer group",
                    "hover:border-emerald-500/20 hover:bg-emerald-50/50",
                    "hover:shadow-lg hover:shadow-emerald-500/5"
                  )}
                >
                  <h5 className="text-[15px] font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{item.title}</h5>
                  {item.info && (
                    <p className="text-[12px] text-slate-600 font-bold mt-1.5 leading-relaxed">{item.info}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
