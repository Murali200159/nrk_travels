"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Rocket, Eye, Gem } from "lucide-react";

const OurStory = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white dark:bg-[#010a08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Content Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8 order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black tracking-[0.3em] uppercase">
              <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
              Our Journey
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Crafting Memorable <span className="text-emerald-600 italic">Travel Experiences</span> in Vizag Since 2015
            </h2>

            <p className="text-lg md:text-xl text-slate-600 dark:text-emerald-100/60 leading-relaxed font-medium">
              What started with a single cab and a dream to provide reliable transportation in Visakhapatnam has grown into the city&apos;s most trusted taxi hub. Our story is built on the foundation of safety, punctuality, and a deep love for our beautiful coastal city. VIZAG TAXI represents the spirit of elite mobility.
            </p>

            <div className="grid grid-cols-2 gap-8 py-8 border-y border-slate-100 dark:border-emerald-500/10">
              <div className="space-y-1">
                <h3 className="text-3xl md:text-5xl font-black text-emerald-600">500k+</h3>
                <p className="text-slate-400 dark:text-emerald-100/40 font-bold uppercase text-[10px] tracking-[0.2em]">Happy Travelers</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl md:text-5xl font-black text-emerald-600">50+</h3>
                <p className="text-slate-400 dark:text-emerald-100/40 font-bold uppercase text-[10px] tracking-[0.2em]">Expert Drivers</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-l-4 border-emerald-600 pl-8 py-2">
              <p className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white italic leading-snug tracking-tight">
                &quot;We don&apos;t just drive you to your destination; we ensure you enjoy every mile of the journey.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-black text-xl md:text-2xl shadow-inner border border-emerald-500/20">VS</div>
                <div>
                  <p className="font-black text-slate-900 dark:text-white text-base md:text-xl uppercase tracking-tighter">Vikram Singh</p>
                  <p className="text-[10px] md:text-xs text-slate-400 dark:text-emerald-100/40 font-bold uppercase tracking-[0.2em]">Founder, VIZAG TAXI</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative w-full lg:w-auto order-1 lg:order-2"
          >
            <div className="relative z-10 rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-2xl transform hover:rotate-1 transition-transform duration-700 group border border-slate-100 dark:border-emerald-500/10">
              <div className="aspect-[4/5] bg-slate-50 dark:bg-emerald-950/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/30 via-transparent to-transparent z-10 group-hover:opacity-40 transition-opacity duration-500"></div>
                <Image
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000"
                  alt="Our Story"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out grayscale hover:grayscale-0"
                />
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full -z-0 blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-orange-500/10 rounded-full -z-0 blur-3xl opacity-60"></div>

            {/* Floating Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-8 -right-4 md:bottom-12 md:-left-12 bg-white/10 dark:bg-emerald-950/40 backdrop-blur-3xl p-6 md:p-10 rounded-[2.5rem] shadow-2xl z-20 flex items-center gap-6 border border-white/20 dark:border-emerald-500/20"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-orange-500/20 rotate-3 group-hover:rotate-6 transition-transform">
                <Star className="w-8 h-8 fill-current" />
              </div>
              <div>
                <p className="font-black text-slate-900 dark:text-white text-xl md:text-2xl uppercase tracking-tighter">Top Rated</p>
                <p className="text-[10px] md:text-xs text-slate-400 dark:text-emerald-100/40 font-bold tracking-[0.3em] uppercase">4.9/5 Google Rating</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-32 lg:mt-40">
          {[
            {
              title: "Our Mission",
              desc: "To provide the highest standard of luxury mobility and tourism services in Vizag by leveraging a modern fleet and elite protocols.",
              icon: Rocket,
              color: "bg-emerald-500/5 dark:bg-emerald-950/10 border-emerald-500/10",
              accent: "bg-emerald-600"
            },
            {
              title: "Our Vision",
              desc: "To become South India's most prestigious and reliable luxury transportation network, known for setting the benchmark in safety.",
              icon: Eye,
              color: "bg-orange-500/5 dark:bg-orange-950/10 border-orange-500/10",
              accent: "bg-orange-500"
            },
            {
              title: "Our Values",
              desc: "Transparency, Integrity, and Customer Satisfaction are at the heart of everything we do. We treat every passenger like family.",
              icon: Gem,
              color: "bg-emerald-500/5 dark:bg-emerald-950/10 border-emerald-500/10",
              accent: "bg-emerald-600"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`${item.color} border p-12 lg:p-16 rounded-[3rem] space-y-8 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="p-5 bg-white dark:bg-emerald-900/20 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-emerald-500/10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">
                <item.icon className="w-10 h-10 text-emerald-600" />
              </div>
              <div className="space-y-6 relative z-10">
                <h3 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">{item.title}</h3>
                <div className={`w-12 h-1.5 ${item.accent} rounded-full`} />
                <p className="text-slate-500 dark:text-emerald-100/60 font-medium leading-relaxed text-lg">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;

