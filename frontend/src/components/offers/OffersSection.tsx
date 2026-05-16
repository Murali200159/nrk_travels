"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Car, MapPin, Plane, Bus, UserCheck } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/navigation";

const offers = [
  {
    badge: "Local Trips",
    title: "Save up to ₹200 on local packages",
    description: "Hourly packages for city exploration",
    features: ["8hrs/80km - ₹2,400", "10hrs/100km - ₹3,000", "Professional drivers"],
    icon: Car,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    badge: "Outstation Travel",
    title: "Save up to ₹300 on long journeys",
    description: "Comfortable long-distance journeys",
    features: ["Hyderabad - 650km", "Chennai - 800km", "Bangalore - 1000km"],
    icon: MapPin,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    badge: "Airport Transfers",
    title: "Save up to ₹200 on airport rides",
    description: "Reliable airport connectivity",
    features: ["On-time guarantee", "Flight tracking", "Fixed rates"],
    icon: Plane,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    badge: "Tempo Traveller Rental",
    title: "Save up to ₹500 on group travel",
    description: "Perfect for group travel and events",
    features: ["12-18 seater options", "AC comfort", "Professional drivers"],
    icon: Bus,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
  {
    badge: "Hire a Driver",
    title: "Save up to ₹100 with professional drivers",
    description: "Professional drivers for your vehicle",
    features: ["Licensed drivers", "Flexible hours", "Safe & reliable"],
    icon: UserCheck,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  }
];

const OffersSection = () => {
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
    <section className="py-24 bg-white dark:bg-[#010a08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Exclusive Privileges</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-emerald-950 dark:text-emerald-50 tracking-tighter leading-[0.9]">
            YOUR JOURNEY, <br />
            <span className="text-gradient-orange italic">OUR PRIORITY</span>
          </h2>
          <p className="text-emerald-900/60 dark:text-emerald-100/60 text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-medium">
            From seamless city transfers to cross-country expeditions, we redefine travel
            with unmatched luxury and comfort.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 md:gap-8 py-4">
              {offers.map((offer, idx) => (
                <div key={idx} className="flex-[0_0_85%] sm:flex-[0_0_45%] xl:flex-[0_0_31%] min-w-0">
                  <motion.div
                    whileHover={{ y: -12 }}
                    className="bg-emerald-50/30 dark:bg-emerald-950/20 rounded-[3rem] p-8 md:p-10 h-full flex flex-col shadow-sm hover:shadow-emerald transition-all duration-500 border border-emerald-500/5 group/card"
                  >
                    {/* Top Section */}
                    <div className="flex justify-between items-start mb-10">
                      <span className="bg-emerald-950 text-emerald-400 text-[10px] font-black px-5 py-2 rounded-xl uppercase tracking-widest shadow-lg">
                        {offer.badge}
                      </span>
                      <div className="p-3 bg-white dark:bg-emerald-900/40 rounded-2xl group-hover/card:bg-orange-500 transition-colors duration-500 shadow-sm">
                        <offer.icon className={`w-6 h-6 text-emerald-600 group-hover/card:text-white transition-colors duration-500`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 mb-8">
                      <h3 className="text-xl lg:text-2xl font-black text-emerald-950 dark:text-emerald-50 leading-tight tracking-tight">
                        {offer.title}
                      </h3>
                      <p className="text-sm text-emerald-900/60 dark:text-emerald-100/60 font-medium leading-relaxed">
                        {offer.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="mt-8 pt-8 border-t border-emerald-500/10">
                      <Link
                        href={
                          offer.badge === "Hire a Driver" ? ROUTES.HIRE_DRIVER :
                            offer.badge === "Tour Packages" ? ROUTES.TOURS_SECTION :
                              offer.badge === "Local Trips" ? ROUTES.SERVICES_SECTION :
                                ROUTES.FLEET_SECTION
                        }
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 hover:text-orange-500 transition-colors flex items-center gap-2 group-hover/card:gap-3"
                      >
                        Learn More <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
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
                  {index + 1} / {offers.length}
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
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-white dark:bg-emerald-950 rounded-2xl shadow-xl border border-emerald-500/10 flex items-center justify-center text-emerald-950 dark:text-emerald-50 hover:bg-orange-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 bg-white dark:bg-emerald-950 rounded-2xl shadow-xl border border-emerald-500/10 flex items-center justify-center text-emerald-950 dark:text-emerald-50 hover:bg-orange-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
