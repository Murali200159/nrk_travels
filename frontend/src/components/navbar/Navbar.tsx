/**
 * =========================================
 * Navbar Component
 * Responsive premium navigation bar
 * Includes desktop links and mobile toggle
 * =========================================
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Phone, ChevronDown, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#", hasDropdown: true },
    { name: "Tour Packages", href: "#", hasDropdown: true },
    { name: "Company", href: "#", hasDropdown: true },
    { name: "Support", href: "#", hasDropdown: true },
    { name: "Hire Driver", href: "#" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
          isScrolled 
            ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100 py-3" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
              <Car className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-xl font-bold tracking-tighter leading-none",
                isScrolled ? "text-gray-900" : "text-white"
              )}>
                SHANNU <span className="text-blue-600">TRAVELS</span>
              </span>
              <span className={cn(
                "text-[10px] uppercase tracking-[0.2em] font-bold opacity-60",
                isScrolled ? "text-gray-500" : "text-white/60"
              )}>
                Vizag Taxi Hub
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-colors flex items-center gap-1 group",
                  isScrolled ? "text-gray-600 hover:text-blue-600" : "text-white/80 hover:text-white"
                )}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link 
              href="tel:9966363662" 
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all",
                isScrolled 
                  ? "bg-blue-50 border-blue-100 text-blue-600" 
                  : "bg-white/10 border-white/20 text-white"
              )}
            >
              <Phone className="w-4 h-4" />
              <span className="font-bold text-sm">9966363662</span>
            </Link>

            <div className="flex items-center gap-2">
              <Button variant="ghost" className={cn(
                "font-bold",
                isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              )}>
                Login
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 font-bold shadow-lg shadow-blue-600/20 transition-transform hover:scale-105 active:scale-95">
                Sign Up
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMobileOpen(true)}
            className={cn(
              "lg:hidden p-2 rounded-xl transition-colors",
              isScrolled ? "text-gray-900" : "text-white"
            )}
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
};

export default Navbar;
