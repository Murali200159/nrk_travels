/**
 * =========================================
 * MobileMenu Component
 * Slide-out navigation for mobile devices
 * =========================================
 */

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const links = ["Services", "Tour Packages", "Company", "Support", "Hire Driver"];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
          />

          {/* Menu Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[101] lg:hidden p-8 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="text-xl font-bold tracking-tighter text-gray-900">
                SHANNU <span className="text-blue-600">TRAVELS</span>
              </span>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 mb-16">
              {links.map((link) => (
                <Link
                  key={link}
                  href="#"
                  onClick={onClose}
                  className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {link}
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-4">
              <Button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg">
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </Button>
              <Button variant="outline" className="w-full h-14 rounded-2xl border-gray-200 text-gray-900 font-bold text-lg">
                <UserPlus className="w-5 h-5 mr-2" />
                Sign Up
              </Button>
              <Link
                href="tel:9966363662"
                className="flex items-center justify-center gap-3 w-full h-14 rounded-2xl bg-blue-50 text-blue-600 font-bold text-lg border border-blue-100"
              >
                <Phone className="w-5 h-5" />
                9966363662
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
