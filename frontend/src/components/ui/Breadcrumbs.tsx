"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
      <Link href="/" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
        <Home className="w-3 h-3" />
        Home
      </Link>

      {items.map((item, i) => (
        <React.Fragment key={i}>
          <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-emerald-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-emerald-600 font-black">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
