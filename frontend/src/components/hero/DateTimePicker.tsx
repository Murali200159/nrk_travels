/**
 * =========================================
 * DateTimePicker Component
 * Custom styled date and time selection
 * =========================================
 */

"use client";

import React, { useState } from "react";
import { Clock, ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addDays } from "date-fns";
import { Button } from "@/components/ui/button";

interface DateTimePickerProps {
  onApply: (date: Date) => void;
  onClose: () => void;
  initialDate?: Date;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onApply, onClose, initialDate = new Date() }) => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(initialDate));
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [time, setTime] = useState(format(initialDate, "HH:mm"));

  const days = eachDayOfInterval({
    start: startOfWeek(currentMonth),
    end: endOfWeek(endOfMonth(currentMonth)),
  });

  const handleApply = () => {
    const [hours, minutes] = time.split(":").map(Number);
    const finalDate = new Date(selectedDate);
    finalDate.setHours(hours);
    finalDate.setMinutes(minutes);
    onApply(finalDate);
  };

  return (
    <>
      {/* Backdrop for all screens */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9990]"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] bg-white dark:bg-emerald-950 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-emerald-500/10 w-[calc(100vw-32px)] max-w-[360px] max-h-[calc(100vh-40px)] animate-in fade-in zoom-in duration-300 flex flex-col">
        {/* Close Button - Outside scroll area to prevent clipping */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 w-10 h-10 bg-emerald-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-emerald-700 hover:scale-110 active:scale-95 transition-all z-[10001]"
        >
          <X className="w-5 h-5 stroke-[3px]" />
        </button>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-emerald-950 dark:text-emerald-50">{format(currentMonth, "MMMM yyyy")}</h3>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentMonth(subMonths(currentMonth, 1)); }}
                className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 rounded-full transition-colors pointer-events-auto"
              >
                <ChevronLeft className="w-4 h-4 text-emerald-600" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentMonth(addMonths(currentMonth, 1)); }}
                className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 rounded-full transition-colors pointer-events-auto"
              >
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-6">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 text-center uppercase py-2">
                {day}
              </div>
            ))}
            {days.map((day, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedDate(day)}
                className={cn(
                  "h-9 w-9 rounded-xl flex items-center justify-center text-sm font-black transition-all",
                  !isSameMonth(day, currentMonth) ? "text-emerald-900/10 dark:text-emerald-100/10" : "text-emerald-950 dark:text-emerald-50 hover:bg-emerald-50 dark:hover:bg-emerald-900/40",
                  isSameDay(day, selectedDate) ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-700" : ""
                )}
              >
                {format(day, "d")}
              </button>
            ))}
          </div>

          {/* Time Picker & Apply Button */}
          <div className="flex items-center gap-3 border-t border-emerald-500/10 pt-6">
            <div className="relative flex-1">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600/40" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full h-12 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-500/10 rounded-xl px-10 text-sm font-black focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all cursor-pointer text-center text-emerald-950 dark:text-emerald-50"
              />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600/40" />
            </div>
            <Button
              onClick={handleApply}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 rounded-xl font-black text-sm shadow-xl shadow-emerald-600/30 transition-transform active:scale-95 border-none"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateTimePicker;
