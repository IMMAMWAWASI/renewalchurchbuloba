import React, { useState, useEffect } from "react";
import { Radio, Calendar, Flame, Play } from "lucide-react";

interface LiveBannerProps {
  onWatchOnline: () => void;
}

export default function LiveBanner({ onWatchOnline }: LiveBannerProps) {
  const [isLive, setIsLive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    // Sundays 10:30 AM - 1:00 PM are active.
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday
      const hour = now.getHours();
      const min = now.getMinutes();

      let active = false;

      const totalMin = hour * 60 + min;

      // Sunday 10:30 AM to 1:00 PM
      if (day === 0 && totalMin >= 10 * 60 + 30 && totalMin <= 13 * 60) {
        active = true;
      }

      setIsLive(active);

      if (!active) {
        // Calculate time to next service on Sunday.
        const nextService = new Date();
        nextService.setSeconds(0);
        nextService.setMilliseconds(0);

        if (day === 0 && totalMin < 10 * 60 + 30) {
          nextService.setHours(10, 30);
        } else {
          // Calculate days until next Sunday
          const daysUntilSunday = 7 - day;
          nextService.setDate(now.getDate() + daysUntilSunday);
          nextService.setHours(10, 30);
        }

        const diffMs = nextService.getTime() - now.getTime();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        if (diffHrs > 24) {
          const daysLeft = Math.ceil(diffHrs / 24);
          setTimeRemaining(`${daysLeft} days until next gather`);
        } else {
          setTimeRemaining(`Next assembly in ${diffHrs}h ${diffMins}m`);
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="live-status-banner"
      className="bg-brand-cream border-b border-brand-brown/10 py-2 px-4 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-sans text-xs sm:text-sm">
        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          {isLive ? (
            <div className="flex items-center gap-2">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600"></span>
              </span>
              <span className="font-bold text-red-600 uppercase tracking-widest flex items-center gap-1.5 font-display">
                <Radio className="w-4 h-4" /> Live Broadcast Active
              </span>
              <span className="text-brand-charcoal-light font-medium hidden md:inline">
                - Join our 10:30 AM Worship Service online!
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-brand-brown/80">
              <Calendar className="w-4 h-4 text-brand-gold shrink-0" />
              <span className="font-semibold font-display tracking-wide">
                Renewal Buloba Online
              </span>
              <span className="text-brand-charcoal-light font-medium bg-brand-gold/10 px-2 py-0.5 rounded-full text-xxs font-mono">
                {timeRemaining}
              </span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {isLive ? (
            <a
              href="https://www.facebook.com/RenewalChurchBuloba"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white font-display font-semibold px-4 py-1.5 rounded-full shadow text-xs sm:text-sm cursor-pointer transition-all duration-200 flex items-center gap-2 animate-pulse"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Watch Live Service
            </a>
          ) : (
            <button
              onClick={onWatchOnline}
              className="text-brand-brown hover:text-brand-gold font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Flame className="w-4 h-4 text-brand-gold" /> Check Recent Sermons
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
