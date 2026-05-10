/**
 * =========================================
 * WhatsAppModal Component
 * Modal for lead generation / Email notification
 * =========================================
 */

"use client";

import React, { useState } from "react";
import { X, Phone, ShieldCheck, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: any;
  onConfirm: (phoneNumber: string) => void;
}

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose, bookingData, onConfirm }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = phoneNumber.length === 10;

  const handleConfirm = async () => {
    if (!isValid) return;
    setIsSubmitting(true);

    const fullDetails = `
New Booking Enquiry
-------------------
Category: ${bookingData.category.toUpperCase()}
Trip Type: ${bookingData.tripType}
Pickup: ${bookingData.pickup}
Drop: ${bookingData.drop || "N/A"}
Package: ${bookingData.package || "N/A"}
Departure: ${bookingData.departureDate}
Return: ${bookingData.returnDate || "N/A"}
User Phone: +91 ${phoneNumber}
    `.trim();

    try {
      // Sending to Gmail automatically using Web3Forms (No backend required)
      // The user needs to replace YOUR_ACCESS_KEY with a real one from web3forms.com
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "62688863-7188-4663-8833-885441584852", // Placeholder Key - User should replace this
          subject: `New Booking Request from ${phoneNumber}`,
          from_name: "Shannu Car Travels",
          to_email: "praghnesh8764@gmail.com",
          message: fullDetails,
          phone: phoneNumber,
          ...bookingData
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Booking details sent successfully to Gmail!");
        onConfirm(phoneNumber);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      // Fallback to Gmail Direct Link if automatic send fails
      const adminEmail = "praghnesh8764@gmail.com";
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(adminEmail)}&su=${encodeURIComponent(`Booking Request ${phoneNumber}`)}&body=${encodeURIComponent(fullDetails)}`;
      window.open(gmailUrl, "_blank");
      toast.info("Automatic send failed. Opening Gmail instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] w-full max-w-[480px] overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 lg:p-12 space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              Instant Booking
            </h2>
            <p className="text-gray-500 font-medium text-lg leading-relaxed">
              Enter your mobile number to send your booking details directly to our Gmail inbox.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 ml-1">
                Mobile number
              </label>
              <div className={cn(
                "flex gap-0 border rounded-2xl overflow-hidden transition-all duration-300",
                isValid ? "border-blue-500 ring-4 ring-blue-500/10 shadow-lg" : "border-gray-200 focus-within:border-gray-400"
              )}>
                {/* Country Code Selector */}
                <div className="bg-gray-50 px-4 lg:px-6 border-r border-gray-200 flex items-center gap-2 flex-shrink-0 cursor-default min-w-[100px] lg:min-w-[120px]">
                  <span className="font-bold text-gray-900 text-base lg:text-lg">+91</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">(IN)</span>
                  <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                </div>
                {/* Phone Input */}
                <input 
                  type="tel"
                  maxLength={10}
                  placeholder="Mobile number"
                  value={phoneNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 10) setPhoneNumber(val);
                  }}
                  className="flex-1 h-16 pl-6 pr-4 bg-white text-lg lg:text-xl font-bold placeholder:text-gray-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button 
                onClick={handleConfirm}
                disabled={!isValid || isSubmitting}
                className={cn(
                  "w-full h-16 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3",
                  isValid && !isSubmitting
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-2xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-80"
                )}
              >
                {isSubmitting ? (
                  <>Sending... <Loader2 className="w-5 h-5 animate-spin" /></>
                ) : isValid ? (
                  <>Search Cabs <Search className="w-5 h-5" /></>
                ) : (
                  "Enter 10 Digits"
                )}
              </Button>
              
              <div className="flex items-start gap-3 p-1">
                <p className="text-[11px] text-gray-400 font-bold leading-relaxed flex-1">
                  By clicking on <span className="text-gray-900">Search Cabs</span>, your booking enquiry will be sent automatically to our team.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 py-2 border-t border-gray-50 pt-8">
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">Secure & Direct Submission</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for ChevronDown icon
const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default WhatsAppModal;
