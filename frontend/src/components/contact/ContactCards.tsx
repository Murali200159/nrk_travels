"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const contactOptions = [
  {
    title: "Phone Support",
    value: "+91-9966363662",
    info: "24/7 Available",
    icon: Phone,
    color: "bg-emerald-500",
  },
  {
    title: "Email Support",
    value: "support@vizagtaxihub.com",
    info: "Response within 2 hours",
    icon: Mail,
    color: "bg-orange-500",
  },
  {
    title: "Office Location",
    value: "Visakhapatnam, Andhra Pradesh, India",
    info: "Mon-Sun: 24/7",
    icon: MapPin,
    color: "bg-emerald-600",
  },
  {
    title: "WhatsApp Chat",
    value: "+91-9966363662",
    info: "Quick responses",
    icon: MessageCircle,
    color: "bg-emerald-400",
  },
];

const ContactCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {contactOptions.map((option, i) => (
        <motion.div
          key={option.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={cn(
            "group relative p-8 rounded-[2rem] transition-all duration-500",
            "bg-white dark:bg-emerald-950/20 border border-slate-100 dark:border-emerald-500/10",
            "hover:shadow-[0_30px_60px_-15px_rgba(5,150,105,0.15)] dark:hover:shadow-[0_30px_60px_-15px_rgba(5,150,105,0.3)]",
            "hover:-translate-y-2 overflow-hidden"
          )}
        >
          {/* Background Glow */}
          <div className={cn(
            "absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full",
            option.color
          )} />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6",
              "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
            )}>
              <option.icon className="w-8 h-8" />
            </div>
            
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">{option.title}</h3>
            <p className="text-emerald-600 dark:text-emerald-400 font-bold mb-4 text-sm break-all">{option.value}</p>
            <span className="text-xs font-medium text-slate-400 dark:text-emerald-100/40 uppercase tracking-widest">{option.info}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ContactCards;
