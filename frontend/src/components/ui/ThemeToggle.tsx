"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-12 h-6 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center p-1 cursor-pointer border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300"
      aria-label="Toggle Theme"
    >
      <motion.div
        layout
        className="z-10 bg-emerald-600 dark:bg-orange-500 w-4 h-4 rounded-full flex items-center justify-center shadow-lg"
        initial={false}
        animate={{
          x: theme === "dark" ? 24 : 0,
        }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-2.5 h-2.5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-2.5 h-2.5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <div className="absolute inset-0 flex justify-between px-2 items-center pointer-events-none">
        <Sun className="w-2.5 h-2.5 text-emerald-600/30 dark:text-emerald-400/20" />
        <Moon className="w-2.5 h-2.5 text-emerald-600/30 dark:text-emerald-400/20" />
      </div>
    </button>
  );
}
