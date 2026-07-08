"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface GroupTourCardProps {
  slug: string;
  title: string;
  date: string;
  price: string;
  image: string;
}

const GroupTourCard: React.FC<GroupTourCardProps> = ({ slug, title, date, price, image }) => {
  return (
    <Link
      href={`/booking/${slug === 'arasavalli-group-tour' ? 'arasavalli' : slug === 'vizag-to-pithapuram' ? 'pithapuram' : slug === 'araku-group-trip' ? 'araku-valley' : 'lambasingi'}?fleet=tempo`}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-600/10 transition-all border border-slate-100 flex flex-col h-full group"
    >
      {/* Image with Date Badge */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-1000 group-hover:brightness-110"
        />
        <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-2xl uppercase tracking-[0.2em] backdrop-blur-md bg-emerald-600/90">
          {date}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-base font-extrabold text-slate-900 mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>
        <p className="text-[10px] text-emerald-600 font-black mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Save up to 60%
        </p>

        <div className="mt-auto flex justify-between items-end pt-4 group/btn border-t border-slate-50">
          <div>
            <span className="text-3xl font-black text-orange-600">₹{price}</span>
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest mt-1">per person</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupTourCard;
