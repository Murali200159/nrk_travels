/**
 * =========================================
 * LeadCaptureModal Component
 * Mandatory modal popup for capturing leads
 * =========================================
 */

"use client";

import React, { useState } from "react";
import { Phone, ShieldCheck, Search, Loader2, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { submitEnquiry } from "@/lib/api";

interface LeadCaptureModalProps {
  isOpen: boolean;
  tripDetails: {
    pickup: string;
    drop?: string;
    tripType: string;
    date?: string;
    distance?: number;
  };
  onSuccess: () => void;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, tripDetails, onSuccess }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isMobileValid = mobile.length === 10;
  const isNameValid = name.trim().length >= 2;
  const isWhatsappValid = sameAsMobile || whatsapp.length === 10;
  const isValid = isNameValid && isMobileValid && isWhatsappValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        name: name.trim(),
        mobile: mobile,
        whatsapp: sameAsMobile ? mobile : whatsapp,
        pickup: tripDetails.pickup,
        drop: tripDetails.drop,
        tripType: tripDetails.tripType,
        date: tripDetails.date,
        distance: tripDetails.distance,
      };

      const response = await submitEnquiry(payload);

      if (response && response.success) {
        toast.success("Details verified! Unlocking cab results.");
        onSuccess();
      } else {
        throw new Error("Unable to submit details. Please try again.");
      }
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      setErrorMessage(err.message || "Something went wrong. Please check your internet connection.");
      toast.error(err.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Heavy blur backdrop to hide background results completely */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-2xl" />

      {/* Modal Container */}
      <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] w-full max-w-[500px] overflow-hidden border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300">
        
        {/* Top Decorative bar */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-500 to-orange-500" />

        <div className="p-8 lg:p-12 space-y-8">
          {/* Header */}
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Unlock Rates & Cabs
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed">
              Enter your trip contact details to view available vehicles, premium rates, and instant discounts.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Your Full Name
              </label>
              <div className={cn(
                "flex items-center border rounded-2xl overflow-hidden transition-all duration-300 bg-slate-50/50 dark:bg-slate-800/50",
                name.trim().length >= 2 ? "border-emerald-500 ring-2 ring-emerald-500/10" : "border-slate-200 dark:border-slate-700 focus-within:border-emerald-500/40"
              )}>
                <div className="pl-4 pr-2 text-slate-400">
                  <User className="w-5 h-5 text-emerald-600" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-14 pr-4 bg-transparent text-sm font-black text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Mobile Number Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Mobile Number
              </label>
              <div className={cn(
                "flex items-center border rounded-2xl overflow-hidden transition-all duration-300 bg-slate-50/50 dark:bg-slate-800/50",
                isMobileValid ? "border-emerald-500 ring-2 ring-emerald-500/10" : "border-slate-200 dark:border-slate-700 focus-within:border-emerald-500/40"
              )}>
                <div className="bg-slate-100 dark:bg-slate-800 px-4 h-14 border-r border-slate-200 dark:border-slate-700 flex items-center gap-1.5 flex-shrink-0 cursor-default">
                  <span className="font-black text-slate-800 dark:text-white text-sm">+91</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase">(IN)</span>
                </div>
                <div className="pl-3 pr-2 text-slate-400">
                  <Phone className="w-4 h-4 text-emerald-600" />
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  placeholder="Enter 10-digit mobile"
                  value={mobile}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 10) setMobile(val);
                  }}
                  className="w-full h-14 pr-4 bg-transparent text-sm font-black text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none tracking-wider"
                />
              </div>
            </div>

            {/* Same as WhatsApp Checkbox */}
            <div className="flex items-center gap-3 ml-1">
              <button
                type="button"
                onClick={() => setSameAsMobile(!sameAsMobile)}
                className={cn(
                  "w-5 h-5 rounded-md border flex items-center justify-center transition-all",
                  sameAsMobile ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 dark:border-slate-750"
                )}
              >
                {sameAsMobile && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <span 
                onClick={() => setSameAsMobile(!sameAsMobile)} 
                className="text-xs font-bold text-slate-500 dark:text-slate-400 cursor-pointer select-none"
              >
                WhatsApp number is same as mobile number
              </span>
            </div>

            {/* Optional WhatsApp Number Input */}
            {!sameAsMobile && (
              <div className="space-y-2 animate-in slide-in-from-top-3 duration-300">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  WhatsApp Number
                </label>
                <div className={cn(
                  "flex items-center border rounded-2xl overflow-hidden transition-all duration-300 bg-slate-50/50 dark:bg-slate-800/50",
                  whatsapp.length === 10 ? "border-emerald-500 ring-2 ring-emerald-500/10" : "border-slate-200 dark:border-slate-700 focus-within:border-emerald-500/40"
                )}>
                  <div className="bg-slate-100 dark:bg-slate-800 px-4 h-14 border-r border-slate-200 dark:border-slate-700 flex items-center gap-1.5 flex-shrink-0 cursor-default">
                    <span className="font-black text-slate-800 dark:text-white text-sm">+91</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase">(IN)</span>
                  </div>
                  <div className="pl-3 pr-2 text-slate-400">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    placeholder="Enter WhatsApp number"
                    value={whatsapp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (val.length <= 10) setWhatsapp(val);
                    }}
                    className="w-full h-14 pr-4 bg-transparent text-sm font-black text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none tracking-wider"
                  />
                </div>
              </div>
            )}

            {/* Error Message Box */}
            {errorMessage && (
              <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-2xl flex items-start gap-3">
                <span className="text-red-500 mt-0.5">⚠️</span>
                <p className="text-xs font-bold text-red-600 dark:text-red-400">{errorMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={cn(
                  "w-full h-16 rounded-2xl font-black text-lg uppercase tracking-wider transition-all flex items-center justify-center gap-3 border-none",
                  isValid && !isSubmitting
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-xl shadow-emerald-500/20 hover:scale-[1.01] active:scale-98"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>Verifying... <Loader2 className="w-5 h-5 animate-spin" /></>
                ) : (
                  <>Search Available Cabs <Search className="w-5 h-5" /></>
                )}
              </Button>
            </div>
          </form>

          {/* Secure details footer */}
          <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-850">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
              Verified Secure Submission
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LeadCaptureModal;
