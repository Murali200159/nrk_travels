"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Business Traveler",
    content: "Extremely punctual and professional service. The vehicle was spotless and the driver knew the city routes perfectly. Highly recommended for corporate travel.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Family Trip",
    content: "We booked a 17-seater Tempo Traveller for a family pilgrimage. The journey was comfortable, and the driver was very patient with the elders. Great experience!",
    rating: 5,
  },
  {
    name: "Anand Viswanathan",
    role: "Outstation Trip",
    content: "Took a taxi from Vizag to Vijayawada. The transparent pricing and safe driving made the long journey stress-free. Will definitely book again.",
    rating: 4.9,
  },
  {
    name: "Suresh Babu",
    role: "Local Sightseeing",
    content: "Best way to explore Vizag. The driver acted like a guide and showed us some hidden gems we didn't know about. Excellent value for money.",
    rating: 5,
  }
];

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    containScroll: "trimSnaps",
  });

  return (
    <section className="py-24 bg-[#F8FAFC] dark:bg-[#022c22]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Client Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-emerald-950 dark:text-emerald-50 tracking-tighter leading-[0.9]">
            WHAT OUR <br />
            <span className="text-gradient-orange italic">CLIENTS SAY</span>
          </h2>
          <p className="text-emerald-900/60 dark:text-emerald-100/60 text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-medium">
            Real experiences from travelers who have discovered the ultimate
            standard in luxury mobility and service excellence.
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-8 py-4">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="flex-[0_0_85%] sm:flex-[0_0_45%] xl:flex-[0_0_31%] min-w-0">
                <motion.div
                  whileHover={{ y: -12 }}
                  className="bg-white dark:bg-[#022c22] rounded-[3rem] p-8 md:p-10 h-full flex flex-col shadow-premium hover:shadow-emerald transition-all duration-500 border border-emerald-500/5 group"
                >
                  <div className="flex justify-between items-start mb-8">
                    <Quote className="w-12 h-12 text-emerald-100 dark:text-emerald-900 group-hover:text-orange-500/20 transition-colors duration-500" />
                    <div className="flex gap-1 text-lime-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(testimonial.rating) ? 'fill-current animate-pulse' : ''}`} style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-emerald-900/60 dark:text-emerald-100/60 text-base font-medium leading-relaxed mb-10 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="mt-auto pt-8 border-t border-emerald-500/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-black text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-emerald-950 dark:text-emerald-50 tracking-tight">{testimonial.name}</h4>
                      <p className="text-[10px] font-black text-emerald-600/60 dark:text-emerald-600/40 uppercase tracking-[0.2em]">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
