/**
 * =========================================
 * BottomNav Component
 * Mobile-only bottom navigation bar
 * =========================================
 */

"use client";

import React from "react";
import Link from "next/link";
import { Home, Phone, User, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const links = [
    { name: "Home", icon: Home, href: "/" },
    { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/9966363662" },
    { name: "Call", icon: Phone, href: "tel:9966363662" },
    { name: "Profile", icon: User, href: "#" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 lg:hidden px-6 py-3 flex items-center justify-between shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
      {links.map((link) => (
        <Link 
          key={link.name}
          href={link.href}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={cn(
            "p-2 rounded-xl transition-all duration-300",
            link.name === "Home" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-gray-400 group-hover:text-blue-600"
          )}>
            <link.icon className="w-6 h-6" />
          </div>
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-widest transition-colors",
            link.name === "Home" ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"
          )}>
            {link.name}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
