import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Play, 
  HeartHandshake, 
  Sparkles, 
  Music, 
  Flame, 
  Compass, 
  MapPin, 
  CalendarDays,
  Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

interface HeroProps {
  onNavigate: (view: string) => void;
  onOpenPlanVisit: () => void;
}

interface Slide {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  linkView: string;
  detail: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
}

const slides: Slide[] = [
  {
    id: "mens-breakfast",
    badge: "🍳 Men's Breakfast Gathering",
    title: "Men's Breakfast Gathering",
    description: "Saturate your Saturday morning in fervent prayer, rich brotherhood fellowship, and a hearty warm breakfast.",
    image: img("MEN GATHER.jpeg"),
    linkView: "ministries",
    detail: "Saturdays: 8:00 AM Onwards",
    objectPosition: "center"
  },
  {
    id: "prayer",
    badge: "🔥 Altar Intercession & Prayer",
    title: "Prayer & Intercession",
    description: "We gather weekly to pray for families, our community, and the nation. Join our Friday overnights.",
    image: img("PRAYER.jpeg"),
    linkView: "prayer",
    detail: "Intercession: Fridays 10:00 PM Onwards",
    objectPosition: "center 25%"
  },
  {
    id: "wow",
    badge: "👑 Women of Worth (WOW)",
    title: "Women of Worth (WOW)",
    description: "Empowering ladies of faith to grow in spiritual authority, family leadership, and enterprise.",
    image: img("women gatherings.jpeg"),
    linkView: "ministries",
    detail: "First Saturday of the Month: 10:00 AM",
    objectPosition: "center"
  },
  {
    id: "choir",
    badge: "🎵 Active Choir & Praise Team",
    title: "Renewal Choir",
    description: "Join us in sweet Ugandan praise and live ministering harmonies. Our choir practices every Saturday evening.",
    image: img("Talent praise.jpeg"),
    linkView: "ministries",
    detail: "Practice: Saturdays 6:00 PM - 10:00 PM",
    objectPosition: "center 30%"
  },
  {
    id: "sermon",
    badge: "🎙️ Sunday Sermons & Preaching",
    title: "Sunday Sermons",
    description: "Hear inspiring, life-changing Bible lessons preached weekly to build your faith.",
    image: img("Sermons preaching.jpeg"),
    linkView: "sermons",
    detail: "Sundays: 10:30 AM - 1:00 PM",
    objectPosition: "center 25%"
  },
  {
    id: "congregation",
    badge: "📖 Fervent Word & Devotion",
    title: "A Growing Congregation",
    description: "Our massive church family gathered in unity, deeply focused and listening to the life-giving Word of God.",
    image: img("People.jpeg"),
    linkView: "about",
    detail: "Over 600+ Active Members",
    objectPosition: "center 25%",
    objectFit: "contain"
  }
];

export default function Hero({ onNavigate, onOpenPlanVisit }: HeroProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [eqHeights, setEqHeights] = useState<number[]>([15, 30, 45, 25, 10, 35, 50, 20]);
  const [isHovered, setIsHovered] = useState(false);

  // Audio equalizer bars effect when active slide is the Choir slide
  useEffect(() => {
    if (slides[activeSlideIndex]?.id !== "choir") return;
    const interval = setInterval(() => {
      setEqHeights(prev => prev.map(() => Math.floor(Math.random() * 40) + 10));
    }, 150);
    return () => clearInterval(interval);
  }, [activeSlideIndex]);

  // Automated slideshow cycle (5.5s intervals, pauses when user hovers to read details)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveSlideIndex(prev => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const activeData = slides[activeSlideIndex];

  return (
    <header
      id="home-hero-section"
      className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center bg-gradient-to-b from-brand-cream to-brand-cream/60 text-brand-brown overflow-hidden pt-8 pb-10 sm:pt-10 sm:pb-12 md:pt-12 md:pb-14 lg:pt-14 lg:pb-16 border-b border-brand-brown/5 text-left"
    >
      {/* Decorative Warm Ambient Glow Orbs */}
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[35%] h-[45%] bg-brand-brown/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column with Premium Staggered Animations */}
          <motion.div 
            className="lg:col-span-5 space-y-5 lg:space-y-6 select-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Soft welcome pill badge */}
            <motion.div 
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-brand-gold/15 text-brand-brown text-[10px] sm:text-xs font-mono font-extrabold uppercase px-3 py-1.5 rounded-full border border-brand-gold/30 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-brand-brown fill-current text-[#E2A600]" /> 
                Welcome to Renewal Church Buloba
              </span>
            </motion.div>
            
            {/* Expressive Editorial Typography */}
            <div className="space-y-4">
              <h1 className="font-serif text-5xl sm:text-[4.5rem] font-extrabold tracking-tight text-brand-brown leading-[0.9] sm:leading-[0.85]">
                Welcome <br />
                <span className="relative inline-block text-brand-brown-light italic font-light">
                  Home.
                  <span className="absolute left-0 bottom-1.5 w-full h-[6px] bg-[#E2A600]/25 rounded" />
                </span>
              </h1>

              <p className="font-sans text-sm sm:text-base text-brand-charcoal-light leading-relaxed font-light max-w-lg">
                We are Christ-like people transforming society, a satelite of Gaba Community Church also called GCC in Buloba.
                <span className="block mt-2">
                  We Started in Jan 25 2015 as a direct satelite campus under Pr.Renson who is a member of the pastoral team and staff at Gaba Community Church (<a href="https://www.gabachurch.org/" target="_blank" rel="noopener noreferrer" className="text-brand-brown font-semibold underline hover:text-brand-gold transition-colors">https://www.gabachurch.org/</a>).
                </span>
              </p>
            </div>

            {/* Micro Call-to-actions buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-1">
              <button
                onClick={onOpenPlanVisit}
                className="px-8 py-4 bg-brand-brown text-white hover:bg-brand-brown-light font-display font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-brand-brown/10 transition-all active:scale-97 cursor-pointer hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" /> Plan Your Visit
              </button>
              
              <button
                onClick={() => onNavigate("sermons")}
                className="px-8 py-4 border-2 border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white font-display font-extrabold text-xs uppercase tracking-widest rounded-2xl transition-all active:scale-97 cursor-pointer hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Watch Sermons <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Weekly Services Timings Section */}
            <div className="pt-5 lg:pt-6 border-t border-brand-brown/10 space-y-3 md:space-y-3.5" id="weekly-services-hero-grid">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#E2A600]">
                  🗓️ WEEKLY SERVICES & GATHERINGS
                </span>
                <div className="h-[1px] flex-grow bg-brand-brown/10"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                {/* Sunday Card: Left */}
                <div className="sm:col-span-5 flex flex-col justify-between bg-white/95 backdrop-blur-md border border-brand-brown/10 p-5 rounded-[2rem] shadow-sm hover:shadow-md transition-all group/sun duration-300">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-[#E2A600]/10 p-2 rounded-xl text-brand-brown shrink-0 group-hover/sun:bg-[#E2A600] group-hover/sun:text-white transition-colors">
                        <CalendarDays className="w-5 h-5 text-[#E2A600] group-hover/sun:text-white transition-colors" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-brand-brown uppercase tracking-wider block">
                        SUNDAYS
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] font-mono font-bold text-brand-brown-light uppercase tracking-widest">
                        Main Celebration Service
                      </span>
                      <strong className="block text-lg sm:text-xl font-serif text-brand-brown font-extrabold leading-tight">
                        10:30 AM - 1:00 PM
                      </strong>
                    </div>
                  </div>
                  <p className="text-[11px] text-brand-charcoal-light/80 font-sans mt-3 leading-relaxed">
                    Come lift up the name of Jesus with multi-part harmonies, fellowship, and live bible teaching.
                  </p>
                </div>

                {/* Midweek / Sat Cards Stack: Right */}
                <div className="sm:col-span-7 bg-white/95 backdrop-blur-md border border-brand-brown/10 p-5 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-[#E2A600]/10 p-2 rounded-xl text-brand-brown shrink-0">
                        <Flame className="w-5 h-5 text-[#E2A600]" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-brand-brown uppercase tracking-wider">
                        Weekly Assemblies & Practices
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 pt-1">
                      {/* Tuesday discipleship */}
                      <div className="flex items-start gap-2 text-xs">
                        <span className="font-mono text-[9px] font-bold bg-brand-brown/5 text-brand-brown px-1.5 py-0.5 rounded uppercase shrink-0 mt-0.5">
                          TUE
                        </span>
                        <div>
                          <strong className="block font-serif font-bold text-brand-brown text-[11px] leading-tight">
                            Tuesday Discipleship Classes
                          </strong>
                          <span className="block text-[10px] text-brand-charcoal-light font-mono leading-tight mt-0.5">
                            5:00 PM - 6:00 PM
                          </span>
                        </div>
                      </div>

                      {/* Wednesday prayer */}
                      <div className="flex items-start gap-2 text-xs">
                        <span className="font-mono text-[9px] font-bold bg-brand-brown/5 text-brand-brown px-1.5 py-0.5 rounded uppercase shrink-0 mt-0.5">
                          WED
                        </span>
                        <div>
                          <strong className="block font-serif font-bold text-brand-brown text-[11px] leading-tight">
                            Wednesday Midweek Prayer
                          </strong>
                          <span className="block text-[10px] text-brand-charcoal-light font-mono leading-tight mt-0.5">
                            5:00 PM - 7:00 PM
                          </span>
                        </div>
                      </div>

                      {/* Friday overnight */}
                      <div className="flex items-start gap-2 text-xs">
                        <span className="font-mono text-[9px] font-bold bg-brand-brown/5 text-brand-brown px-1.5 py-0.5 rounded uppercase shrink-0 mt-0.5">
                          FRI
                        </span>
                        <div>
                          <strong className="block font-serif font-bold text-brand-brown text-[11px] leading-tight">
                            Friday Overnight Prayer
                          </strong>
                          <span className="block text-[10px] text-brand-charcoal-light font-mono leading-tight mt-0.5">
                            10:00 PM Onwards
                          </span>
                        </div>
                      </div>

                      {/* Saturday Choir */}
                      <div className="flex items-start gap-2 text-xs">
                        <span className="font-mono text-[9px] font-bold bg-[#E2A600]/10 text-[#E2A600] px-1.5 py-0.5 rounded uppercase shrink-0 mt-0.5">
                          SAT
                        </span>
                        <div>
                          <strong className="block font-serif font-bold text-brand-brown text-[11px] leading-tight">
                            Choir Practices
                          </strong>
                          <span className="block text-[10px] text-brand-charcoal-light font-mono leading-tight mt-0.5">
                            6:00 PM - 10:00 PM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Right Column: Stunning Interactive Bento Facet Switcher with Immersive Slideshow */}
          <motion.div 
            className="lg:col-span-7 w-full"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          >
            {/* Visual Grid Container */}
            <div className="grid grid-cols-12 gap-5 h-auto sm:h-[480px]">
              
              {/* Dynamic Featured Spotlight (Left Bento Area - Col Span 12 sm:col-span-8) */}
              <div 
                className="col-span-12 sm:col-span-8 bg-brand-brown rounded-[2rem] overflow-hidden shadow-2xl relative border border-brand-brown/10 h-[360px] sm:h-full flex flex-col justify-end p-6 md:p-8 select-none group cursor-pointer transition-all duration-500 hover:shadow-brand-brown/15 hover:border-brand-gold/30"
                id="interactive-spotlight-card"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => onNavigate(activeData.linkView)}
                title={`Click to view full ${activeData.id} details!`}
              >
                {/* Visual Backdrop Overlay with cross-fade animation (div:nth-of-type(1)) */}
                <div className="absolute inset-0 z-0">
                  <AnimatePresence>
                    <motion.img
                      key={activeSlideIndex}
                      src={activeData.image}
                      alt={activeData.title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 0.7, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className={`absolute inset-0 w-full h-full mix-blend-luminosity filter saturate-125 transition-transform duration-700 group-hover:scale-105 ${
                        activeData.objectFit === "contain" ? "object-contain bg-brand-brown/40 p-1" : "object-cover"
                      }`}
                      style={{ objectPosition: activeData.objectPosition || "center" }}
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-brand-brown/50 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-brand-brown/20 pointer-events-none" />
                </div>

                {/* Floating micro indicators embedded inside (div:nth-of-type(2)) */}
                <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between pointer-events-none">
                  <span className="bg-brand-brown/95 shadow text-white font-mono text-[9px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/10 flex items-center gap-1.5 pointer-events-auto">
                    {activeData.badge}
                  </span>
                  
                  <div className="flex gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 pointer-events-auto">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSlideIndex(idx);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          idx === activeSlideIndex ? "bg-brand-gold w-3.5" : "bg-white/40 hover:bg-white/80"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Dynamic details section (div:nth-of-type(3)) */}
                <div className="relative z-10 space-y-4 mt-auto">
                  
                  {/* Text Header + Description Container (div:nth-of-type(1) inside div:nth-of-type(3)) */}
                  <div className="space-y-1.5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSlideIndex}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-1"
                      >
                        <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-white leading-tight">
                          {activeData.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-brand-cream/85 font-sans leading-relaxed font-light">
                          {activeData.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Secondary timing row + visualizers (div:nth-of-type(2) inside div:nth-of-type(3)) */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="font-mono text-[9px] text-[#E2A600] font-extrabold tracking-wider uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E2A600] animate-ping" />
                      {activeData.detail}
                    </span>

                    {activeData.id === "choir" ? (
                      <div className="flex items-end gap-1 h-5 pt-1">
                        <Volume2 className="w-3.5 h-3.5 text-brand-gold" />
                        {eqHeights.map((ht, i) => (
                          <div 
                            key={i} 
                            className="w-0.5 bg-brand-gold rounded-full transition-all duration-150" 
                            style={{ height: `${ht}%` }}
                          />
                        ))}
                        <span className="text-[9px] font-mono text-brand-gold tracking-widest uppercase ml-1.5 font-bold group-hover:text-white transition-colors">
                          See Choir ↗
                        </span>
                      </div>
                    ) : (
                      <span className="text-[9px] font-mono text-brand-gold tracking-widest uppercase font-bold group-hover:text-white transition-colors">
                        View Details ↗
                      </span>
                    )}
                  </div>

                  {/* Slide Progress Bar Indicator */}
                  <div className="w-full h-[2px] bg-white/15 rounded-full overflow-hidden">
                    <motion.div
                      key={activeSlideIndex + (isHovered ? "-paused" : "-active")}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: isHovered ? 0 : 5.5, ease: "linear" }}
                      className="h-full bg-brand-gold"
                    />
                  </div>

                </div>
              </div>

              {/* Bento Switch Controllers (Right Area - Col Span 12 sm:col-span-4) */}
              <div className="col-span-12 sm:col-span-4 flex flex-col gap-3 h-auto sm:h-full">
                
                {/* Worship & Choir button link */}
                <button
                  onClick={() => onNavigate("ministries")}
                  className="flex-1 rounded-[2rem] p-4 text-left flex flex-col justify-between border bg-white/95 text-brand-brown hover:bg-brand-cream border-brand-brown/10 hover:border-[#E2A600]/40 shadow-md group/side outline-none transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 focus:ring-2 focus:ring-[#E2A600]/25 cursor-pointer select-none active:scale-97"
                  title="Explore Worship, Choir and Media departments"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold text-brand-brown-light block">
                      Worship & Media
                    </span>
                    <div className="p-1.5 rounded-full bg-brand-brown/5 text-brand-brown group-hover/side:bg-[#E2A600]/10 group-hover/side:text-[#E2A600] transition-colors">
                      <Music className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <p className="font-serif text-[11px] leading-tight font-extrabold text-brand-brown group-hover/side:text-[#E2A600] transition-colors flex items-center gap-1.5">
                      Choir & Tech teams ↗
                    </p>
                    <p className="text-[9px] font-sans text-brand-charcoal-light leading-normal line-clamp-2">
                      Join rehearsals, support pristine sound masterclasses, or serve in public media streams.
                    </p>
                  </div>
                </button>

                {/* Prayer Wall button link */}
                <button
                  onClick={() => onNavigate("prayer")}
                  className="flex-1 rounded-[2rem] p-4 text-left flex flex-col justify-between border bg-white/95 text-brand-brown hover:bg-brand-cream border-brand-brown/10 hover:border-[#E2A600]/40 shadow-md group/side outline-none transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 focus:ring-2 focus:ring-[#E2A600]/25 cursor-pointer select-none active:scale-97"
                  title="View joint prayer altars and prayer request wall"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold text-brand-brown-light block">
                      Intercessory Altars
                    </span>
                    <div className="p-1.5 rounded-full bg-brand-brown/5 text-brand-brown group-hover/side:bg-[#E2A600]/10 group-hover/side:text-[#E2A600] transition-colors">
                      <Flame className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <p className="font-serif text-[11px] leading-tight font-extrabold text-brand-brown group-hover/side:text-[#E2A600] transition-colors flex items-center gap-1.5">
                      Fervent Altar Prayers ↗
                    </p>
                    <p className="text-[9px] font-sans text-brand-charcoal-light leading-normal line-clamp-2">
                      Access physical Friday overnights, daily 5:00 AM telephone devotionals, or submit request list.
                    </p>
                  </div>
                </button>

                {/* Cell map button link */}
                <button
                  onClick={() => onNavigate("lifegroups")}
                  className="flex-1 rounded-[2rem] p-4 text-left flex flex-col justify-between border bg-white/95 text-brand-brown hover:bg-brand-cream border-brand-brown/10 hover:border-[#E2A600]/40 shadow-md group/side outline-none transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 focus:ring-2 focus:ring-[#E2A600]/25 cursor-pointer select-none active:scale-97"
                  title="Find a neighborhood home cell group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold text-brand-brown-light block">
                      Cell Fellowships
                    </span>
                    <div className="p-1.5 rounded-full bg-brand-brown/5 text-brand-brown group-hover/side:bg-[#E2A600]/10 group-hover/side:text-[#E2A600] transition-colors">
                      <Compass className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <p className="font-serif text-[11px] leading-tight font-extrabold text-brand-brown group-hover/side:text-[#E2A600] transition-colors flex items-center gap-1.5">
                      6 Buloba Cells Map ↗
                    </p>
                    <p className="text-[9px] font-sans text-brand-charcoal-light leading-normal line-clamp-2">
                      Locate close home cells, read schedules, or contact cell coordinators near you.
                    </p>
                  </div>
                </button>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </header>
  );
}
