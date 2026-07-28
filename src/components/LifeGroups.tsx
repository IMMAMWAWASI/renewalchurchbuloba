import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Users, Sparkles, Pause, Play, Heart, Send, CheckCircle2, MessageSquare, MapPin, Phone, User } from "lucide-react";

const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

interface CellSlide {
  id: number;
  url: string;
  title: string;
  subtitle: string;
  description: string;
}

const CELL_SLIDES: CellSlide[] = [
  {
    id: 1,
    url: img("ladies in cell (1).jpeg"),
    title: "Women's Home Cell Fellowship",
    subtitle: "Living Room Worship & Discipleship",
    description: "Sisters in Buloba gathering midweek in neighborhood homes to pray, study the Scriptures, and encourage one another."
  },
  {
    id: 2,
    url: img("ladies in cell (2).jpeg"),
    title: "Sisterhood Prayer & Intercession",
    subtitle: "Standing in Faith Together",
    description: "Warm cell meetings focused on personal prayer, community intercession, and uplifting families across Buloba."
  },
  {
    id: 3,
    url: img("ladies in cell (3).jpeg"),
    title: "Word & Devotional Reflection",
    subtitle: "Unpacking Sunday Teachings",
    description: "Deepening spiritual roots through guided Bible discussions, practical life application, and group reflection."
  },
  {
    id: 4,
    url: img("ladies in cell (4).jpeg"),
    title: "Cell Fellowship & Tea Time",
    subtitle: "Joyful Hospitality & Laughter",
    description: "Sharing light refreshments, personal testimonies, and genuine warmth in welcoming home settings."
  },
  {
    id: 5,
    url: img("ladies in cell (5).jpeg"),
    title: "Midweek Fellowship & Hospitality",
    subtitle: "Growth & Connection in Buloba",
    description: "Connecting closely in small groups to experience the power of intimate Christian community."
  }
];

export default function LifeGroups() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
    preferredTime: "Wednesday 5:00 PM",
    note: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [lastSubmittedUrl, setLastSubmittedUrl] = useState("");
  const [lastSubmittedName, setLastSubmittedName] = useState("");

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CELL_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CELL_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CELL_SLIDES.length) % CELL_SLIDES.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.village.trim()) return;

    const whatsappNumber = "256709634182";
    let messageText = `Hello! My name is ${formData.name.trim()} from ${formData.village.trim()}.\nI would like to join a Home Cell Group in Buloba.\n📞 Mobile: ${formData.phone.trim()}\n⏰ Preferred Time: ${formData.preferredTime}`;
    if (formData.note.trim()) {
      messageText += `\n📝 Note: ${formData.note.trim()}`;
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

    // Save to local storage
    const existing = JSON.parse(localStorage.getItem("women_cell_requests") || "[]");
    localStorage.setItem(
      "women_cell_requests",
      JSON.stringify([{ ...formData, date: new Date().toLocaleDateString() }, ...existing])
    );

    setLastSubmittedName(formData.name.trim());
    setLastSubmittedUrl(whatsappUrl);
    setSubmitted(true);

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // Reset form
    setFormData({
      name: "",
      phone: "",
      village: "",
      preferredTime: "Wednesday 5:00 PM",
      note: ""
    });
  };

  const activeSlide = CELL_SLIDES[currentIndex];

  return (
    <section id="church-lifegroups-section" className="py-16 sm:py-20 bg-brand-cream/30 border-y border-brand-brown/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-brand-brown/10 text-brand-brown text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-brand-brown/15">
            <Users className="w-4 h-4 text-brand-gold shrink-0" />
            We Grow Together
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-brown">
            HOME CELL GATHERINGS
          </h2>
          <p className="text-sm sm:text-base text-brand-charcoal-light leading-relaxed font-light">
            Experience intimate fellowship and spiritual growth through our home cell gatherings. Believers across Buloba meet midweek in neighborhood homes to pray, study God's Word, break bread, and build enduring community bonds.
          </p>
        </div>

        {/* 2-Column Layout: Slideshow + Join Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Slideshow */}
          <div className="lg:col-span-7 flex flex-col bg-brand-brown rounded-3xl overflow-hidden border border-brand-gold/20 shadow-2xl relative group">
            
            {/* Main Image View - Flex-1 to dynamically expand without leaving brown gaps on wide screens */}
            <div className="relative flex-1 min-h-[320px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[460px] w-full overflow-hidden bg-black/40">
              <AnimatePresence>
                <motion.img
                  key={activeSlide.id}
                  src={activeSlide.url}
                  alt={activeSlide.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/95 via-brand-charcoal/30 to-transparent" />

              {/* Top Bar: Play/Pause & Counter */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="bg-brand-charcoal/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-brand-gold font-mono text-xs font-bold flex items-center gap-2 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{String(currentIndex + 1).padStart(2, '0')} / {String(CELL_SLIDES.length).padStart(2, '0')}</span>
                </div>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-brand-charcoal/80 hover:bg-brand-brown text-white p-2.5 rounded-full border border-white/10 transition-colors shadow-md cursor-pointer"
                  title={isPlaying ? "Pause auto-slide" : "Play auto-slide"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 text-brand-gold" /> : <Play className="w-4 h-4 text-brand-gold" />}
                </button>
              </div>

              {/* Left / Right Nav Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-brand-brown text-white p-2.5 sm:p-3 rounded-full border border-white/20 transition-all duration-200 hover:scale-110 shadow-lg cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-brand-brown text-white p-2.5 sm:p-3 rounded-full border border-white/20 transition-all duration-200 hover:scale-110 shadow-lg cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Active Slide Content Card */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 z-10 text-left text-white max-w-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-1.5"
                  >
                    <span className="inline-flex items-center gap-1.5 text-brand-gold font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-brand-gold/20">
                      <Heart className="w-3 h-3 fill-brand-gold text-brand-gold" />
                      {activeSlide.subtitle}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
                      {activeSlide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-cream/90 leading-relaxed font-light pt-0.5 line-clamp-2 sm:line-clamp-none">
                      {activeSlide.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="shrink-0 bg-brand-charcoal p-3 sm:p-4 border-t border-white/10 overflow-x-auto scrollbar-thin scrollbar-thumb-brand-gold/20">
              <div className="flex items-center gap-2.5 min-w-max mx-auto justify-center">
                {CELL_SLIDES.map((slide, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsPlaying(false);
                      }}
                      className={`relative w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "ring-2 ring-brand-gold scale-105 opacity-100 shadow-md"
                          : "opacity-50 hover:opacity-85 hover:scale-100"
                      }`}
                    >
                      <img
                        src={slide.url}
                        alt={slide.title}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-brand-gold/20 pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Direct WhatsApp Cell Group Join Form */}
          <div className="lg:col-span-5 bg-brand-brown text-white rounded-3xl border border-brand-gold/25 p-6 sm:p-8 flex flex-col justify-between text-left shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-brand-gold font-mono text-[10px] font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-brand-gold/20">
                  <MessageSquare className="w-3.5 h-3.5 text-brand-gold" /> Direct Cell Connection
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white pt-1">
                  Join a Home Cell Group
                </h3>
                <p className="text-xs text-brand-cream/80 leading-relaxed">
                  Enter your details below to request a cell group in your neighborhood. Submitting will send your request directly to our Cell Leader.
                </p>
              </div>

              {submitted ? (
                <div className="bg-white/10 backdrop-blur-md border border-brand-gold/30 p-6 rounded-2xl text-center space-y-4 animate-scale-up my-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg font-bold text-brand-gold">
                      Request Submitted, {lastSubmittedName}!
                    </h4>
                    <p className="text-xs text-brand-cream/90 leading-relaxed">
                      We have prepared your cell group request. Click the button below to connect with our Cell Leader right away.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <a
                      href={lastSubmittedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer shadow-lg hover:scale-[1.01]"
                    >
                      <Send className="w-4 h-4 fill-current text-white shrink-0" />
                      Send Request
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="w-full text-[10px] uppercase font-mono tracking-wider text-brand-cream/70 hover:text-brand-gold transition-colors py-1 cursor-pointer"
                    >
                      ← Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1 font-display flex items-center gap-1">
                      <User className="w-3 h-3 text-brand-gold" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Namubiru"
                      className="w-full text-xs font-sans p-2.5 rounded-xl bg-white/10 border border-white/15 focus:border-brand-gold focus:outline-none text-white placeholder-white/40 transition-colors"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1 font-display flex items-center gap-1">
                      <Phone className="w-3 h-3 text-brand-gold" /> Mobile Phone (Uganda) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0700 000 000 / 0770 000 000"
                      className="w-full text-xs font-sans p-2.5 rounded-xl bg-white/10 border border-white/15 focus:border-brand-gold focus:outline-none text-white placeholder-white/40 transition-colors"
                    />
                  </div>

                  {/* Village / Sector */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1 font-display flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-gold" /> Village / Sector in Buloba *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      placeholder="e.g. Buloba Trading Center, Forest Ridge, Nsuube"
                      className="w-full text-xs font-sans p-2.5 rounded-xl bg-white/10 border border-white/15 focus:border-brand-gold focus:outline-none text-white placeholder-white/40 transition-colors"
                    />
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1 font-display">
                      Preferred Meeting Day / Time
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full text-xs font-sans p-2.5 rounded-xl bg-brand-brown border border-white/15 text-white font-semibold focus:outline-none focus:border-brand-gold cursor-pointer"
                    >
                      <option value="Wednesday 5:00 PM">Wednesday 5:00 PM (Standard Cell)</option>
                      <option value="Friday Evening">Friday Evening</option>
                      <option value="Weekend Saturday/Sunday">Weekend (Saturday / Sunday)</option>
                      <option value="Any Midweek Evening">Any Midweek Evening</option>
                    </select>
                  </div>

                  {/* Optional Note */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1 font-display">
                      Additional Message / Prayer Request (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder="e.g. I would love a cell group near Africa Renewal University..."
                      className="w-full text-xs font-sans p-2.5 rounded-xl bg-white/10 border border-white/15 focus:border-brand-gold focus:outline-none text-white placeholder-white/40 resize-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-xs rounded-xl cursor-pointer shadow-lg transition-all duration-150 flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-4 h-4 fill-current text-white" />
                    Send Request
                  </button>
                </form>
              )}

            </div>

            {/* Footer Trust Note */}
            <div className="pt-4 border-t border-white/10 mt-4 text-[10px] text-brand-cream/60 flex items-center justify-between">
              <span>🔒 Privacy guaranteed</span>
              <span>Buloba Cell Network</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


