"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Shield, Headphones, MapPin, ShieldCheck, CreditCard, Clock, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/navigation";

const stats = [
  { label: "Years Experience", value: "5+", icon: Award, color: "bg-emerald-600" },
  { label: "Happy Customers", value: "10,000+", icon: Users, color: "bg-emerald-600" },
  { label: "Professional Drivers", value: "50+", icon: Shield, color: "bg-emerald-600" },
  { label: "Customer Support", value: "24/7", icon: Headphones, color: "bg-orange-600" },
];

const features = [
  {
    title: "Local Expertise",
    description: "5+ years of dedicated service in Visakhapatnam with deep knowledge of local routes and hidden gems.",
    icon: MapPin,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Safety First",
    description: "All drivers are thoroughly verified with clean driving records. Regular vehicle maintenance ensures your safety.",
    icon: ShieldCheck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Transparent Pricing",
    description: "Clear, upfront pricing with no hidden charges. What you see is what you pay - always.",
    icon: CreditCard,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "24/7 Availability",
    description: "Round-the-clock service for all your transportation needs. We're here whenever you need us.",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

const TrustSection = () => {
  return (
    <section className="py-24 bg-emerald-50/30 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-5 py-2 rounded-full mb-2">
            <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">The Gold Standard</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-950 tracking-tighter leading-[0.9]">
            YOUR TRUSTED <br />
            <span className="text-emerald-600 italic">TRAVEL PARTNER</span>
          </h2>
          <p className="text-slate-700 text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-bold opacity-80">
            With over 5 years of elite service in Visakhapatnam, we've built a legacy on
            uncompromising safety, transparency, and client satisfaction.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-6 md:p-10 flex flex-col items-center text-center shadow-premium hover:shadow-emerald transition-all duration-500 border border-slate-100"
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <stat.icon className="w-8 h-8" />
              </div>
              <span className="text-3xl lg:text-4xl font-black text-slate-900 mb-2 tracking-tighter">{stat.value}</span>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 10 }}
              className="bg-white rounded-2xl p-8 md:p-10 flex flex-col lg:flex-row gap-8 items-start lg:items-center shadow-premium hover:shadow-emerald transition-all duration-500 border border-slate-100 group"
            >
              <div className="p-5 rounded-2xl bg-emerald-50 text-emerald-600 flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                <feature.icon className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{feature.title}</h3>
                <p className="text-base text-slate-600 font-bold leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-20 text-center">
          <Link
            href={ROUTES.ABOUT}
            className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 group border-none"
          >
            Learn More About Our Story
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
