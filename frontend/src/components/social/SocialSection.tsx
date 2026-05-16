"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Camera, Play, Share2, Star, ExternalLink } from "lucide-react";

const socialLinks = [
  { name: "Facebook", icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "Instagram", icon: Camera, color: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "YouTube", icon: Play, color: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "X", icon: Share2, color: "text-emerald-950", bg: "bg-emerald-50" },
];

const SocialSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-[#010a08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Digital Concierge</span>
          </div>
          <h2 className="text-4xl lg:text-7xl font-black text-emerald-950 dark:text-emerald-50 tracking-tighter leading-[0.9]">
            FOLLOW OUR <br />
            <span className="text-gradient-emerald italic">ELITE JOURNEY</span>
          </h2>
          <p className="text-emerald-900/60 dark:text-emerald-100/60 text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-medium">
            Stay updated with our latest luxury fleet additions, exclusive travel stories,
            and premium destination guides.
          </p>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {socialLinks.map((social, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-[#022c22] rounded-[3rem] p-8 md:p-10 flex flex-col items-center text-center shadow-premium hover:shadow-emerald transition-all duration-500 border border-emerald-500/5 group"
            >
              <div className="w-20 h-20 rounded-[2rem] bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-all duration-500">
                <social.icon className="w-10 h-10 text-emerald-600 group-hover:text-white" />
              </div>
              <span className="text-xl font-black text-emerald-950 dark:text-emerald-50 mb-3 tracking-tight">{social.name}</span>
              <button className="flex items-center gap-2 text-[11px] font-black text-emerald-600/60 dark:text-emerald-600/40 uppercase tracking-[0.2em] group-hover:text-orange-500 transition-all">
                Connect <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Review Banner */}
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-[3rem] lg:rounded-[4rem] p-12 lg:p-20 text-center relative overflow-hidden border border-emerald-500/10 shadow-sm">
          <div className="absolute top-0 left-0 w-96 h-96 bg-lime-400/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 space-y-8">
            <div className="flex items-center justify-center gap-2 text-lime-500 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />)}
              <span className="text-emerald-950 dark:text-emerald-50 text-xl font-black ml-4 tracking-tighter">4.9 / 5.0</span>
            </div>
            <h3 className="text-4xl lg:text-6xl font-black text-emerald-950 dark:text-emerald-50 tracking-tighter leading-[0.9]">
              LOVE OUR <br />
              <span className="text-gradient-emerald italic">SERVICE?</span>
            </h3>
            <p className="text-emerald-900/60 dark:text-emerald-100/60 text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied travelers and share your elite experience
              with the world. Your feedback fuels our excellence.
            </p>
            <button className="bg-emerald-950 dark:bg-emerald-50 text-white dark:text-emerald-950 px-10 py-5 rounded-2xl font-black text-lg flex items-center gap-4 mx-auto shadow-2xl hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-all hover:scale-105 active:scale-95 group border-none">
              <Star className="w-6 h-6 fill-current" />
              Elite Google Review
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
