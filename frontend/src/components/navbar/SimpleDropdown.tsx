"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SimpleDropdownProps {
  isOpen: boolean;
  items: { title: string; href: string }[];
  title: string;
  onClose: () => void;
}

const SimpleDropdown: React.FC<SimpleDropdownProps> = ({ isOpen, items, title, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            "absolute top-full left-0 mt-3 w-64 z-[100] p-2",
            "bg-white/95 backdrop-blur-3xl",
            "border border-slate-200/50",
            "shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)]",
            "rounded-[2rem] overflow-hidden"
          )}
        >
          <div className="px-5 py-3 mb-1">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 opacity-80">{title}</h4>
          </div>
          <div className="space-y-1 px-1 pb-1">
            {items.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "block w-full text-left px-5 py-3 rounded-2xl transition-all duration-300 text-sm font-bold",
                  "text-slate-700",
                  "hover:bg-emerald-600 hover:text-white",
                  "hover:translate-x-1"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SimpleDropdown;
