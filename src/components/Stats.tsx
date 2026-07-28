import React, { useState, useEffect } from "react";
import { Trees, Globe, UserCheck, HeartHandshake, Wheat } from "lucide-react";

interface StatsProps {
  onNavigate?: (view: string) => void;
}

export default function Stats({ onNavigate }: StatsProps) {
  const [counts, setCounts] = useState({
    members: 70,
    ministries: 1,
    groups: 1,
    projects: 1,
  });

  // Simple clean timer to count up numbers smoothly when looking at it
  useEffect(() => {
    const timer = setInterval(() => {
      setCounts((prev) => {
        const nextMembers = prev.members < 600 ? prev.members + 25 : 600;
        const nextMinistries = prev.ministries < 8 ? prev.ministries + 1 : 8;
        const nextGroups = prev.groups < 12 ? prev.groups + 1 : 12;
        const nextProjects = prev.projects < 6 ? prev.projects + 1 : 6;

        if (
          nextMembers === 600 &&
          nextMinistries === 8 &&
          nextGroups === 12 &&
          nextProjects === 6
        ) {
          clearInterval(timer);
        }

        return {
          members: nextMembers,
          ministries: nextMinistries,
          groups: nextGroups,
          projects: nextProjects,
        };
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="theme-harvest-section"
      className="py-16 md:py-24 bg-brand-cream relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 opacity-5 pointer-events-none">
        <Wheat className="w-96 h-96 text-brand-brown" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2026 Scripture Graphic Banner */}
        <div className="bg-brand-brown text-brand-cream p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden mb-16 border border-brand-gold/10">
          {/* Immersive Harvest Wheat Sunset Background Image */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1200&auto=format&fit=crop" 
              alt="Golden Wheat Harvest sunset"
              className="w-full h-full object-cover scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Multi-layered dark-to-gold rich overlay to maximize Bible verse contrast & readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/95 via-brand-brown/90 to-brand-brown/75" />
            <div className="absolute inset-0 bg-black/45 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#E2A600]/20 via-transparent to-transparent opacity-90" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Theme title */}
            <div className="lg:col-span-4 space-y-3">
              <span className="font-mono text-brand-gold text-xs font-bold tracking-widest uppercase">
                2026 Theme
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase leading-none">
                PREPARED <br />
                FOR A <br />
                <span className="text-brand-gold italic">HARVEST</span>
              </h2>
              <div className="h-1.5 w-24 bg-brand-gold rounded-full mt-2" />
            </div>

            {/* Bible quote */}
            <div className="lg:col-span-8 bg-black/15 p-6 md:p-8 rounded-2xl border border-white/10 relative shadow-inner">
              <span className="absolute top-2 left-4 text-7xl font-serif text-brand-gold/15 select-none font-extrabold">
                “
              </span>
              <p className="font-serif italic text-base sm:text-lg md:text-xl text-brand-cream/90 leading-relaxed pl-4 font-light">
                Do you not say, ‘There are still four months and then comes the harvest’? Behold, I say to you, lift up your eyes and look at the fields, for they are already white for harvest!
              </p>
              <div className="mt-4 text-right text-brand-gold text-xs sm:text-sm font-bold tracking-wider font-mono">
                — John 4:35 (NKJV)
              </div>
            </div>

          </div>
        </div>

        {/* Counter Stats Container */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center" id="theme-harvest-stats-grid">
          
          {/* Members */}
          <button
            onClick={() => onNavigate?.("about")}
            className="w-full bg-white p-6 rounded-3xl shadow-sm border border-brand-brown/5 flex flex-col items-center justify-center cursor-pointer outline-none group/card select-none transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#E2A600]/30 text-center focus:ring-2 focus:ring-[#E2A600]/25"
            title="Read about our spiritual family"
            id="stats-btn-members"
          >
            <div className="bg-brand-brown/5 p-3 rounded-full mb-3 text-brand-brown transition-colors duration-300 group-hover/card:bg-[#E2A600]/10 group-hover/card:text-[#E2A600]">
              <UserCheck className="w-6 h-6 text-brand-brown transition-transform duration-300 group-hover/card:scale-110" />
            </div>
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-brand-brown tracking-tight group-hover/card:text-[#E2A600] transition-colors">
              {counts.members === 600 ? "600+" : `${counts.members}+`}
            </span>
            <span className="font-display text-xs sm:text-sm text-brand-charcoal-light font-bold uppercase tracking-wider mt-1.5">
              Active Members
            </span>
            <span className="text-xxs text-brand-charcoal-light/60 mt-1">Administration & Servanthood</span>
            <span className="text-[10px] text-[#E2A600] font-bold font-mono uppercase mt-2 tracking-widest opacity-0 transform translate-y-1 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300">
              View Administration ↗
            </span>
          </button>

          {/* Ministries */}
          <button
            onClick={() => onNavigate?.("ministries")}
            className="w-full bg-white p-6 rounded-3xl shadow-sm border border-brand-brown/5 flex flex-col items-center justify-center cursor-pointer outline-none group/card select-none transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#E2A600]/30 text-center focus:ring-2 focus:ring-[#E2A600]/25"
            title="See all list of church ministries"
            id="stats-btn-ministries"
          >
            <div className="bg-brand-brown/5 p-3 rounded-full mb-3 text-brand-brown transition-colors duration-300 group-hover/card:bg-[#E2A600]/10 group-hover/card:text-[#E2A600]">
              <Globe className="w-6 h-6 text-brand-brown transition-transform duration-300 group-hover/card:scale-110" />
            </div>
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-brand-brown tracking-tight group-hover/card:text-[#E2A600] transition-colors">
              {counts.ministries} Active
            </span>
            <span className="font-display text-xs sm:text-sm text-brand-charcoal-light font-bold uppercase tracking-wider mt-1.5">
              Ministries
            </span>
            <span className="text-xxs text-brand-charcoal-light/60 mt-1 font-sans">Serving Every Age</span>
            <span className="text-[10px] text-[#E2A600] font-bold font-mono uppercase mt-2 tracking-widest opacity-0 transform translate-y-1 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300">
              See Ministries ↗
            </span>
          </button>

          {/* Life Groups */}
          <button
            onClick={() => onNavigate?.("lifegroups")}
            className="w-full bg-white p-6 rounded-3xl shadow-sm border border-brand-brown/5 flex flex-col items-center justify-center cursor-pointer outline-none group/card select-none transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#E2A600]/30 text-center focus:ring-2 focus:ring-[#E2A600]/25"
            title="Find life cell group in Buloba"
            id="stats-btn-lifegroups"
          >
            <div className="bg-brand-brown/5 p-3 rounded-full mb-3 text-brand-brown transition-colors duration-300 group-hover/card:bg-[#E2A600]/10 group-hover/card:text-[#E2A600]">
              <Wheat className="w-6 h-6 text-brand-gold transition-transform duration-300 group-hover/card:scale-110" />
            </div>
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-brand-brown tracking-tight group-hover/card:text-[#E2A600] transition-colors">
              {counts.groups} Groups
            </span>
            <span className="font-display text-xs sm:text-sm text-brand-charcoal-light font-bold uppercase tracking-wider mt-1.5">
              Home Life Groups
            </span>
            <span className="text-xxs text-brand-charcoal-light/60 mt-1 font-sans">Buloba Cell Network</span>
            <span className="text-[10px] text-[#E2A600] font-bold font-mono uppercase mt-2 tracking-widest opacity-0 transform translate-y-1 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300">
              Find a Cell ↗
            </span>
          </button>

          {/* Projects */}
          <button
            onClick={() => onNavigate?.("ministries")}
            className="w-full bg-white p-6 rounded-3xl shadow-sm border border-brand-brown/5 flex flex-col items-center justify-center cursor-pointer outline-none group/card select-none transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#E2A600]/30 text-center focus:ring-2 focus:ring-[#E2A600]/25"
            title="Sponsor or check outreach projects"
            id="stats-btn-outreach"
          >
            <div className="bg-brand-brown/5 p-3 rounded-full mb-3 text-brand-brown transition-colors duration-300 group-hover/card:bg-[#E2A600]/10 group-hover/card:text-[#E2A600]">
              <HeartHandshake className="w-6 h-6 text-brand-brown transition-transform duration-300 group-hover/card:scale-110" />
            </div>
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-brand-brown tracking-tight group-hover/card:text-[#E2A600] transition-colors">
              {counts.projects} Major
            </span>
            <span className="font-display text-xs sm:text-sm text-brand-charcoal-light font-bold uppercase tracking-wider mt-1.5">
              Outreach Projects
            </span>
            <span className="text-xxs text-brand-charcoal-light/60 mt-1 font-sans">Transforming Buloba</span>
            <span className="text-[10px] text-[#E2A600] font-bold font-mono uppercase mt-2 tracking-widest opacity-0 transform translate-y-1 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300">
              Browse Outreach ↗
            </span>
          </button>

        </div>

      </div>
    </section>
  );
}
