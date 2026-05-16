"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Bus, Users, Building2, Heart, Palmtree, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/navigation";

const services = [
  {
    badge: "Tempo Traveller Rental",
    title: "Best tempo traveller rental service in Vizag",
    description: "Premium tempo traveller rental with professional drivers",
    features: ["12-18 seater options", "AC comfort", "Professional drivers"],
    icon: Bus,
    bgColor: "bg-emerald-50/50",
    iconColor: "text-emerald-500",
  },
  {
    badge: "Corporate Transport",
    title: "Business travel and corporate events",
    description: "Professional corporate transportation services",
    features: ["Business class comfort", "Professional drivers", "Corporate packages"],
    icon: Building2,
    bgColor: "bg-emerald-50/50",
    iconColor: "text-emerald-500",
  },
  {
    badge: "Wedding Transport",
    title: "Wedding party transportation",
    description: "Special wedding transportation services",
    features: ["Decorated vehicles", "Wedding packages", "Professional service"],
    icon: Heart,
    bgColor: "bg-orange-50/50",
    iconColor: "text-orange-500",
  },
  {
    badge: "Pilgrimage Tours",
    title: "Religious and pilgrimage tours",
    description: "Sacred journey transportation services",
    features: ["Pilgrimage packages", "Religious sites", "Comfortable travel"],
    icon: Palmtree,
    bgColor: "bg-emerald-50/50",
    iconColor: "text-emerald-600",
  },
  {
    badge: "Group Travel",
    title: "Specialized group travel solutions",
    description: "Tailored group travel packages for all occasions",
    features: ["Custom packages", "Group discounts", "Event planning"],
    icon: Users,
    bgColor: "bg-orange-50/50",
    iconColor: "text-orange-500",
  }
];

const TempoSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Premium Fleet</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-emerald-950 tracking-tighter leading-[0.9]">
            SPECIALIZED TEMPO <br />
            <span className="text-gradient-orange italic">TRAVELLER SERVICES</span>
          </h2>
          <p className="text-emerald-900/60 text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-medium">
            Explore our comprehensive fleet designed for luxury group travel and professional corporate needs.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 md:gap-8 py-4">
              {services.map((service, idx) => (
                <div key={idx} className="flex-[0_0_85%] sm:flex-[0_0_45%] xl:flex-[0_0_31%] min-w-0">
                  <motion.div
                    whileHover={{ y: -12 }}
                    className="bg-white rounded-[3rem] p-8 md:p-10 h-full flex flex-col border border-emerald-500/5 shadow-premium hover:shadow-emerald transition-all duration-500 group/card"
                  >
                    {/* Top Section */}
                    <div className="flex justify-between items-start mb-10">
                      <span className="bg-emerald-950 text-emerald-400 text-[10px] font-black px-5 py-2 rounded-xl uppercase tracking-widest shadow-lg">
                        {service.badge}
                      </span>
                      <div className="p-3 bg-emerald-50 rounded-2xl group-hover/card:bg-orange-500 transition-colors duration-500">
                        <service.icon className={`w-6 h-6 ${service.iconColor} group-hover/card:text-white transition-colors duration-500`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 mb-8">
                      <h3 className="text-xl lg:text-2xl font-black text-slate-900 leading-tight tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4 mb-12">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3 text-[14px] text-slate-700 font-bold italic">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Book Now Button */}
                    <Link
                      href={ROUTES.FLEET}
                      className="mt-auto w-full bg-emerald-600 text-white text-xs font-black py-5 rounded-2xl transition-all duration-500 shadow-lg shadow-emerald-600/20 hover:bg-orange-600 hover:shadow-orange-600/20 uppercase tracking-[0.2em] flex items-center justify-center border-none"
                    >
                      Book Service
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination (Mobile & Tablet) */}
          <div className="xl:hidden flex items-center justify-center gap-2 mt-12">
            {scrollSnaps.map((_, index) => (
              index === selectedIndex ? (
                <div key={index} className="bg-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg">
                  {index + 1} / {services.length}
                </div>
              ) : (
                <div key={index} className="w-2 h-2 rounded-full bg-emerald-500/20" />
              )
            ))}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:block">
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-orange-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-orange-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Safety Badge */}
        <div className="bg-emerald-500/5 rounded-[3rem] p-8 lg:p-14 max-w-4xl mx-auto text-center space-y-6 mt-24 relative overflow-hidden border-2 border-emerald-500/10">
          <div className="flex items-center justify-center gap-3 text-emerald-600">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.5em]">Diamond Safety Protocol</span>
          </div>
          <p className="text-slate-700 text-lg lg:text-xl font-bold leading-relaxed max-w-2xl mx-auto">
            All tempo traveller vehicles undergo rigorous 50-point safety inspections
            and medical-grade sanitation protocols for your ultimate peace of mind.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TempoSection;
