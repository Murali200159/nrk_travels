"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, MapPin, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

// Hourly package definitions
const HOURLY_PACKAGES = [
  {
    hours: 4,
    km: 40,
    label: "4 Hours / 40 KM",
    tag: "Quick City",
    badgeClass: "bg-blue-950 text-blue-400",
    bgClass: "from-blue-50 to-cyan-50",
    borderClass: "border-blue-100 hover:border-blue-400/40",
    priceClass: "text-blue-600",
    btnClass: "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20",
    features: ["City sightseeing", "Local errands", "Short meetings"],
    prices: { sedan: 1200, suv: 1400, innova: 1800, tempo: 2500 },
  },
  {
    hours: 6,
    km: 60,
    label: "6 Hours / 60 KM",
    tag: "Half Day",
    badgeClass: "bg-orange-950 text-orange-400",
    bgClass: "from-orange-50 to-amber-50",
    borderClass: "border-orange-100 hover:border-orange-400/40",
    priceClass: "text-orange-600",
    btnClass: "bg-orange-500 hover:bg-orange-600 shadow-orange-500/20",
    features: ["Temple visits", "Shopping trips", "Airport errands"],
    prices: { sedan: 1800, suv: 2100, innova: 2700, tempo: 3750 },
  },
  {
    hours: 8,
    km: 80,
    label: "8 Hours / 80 KM",
    tag: "Most Popular",
    badgeClass: "bg-emerald-950 text-emerald-400",
    bgClass: "from-emerald-50 to-lime-50",
    borderClass: "border-emerald-200 hover:border-emerald-400/40",
    priceClass: "text-emerald-600",
    btnClass: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20",
    features: ["Full city tour", "Beach hopping", "Vizag exploration"],
    prices: { sedan: 2400, suv: 2800, innova: 3600, tempo: 5000 },
    highlight: true,
  },
  {
    hours: 10,
    km: 100,
    label: "10 Hours / 100 KM",
    tag: "Full Day",
    badgeClass: "bg-purple-950 text-purple-400",
    bgClass: "from-purple-50 to-violet-50",
    borderClass: "border-purple-100 hover:border-purple-400/40",
    priceClass: "text-purple-600",
    btnClass: "bg-purple-600 hover:bg-purple-700 shadow-purple-600/20",
    features: ["Temple + Beach combo", "Complete city tour", "Corporate day out"],
    prices: { sedan: 3000, suv: 3500, innova: 4500, tempo: 6250 },
  },
];

const VEHICLE_TYPES = [
  { key: "sedan", label: "Sedan / Hatchback", example: "Swift Dzire, Glanza" },
  { key: "suv", label: "SUV (7 Seater)", example: "Ertiga" },
  { key: "innova", label: "Innova Crysta", example: "8 Seater" },
  { key: "tempo", label: "Tempo Traveller", example: "12+ Seater" },
] as const;

type VehicleKey = typeof VEHICLE_TYPES[number]["key"];

const HourlySection = () => {
  const router = useRouter();
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleKey>("sedan");

  const handleBookPackage = (pkg: typeof HOURLY_PACKAGES[0]) => {
    router.push(`/booking/local-city-taxi?package=${encodeURIComponent(pkg.label)}`);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white" id="hourly-rentals">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full mb-2">
            <Clock className="w-3.5 h-3.5 text-orange-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Hourly Rentals</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
            FLEXIBLE CITY RIDES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 italic">ON YOUR TERMS</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Book a cab for a few hours — explore Vizag at your own pace with a dedicated driver. No meter, just flat hourly packages.
          </p>
        </div>

        {/* Vehicle Type Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {VEHICLE_TYPES.map((vt) => (
            <button
              key={vt.key}
              onClick={() => setSelectedVehicleType(vt.key)}
              className={`px-5 py-3 rounded-2xl transition-all ${
                selectedVehicleType === vt.key
                  ? "bg-slate-900 text-white shadow-xl"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-slate-400 hover:text-slate-700"
              }`}
            >
              <span className="block text-[11px] font-black uppercase tracking-widest">{vt.label}</span>
              <span className={`block text-[9px] font-bold mt-0.5 ${selectedVehicleType === vt.key ? "text-white/60" : "text-slate-400"}`}>
                {vt.example}
              </span>
            </button>
          ))}
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOURLY_PACKAGES.map((pkg, idx) => {
            const price = pkg.prices[selectedVehicleType];
            const driverBhatta = 200;
            const subtotal = price + driverBhatta;
            const gst = Math.ceil(subtotal * 0.05);
            const totalWithGst = subtotal + gst;

            return (
              <motion.div
                key={pkg.hours}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative bg-gradient-to-br ${pkg.bgClass} rounded-[2rem] p-8 border ${pkg.borderClass} shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col ${pkg.highlight ? "ring-2 ring-emerald-400/30" : ""}`}
              >
                {/* Popular Badge */}
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 whitespace-nowrap">
                      <Zap className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Tag */}
                <div className="mb-6">
                  <span className={`${pkg.badgeClass} text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest inline-block shadow-lg`}>
                    {pkg.tag}
                  </span>
                </div>

                {/* Hours & KM */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-5xl font-black ${pkg.priceClass} tracking-tighter`}>{pkg.hours}</span>
                    <span className="text-xl font-black text-slate-400">Hrs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{pkg.km} KM Included</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-5 border border-white/80">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-1">
                    <span>Base Fare</span>
                    <span>₹{price.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-1.5">
                    <span>Driver Bhatta</span>
                    <span>₹{driverBhatta} (Incl.)</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-1">
                    <span>GST (5%)</span>
                    <span>₹{gst}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Total</span>
                    <span className={`text-xl font-black ${pkg.priceClass}`}>₹{totalWithGst.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleBookPackage(pkg)}
                  className={`w-full py-4 rounded-2xl text-white text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 ${pkg.btnClass}`}
                >
                  Book {pkg.hours} Hrs <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          * Shown prices are for {VEHICLE_TYPES.find(v => v.key === selectedVehicleType)?.label}. Extra km charged beyond package limit.
        </p>
      </div>
    </section>
  );
};

export default HourlySection;
