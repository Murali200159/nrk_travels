"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/navigation";

const destinations = [
  {
    name: "Vizag Local Temples",
    price: "3,000",
    description: "Simhachalam, Kanaka Maha Lakshmi, Sampath Vinayagar, ISKCON, Kailasagiri, TTD & Kali Temple.",
    distance: "100 km",
    duration: "10 hours",
  },
  {
    name: "Annavaram",
    price: "4,500",
    description: "Sri Veera Venkata Satyanarayana Swamy Temple is a Hindu-Vaishnavite temple located in Annavaram.",
    distance: "260 km",
    duration: "8-9 hours",
  },
  {
    name: "Srikakulam",
    price: "4,500",
    description: "Srikakulam is known for its temples, with the Srikurmam Temple and Arasavalli Sun God Temple.",
    distance: "260 km",
    duration: "8-9 hours",
  },
  {
    name: "Pithapuram",
    price: "5,000",
    description: "Pithapuram is one of the oldest and famous pilgrim places of India.",
    distance: "320 km",
    duration: "11-12 hours",
  },
  {
    name: "Vijayawada",
    price: "11,500",
    description: "Situated in the heart of the Vijayawada city, Kanaka Durga temple is located on the Indrakeeladri hill.",
    distance: "750 km",
    duration: "14-16 hours",
  },
  {
    name: "Tirupati",
    price: "24,000",
    description: "Tirumala is the richest pilgrimage centre in the world.",
    distance: "1600 km",
    duration: "36 hours",
  }
];

const OutstationSection = () => {
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
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Explore Further</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-emerald-950 dark:text-emerald-50 tracking-tighter leading-[0.9]">
            TOP DESTINATIONS <br />
            <span className="text-gradient-emerald italic">FROM VIZAG</span>
          </h2>
          <p className="text-emerald-900/60 dark:text-emerald-100/60 text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-medium">
            Explore popular destinations from Visakhapatnam with our reliable outstation taxi services.
            All-inclusive pricing for a worry-free journey.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 md:gap-8 py-4">
              {destinations.map((dest, idx) => (
                <div key={idx} className="flex-[0_0_85%] sm:flex-[0_0_45%] xl:flex-[0_0_31%] min-w-0">
                  <motion.div
                    whileHover={{ y: -12 }}
                    className="bg-gradient-to-br from-emerald-50 to-lime-50 dark:from-emerald-950/20 dark:to-lime-950/20 rounded-[3rem] p-8 md:p-10 h-full flex flex-col shadow-sm hover:shadow-emerald transition-all duration-500 border border-emerald-500/5 relative overflow-hidden group/card"
                  >
                    {/* Temple Illustration Background */}
                    <div className="absolute right-0 bottom-0 opacity-[0.05] pointer-events-none group-hover/card:scale-125 transition-transform duration-1000">
                      <svg width="240" height="240" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-950">
                        <path d="M12 2L4.5 9V22H19.5V9L12 2ZM12 4.44L17.5 9.57V20H6.5V9.57L12 4.44ZM12 7L10 9H14L12 7ZM11 11V18H13V11H11Z" />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 space-y-8">
                      <span className="bg-emerald-950 text-emerald-400 text-[10px] font-black px-5 py-2 rounded-xl uppercase tracking-widest inline-block shadow-lg">
                        {dest.name}
                      </span>

                      <div className="space-y-4">
                        <div className="text-3xl md:text-4xl font-black text-emerald-950 dark:text-emerald-50 tracking-tighter">
                          ₹{dest.price}
                        </div>
                        <p className="text-sm text-emerald-900/60 dark:text-emerald-100/60 font-medium leading-relaxed min-h-[4.5rem]">
                          {dest.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-6 border-t border-emerald-500/10 items-center justify-between">
                        <div className="flex gap-2">
                          <div className="bg-white/80 dark:bg-emerald-900/40 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black text-emerald-600 border border-emerald-500/10 uppercase tracking-widest">
                            {dest.distance}
                          </div>
                          <div className="bg-white/80 dark:bg-emerald-900/40 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black text-emerald-600 border border-emerald-500/10 uppercase tracking-widest">
                            {dest.duration}
                          </div>
                        </div>
                        <Link
                          href={ROUTES.FLEET}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                        >
                          Book
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="xl:hidden flex items-center justify-center gap-2 mt-12">
            {scrollSnaps.map((_, index) => (
              index === selectedIndex ? (
                <div key={index} className="bg-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg">
                  {index + 1} / {destinations.length}
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

        {/* Reliable Service Badge */}
        <div className="glass-emerald rounded-[3rem] p-8 lg:p-12 max-w-4xl mx-auto text-center space-y-4 mt-20 relative overflow-hidden border border-emerald-500/10">
          <div className="flex items-center justify-center gap-3 text-emerald-600 dark:text-lime-400">
            <CheckCircle2 className="w-6 h-6 fill-current opacity-20 dark:fill-lime-400/10" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em]">All-Inclusive Pricing</span>
          </div>
          <p className="text-emerald-900/60 dark:text-emerald-100/60 text-base lg:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Enjoy complete peace of mind with rates that include driver allowance, fuel, and all standard
            toll charges. No hidden surprises on your elite journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OutstationSection;
