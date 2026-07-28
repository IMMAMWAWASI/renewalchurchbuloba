import React, { useState, useEffect } from "react";
import { ANNOUNCEMENTS } from "../data";
import { Announcement } from "../types";
import { ChevronRight, Megaphone, X } from "lucide-react";

interface AnnouncementsProps {
  onNavigate: (view: string) => void;
  announcements?: Announcement[];
}

export default function Announcements({ onNavigate, announcements }: AnnouncementsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const displayList = announcements || ANNOUNCEMENTS;

  useEffect(() => {
    if (displayList.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [displayList]);

  // Keep index clamped in case list size shrinks dynamically
  useEffect(() => {
    if (currentIndex >= displayList.length) {
      setCurrentIndex(0);
    }
  }, [displayList, currentIndex]);

  if (!isVisible || displayList.length === 0) return null;

  const current = displayList[currentIndex] || displayList[0];

  return (
    <div
      id="church-announcement-ticker"
      className="bg-brand-brown text-white py-2 sm:py-2.5 px-3 relative overflow-hidden transition-all duration-300 border-b border-brand-gold/20"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4">
        {/* News Flash Badge - Only visible on sm and larger to maximize space on mobile */}
        <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="bg-brand-gold text-brand-brown font-display font-semibold px-1.5 py-0.5 rounded text-[10px] sm:text-xs uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Megaphone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Notice
          </span>
        </div>

        {/* Dynamic Announcement Ticker Text */}
        <div className="flex-1 overflow-hidden relative flex items-center justify-center py-0.5 min-w-0">
          <div
            key={current.id}
            className="text-[11px] min-[390px]:text-xs md:text-sm font-sans font-medium tracking-wide text-brand-cream/90 text-center animate-fade-in leading-relaxed flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5"
          >
            <span>{current.text}</span>
            {current.linkText && current.targetView && (
              <button
                onClick={() => onNavigate(current.targetView!)}
                className="text-brand-gold hover:text-white font-bold cursor-pointer underline inline-flex items-center gap-0.5 text-[10px] min-[390px]:text-xs whitespace-nowrap transition-colors"
              >
                {current.linkText} <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
              </button>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="text-brand-cream/60 hover:text-white p-0.5 rounded-full transition-colors cursor-pointer shrink-0"
          title="Dismiss"
          aria-label="Dismiss Announcement"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Underline progress meter simulated */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-brand-gold w-full origin-left animate-[shrink_6000ms_linear_infinite]" />
    </div>
  );
}
