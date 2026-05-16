"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Shield, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/navigation";
import useEmblaCarousel from "embla-carousel-react";
import TourCarousel from "./TourCarousel";
import GroupTourCard from "./GroupTourCard";

const groupTours = [
  {
    slug: "arasavalli-group-tour",
    title: "Arasavalli - Srikurmam - Mukhalingam Tour",
    date: "01 Jun",
    price: "999",
    image: "/images/group-tours/arasavalli.png",
  },
  {
    slug: "vizag-to-pithapuram",
    title: "Vizag to Pithapuram Spiritual Tour",
    date: "02 Jun",
    price: "999",
    image: "/images/group-tours/pithapuram.png",
  },
  {
    slug: "araku-group-trip",
    title: "Araku Valley Group Trip",
    date: "03 Jun",
    price: "999",
    image: "/images/group-tours/araku_caves.png",
  },
  {
    slug: "lambasingi-group-trip",
    title: "Lambasingi Group Trip",
    date: "25 Aug",
    price: "999",
    image: "/images/tours/lambasingi.png",
  },
];

const DestinationsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
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

  return (
    <section className="py-2 lg:py-16 bg-white">
      <div className="max-w-[100%] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Top Rated Destinations</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
            EXPLORE AMAZING <br />
            <span className="text-gradient-emerald italic">DESTINATIONS</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-medium">
            Discover the beauty of Andhra Pradesh with our carefully curated luxury tour packages.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="mb-16">
          <TourCarousel />
        </div>

        {/* Expert Guides Badge */}
        <div className="bg-emerald-50/50 rounded-[3rem] p-8 lg:p-12 max-w-4xl mx-auto text-center space-y-4 relative overflow-hidden border border-emerald-500/10 shadow-sm">
          <div className="absolute top-0 left-0 w-32 h-32 bg-lime-400/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="flex items-center justify-center gap-3 text-emerald-600">
            <Shield className="w-6 h-6 fill-emerald-600/10" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em]">Diamond Certified Guides</span>
          </div>
          <p className="text-slate-700 text-base lg:text-lg font-bold leading-relaxed">
            Every journey is elevated by our elite local guides, hand-selected for their deep expertise
            and commitment to providing an unparalleled luxury experience.
          </p>
        </div>

        {/* Header Section - Popular Group Tours */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 mt-24">
          <div className="space-y-4">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">POPULAR GROUP TOURS</h3>
            <p className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em]">
              Curated shared experiences for social travelers
            </p>
          </div>
          <Link href="/group-tours" className="text-[11px] font-black text-orange-600 uppercase tracking-[0.2em] flex items-center gap-2 group hover:gap-3 transition-all">
            View All Tours
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Group Tours Carousel - Mobile Only */}
        <div className="lg:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 py-4">
              {groupTours.map((tour, idx) => (
                <div key={idx} className="flex-[0_0_85%] min-w-0">
                  <GroupTourCard {...tour} />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              index === selectedIndex ? (
                <div key={index} className="bg-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg">
                  {index + 1} / {groupTours.length}
                </div>
              ) : (
                <div key={index} className="w-2 h-2 rounded-full bg-emerald-500/20" />
              )
            ))}
          </div>
          <div className="text-center pt-8">
            <Link
              href="/group-tours"
              className="flex items-center gap-2 mx-auto text-orange-500 font-black text-xs uppercase tracking-widest hover:gap-3 transition-all justify-center"
            >
              View All Tours <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Group Tours Grid - Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-8">
          {groupTours.map((tour, idx) => (
            <GroupTourCard key={idx} {...tour} />
          ))}
        </div>
      </div>
    </section>
  );
};


export default DestinationsSection;
