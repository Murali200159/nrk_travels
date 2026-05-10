/**
 * =========================================
 * BookingForm Component
 * Search inputs for locations and dates
 * =========================================
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Search, ArrowRight, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TripToggle from "./TripToggle";
import DateTimePicker from "./DateTimePicker";
import WhatsAppModal from "./WhatsAppModal";
import { format } from "date-fns";


const BookingForm = ({ activeTab = "outstation" }: { activeTab?: string }) => {
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [airportTrip, setAirportTrip] = useState<"from-airport" | "to-airport">("from-airport");
  
  // Input States
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [localPackage, setLocalPackage] = useState("8 Hours / 80 KM");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(new Date().getTime() + 86400000));

  // Date Picker States
  const [showDepPicker, setShowDepPicker] = useState(false);
  const [showRetPicker, setShowRetPicker] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const toggleDepPicker = () => {
    setShowDepPicker(!showDepPicker);
    setShowRetPicker(false);
  };

  const toggleRetPicker = () => {
    setShowRetPicker(!showRetPicker);
    setShowDepPicker(false);
  };

  // Validation
  const isFormValid = () => {
    if (activeTab === "local") {
      return pickup.trim() !== "";
    }
    if (activeTab === "airport") {
      return pickup.trim() !== "" || drop.trim() !== ""; // One is usually pre-filled
    }
    if (activeTab === "tour") {
      return pickup.trim() !== "";
    }
    return pickup.trim() !== "" && drop.trim() !== "";
  };

  const handleSearch = () => {
    if (isFormValid()) {
      setShowWhatsAppModal(true);
    }
  };

  // Collect Booking Data
  const getBookingData = () => {
    return {
      category: activeTab,
      tripType: activeTab === "local" ? "Local" : (activeTab === "airport" ? airportTrip : tripType),
      pickup: activeTab === "airport" && airportTrip === "from-airport" ? "Visakhapatnam International Airport" : pickup,
      drop: activeTab === "airport" && airportTrip === "to-airport" ? "Visakhapatnam International Airport" : drop,
      package: activeTab === "local" ? localPackage : undefined,
      departureDate: format(departureDate, "MMM dd, yyyy hh:mm a"),
      returnDate: (activeTab === "outstation" || activeTab === "tour") && tripType === "round-trip" ? format(returnDate, "MMM dd, yyyy hh:mm a") : undefined,
    };
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 relative">
      {/* Conditional Rendering based on Active Tab */}
      {activeTab === "local" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Pickup location</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Enter a location" 
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-semibold" 
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Package</label>
            <div className="relative">
              <select 
                value={localPackage}
                onChange={(e) => setLocalPackage(e.target.value)}
                className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl px-6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-bold appearance-none cursor-pointer"
              >
                <option>8 Hours / 80 KM</option>
                <option>10 Hours / 100 KM</option>
                <option>12 Hours / 120 KM</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="space-y-3 relative">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Departure</label>
            <div onClick={toggleDepPicker} className="relative group cursor-pointer">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <div suppressHydrationWarning className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 flex items-center text-gray-900 font-bold">
                {format(departureDate, "MMM dd, hh:mm a")}
              </div>
            </div>
          </div>
          <div>
            <Button 
              onClick={handleSearch} 
              disabled={!isFormValid()}
              className={cn(
                "w-full h-16 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3",
                isFormValid() 
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95" 
                  : "bg-blue-200 text-white cursor-not-allowed opacity-80"
              )}
            >
              Search <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ) : activeTab === "airport" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Pickup location</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                value={airportTrip === "from-airport" ? "Visakhapatnam International Airport" : pickup}
                onChange={(e) => setPickup(e.target.value)}
                disabled={airportTrip === "from-airport"}
                placeholder="Enter a location" 
                className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-semibold disabled:bg-gray-100 disabled:cursor-not-allowed" 
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Drop location</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                value={airportTrip === "to-airport" ? "Visakhapatnam International Airport" : drop}
                onChange={(e) => setDrop(e.target.value)}
                disabled={airportTrip === "to-airport"}
                placeholder="Enter a location" 
                className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-semibold disabled:bg-gray-100 disabled:cursor-not-allowed" 
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Trip</label>
            <div className="flex bg-gray-100 p-1 rounded-xl w-full relative h-16">
              <div className={cn("absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-blue-600 rounded-lg shadow-md z-0 transition-transform duration-300", airportTrip === "to-airport" ? "translate-x-full" : "translate-x-0")} />
              <button onClick={() => setAirportTrip("from-airport")} className={cn("flex-1 px-4 text-xs font-bold z-10 transition-colors duration-300", airportTrip === "from-airport" ? "text-white" : "text-gray-500")}>From Airport</button>
              <button onClick={() => setAirportTrip("to-airport")} className={cn("flex-1 px-4 text-xs font-bold z-10 transition-colors duration-300", airportTrip === "to-airport" ? "text-white" : "text-gray-500")}>To Airport</button>
            </div>
          </div>
          <div className="space-y-3 relative">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Departure</label>
            <div onClick={toggleDepPicker} className="relative group cursor-pointer">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <div suppressHydrationWarning className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 flex items-center text-gray-900 font-bold">
                {format(departureDate, "MMM dd, hh:mm a")}
              </div>
            </div>
          </div>
          <div>
            <Button 
              onClick={handleSearch} 
              disabled={!isFormValid()}
              className={cn(
                "w-full h-16 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3",
                isFormValid() 
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95" 
                  : "bg-blue-200 text-white cursor-not-allowed opacity-80"
              )}
            >
              Search <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ) : activeTab === "tour" ? (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 items-end", tripType === "round-trip" ? "lg:grid-cols-5" : "lg:grid-cols-4")}>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Pickup location</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Enter a location" 
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-semibold" 
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Trip</label>
            <TripToggle value={tripType} onChange={setTripType} />
          </div>
          <div className="space-y-3 relative">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Departure</label>
            <div onClick={toggleDepPicker} className="relative group cursor-pointer">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <div suppressHydrationWarning className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 flex items-center text-gray-900 font-bold">
                {format(departureDate, "MMM dd, hh:mm a")}
              </div>
            </div>
          </div>
          {tripType === "round-trip" && (
            <div className="space-y-3 relative">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Return</label>
              <div onClick={toggleRetPicker} className="relative group cursor-pointer">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <div suppressHydrationWarning className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 flex items-center text-gray-900 font-bold">
                  {format(returnDate, "MMM dd, hh:mm a")}
                </div>
              </div>
            </div>
          )}
          <div>
            <Button 
              onClick={handleSearch} 
              disabled={!isFormValid()}
              className={cn(
                "w-full h-16 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3",
                isFormValid() 
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95" 
                  : "bg-blue-200 text-white cursor-not-allowed opacity-80"
              )}
            >
              Search <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 items-end">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Pickup location</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Enter a location" 
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-semibold" 
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Drop location</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Enter a location" 
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-semibold" 
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Trip</label>
            <TripToggle value={tripType} onChange={setTripType} />
          </div>
          <div className="space-y-3 relative">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Departure</label>
            <div onClick={toggleDepPicker} className="relative group cursor-pointer">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <div suppressHydrationWarning className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 flex items-center text-gray-900 font-bold">
                {format(departureDate, "MMM dd, hh:mm a")}
              </div>
            </div>
          </div>
          <div className={cn("space-y-3 relative transition-all duration-300", tripType === "round-trip" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none")}>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Return</label>
            <div onClick={toggleRetPicker} className="relative group cursor-pointer">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <div suppressHydrationWarning className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 flex items-center text-gray-900 font-bold">
                {format(returnDate, "MMM dd, hh:mm a")}
              </div>
            </div>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <Button 
              onClick={handleSearch} 
              disabled={!isFormValid()}
              className={cn(
                "w-full h-16 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3",
                isFormValid() 
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95" 
                  : "bg-blue-200 text-white cursor-not-allowed opacity-80"
              )}
            >
              Search <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Floating Pickers - Rendered at bottom of container for stacking context */}
      {showDepPicker && (
        <DateTimePicker 
          initialDate={departureDate}
          onApply={(date) => { setDepartureDate(date); setShowDepPicker(false); }}
          onClose={() => setShowDepPicker(false)}
        />
      )}
      {showRetPicker && (
        <DateTimePicker 
          initialDate={returnDate}
          onApply={(date) => { setReturnDate(date); setShowRetPicker(false); }}
          onClose={() => setShowRetPicker(false)}
        />
      )}
      {showWhatsAppModal && (
        <WhatsAppModal 
          isOpen={showWhatsAppModal}
          onClose={() => setShowWhatsAppModal(false)}
          bookingData={getBookingData()}
          onConfirm={(phone) => {
            console.log("Searching for phone:", phone);
            setShowWhatsAppModal(false);
          }}
        />
      )}
    </div>
  );
};

export default BookingForm;
