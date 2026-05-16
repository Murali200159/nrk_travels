"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface TourCardProps {
  slug: string;
  title: string;
  price: string;
  duration: string;
  image: string;
  tags: string[];
}

const TourCard: React.FC<TourCardProps> = ({ slug, title, price, duration, image, tags }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all border border-emerald-500/5 flex flex-col h-full"
    >
      {/* Badge/Title */}
      <div className="mb-4">
        <span className="bg-emerald-950 text-white text-[10px] font-black px-4 py-2 rounded-full inline-block tracking-wide uppercase">
          {title}
        </span>
      </div>

      {/* Price and Duration */}
      <div className="flex justify-between items-center mb-4 px-1">
        <div>
          <span className="text-xl font-black text-emerald-950 tracking-tighter">₹{price}</span>
          <span className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Onwards</span>
        </div>
        <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-500/10">
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">{duration}</span>
        </div>
      </div>

      {/* Image */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-emerald-500/5">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Tags & Action */}
      <div className="mt-auto pt-4 flex items-center justify-between px-1">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              #{tag.split(' ').join('')}
            </span>
          ))}
        </div>
        <Link
          href={`/tours/${slug}`}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
        >
          Book
        </Link>
      </div>
    </motion.div>
  );
};

export default TourCard;
