import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Music, 
  Quote, 
  Sparkles, 
  Facebook,
  X,
  FileCheck2,
  ExternalLink
} from "lucide-react";
import Logo from "./Logo";

const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

interface ChoirSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  songHighlight: string;
  category: string;
  verseText: string;
  verseRef: string;
}

interface PopularSong {
  id: string;
  title: string;
  artist: string;
  tag: "International" | "Local Ugandan";
}

const POPULAR_GOSPEL_SONGS: PopularSong[] = [
  {
    id: "ps-1",
    title: "Praise",
    artist: "Elevation Worship",
    tag: "International"
  },
  {
    id: "ps-2",
    title: "Lengera Ekyaalo",
    artist: "Pastor Wilson Bugembe",
    tag: "Local Ugandan"
  },
  {
    id: "ps-3",
    title: "Goodness of God",
    artist: "CeCe Winans / Bethel Music",
    tag: "International"
  },
  {
    id: "ps-4",
    title: "Kani (Katonda W'abanaku)",
    artist: "Pastor Wilson Bugembe",
    tag: "Local Ugandan"
  },
  {
    id: "ps-5",
    title: "Way Maker",
    artist: "Sinach",
    tag: "International"
  },
  {
    id: "ps-6",
    title: "Tebalina Mpadde",
    artist: "Pastor Wilson Bugembe",
    tag: "Local Ugandan"
  }
];

const CHOIR_SLIDES: ChoirSlide[] = [
  {
    id: "choir-slide-1",
    image: img("Logos praise.jpeg"),
    title: "The Renewal Voices",
    subtitle: "Ministering through deep praise and multi-part harmonies",
    songHighlight: "Praise (Elevation Worship) & Local Medleys",
    category: "Main Congregation Assembly Choir",
    verseText: "I will sing to the Lord as long as I live; I will sing praise to my God while I have my being.",
    verseRef: "Psalm 104:33"
  },
  {
    id: "choir-slide-2",
    image: img("Talent praise.jpeg"),
    title: "Praise & Worship Sundays",
    subtitle: "Beautiful Sunday Praise and worship from our choir and worship team",
    songHighlight: "Lengera Ekyaalo & Sunday Adoration",
    category: "Worship Rehearsals & Devotions",
    verseText: "Sing to Him a new song; play skillfully with a loud noise of joy.",
    verseRef: "Psalm 33:3"
  },
  {
    id: "choir-slide-3",
    image: img("David choir.jpeg"),
    title: "Our Instrumentalists Team",
    subtitle: "Dedicated musicians crafting beautiful chords and steady rhythms to lead us in worship",
    songHighlight: "Sowing in Righteousness & Worship Chords",
    category: "Outdoor Evangelism Music Group",
    verseText: "Let the word of Christ dwell in you richly... singing with grace in your hearts to the Lord.",
    verseRef: "Colossians 3:16"
  },
  {
    id: "choir-slide-4",
    image: img("section youth.jpeg"),
    title: "Youth Harmonies",
    subtitle: "A vibrant team of young voices sharing modern praise and growing together in faith",
    songHighlight: "Youth Praise & Way Maker Medley",
    category: "Youth Ministry Music Team",
    verseText: "Praise the Lord! For it is good to sing praises to our God; for praise is pleasant and beautiful.",
    verseRef: "Psalm 147:1"
  }
];

export default function ChoirSlideshow({ onNavigate }: ChoirSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  
  // Dynamic register popup
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);
  const [joinSubmitted, setJoinSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    voiceType: "Soprano",
    experience: "Some experience"
  });

  // Slideshow auto-rotation effect
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CHOIR_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CHOIR_SLIDES.length) % CHOIR_SLIDES.length);
  };

  // Submit enrollment
  const handleSubmitJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setJoinSubmitted(true);
    setTimeout(() => {
      setJoinSubmitted(false);
      setIsJoinModalOpen(false);
      setFormData({ name: "", phone: "", voiceType: "Soprano", experience: "Some experience" });
    }, 3500);
  };

  const activeSlide = CHOIR_SLIDES[currentIndex];

  return (
    <section 
      id="renewal-choir-section" 
      className="py-20 bg-gradient-to-b from-brand-cream/30 to-brand-cream px-4 sm:px-6 lg:px-8 border-t border-brand-brown/5 relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Editorial Heading Panel */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 pb-2 border-b border-brand-brown/10">
          <div className="text-left space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-brand-gold/15 text-brand-brown text-[10px] sm:text-xs font-mono font-extrabold uppercase px-3 py-1 rounded-full border border-brand-gold/30">
                ⭐ HEAVENLY MINISTRY STAGE
              </span>
              <div className="h-[1px] w-20 bg-brand-gold"></div>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-brand-brown tracking-tight leading-none">
              THE RENEWAL VOICES
            </h2>
            <p className="font-sans text-sm text-brand-charcoal-light leading-relaxed">
              Experience the beautiful melodies, heartfelt adoration, and vibrant rhythms of Renewal Church Buloba's Choir. Our singers devote their voices to cultivate refreshing praise and deep worship.
            </p>
          </div>

          {/* Authentic Logo Badge Stamp requested by user */}
          <div className="shrink-0 flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-brand-brown/5 shadow-sm">
            <Logo size={46} showText={false} />
            <div className="text-left">
              <span className="block font-mono text-[9px] font-extrabold tracking-widest text-[#E2A600] uppercase">
                OFFICIAL TEAM
              </span>
              <span className="block font-serif text-sm font-extrabold text-brand-brown uppercase leading-none mt-0.5">
                Renewal Buloba
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Slideshow Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Visual Display Block (Left - Col Span 7) */}
          <div className="lg:col-span-7 bg-brand-charcoal rounded-[2.5rem] relative overflow-hidden shadow-2xl h-[460px] sm:h-[540px] border border-brand-brown/10 group flex flex-col justify-end">
            
            {/* Slide Image Background with transition */}
            <div className="absolute inset-0 z-0">
              <img 
                src={activeSlide.image} 
                alt={activeSlide.title} 
                className="w-full h-full object-cover transition-all duration-1000 ease-out scale-102 filter brightness-[0.7] group-hover:scale-106"
              />
              {/* Radial and Linear Shadows mapping overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/20 to-transparent" />
              <div className="absolute inset-0 bg-black/15" />
            </div>

            {/* Float category tag */}
            <div className="absolute top-6 left-6 z-10 flex gap-2">
              <span className="bg-brand-brown/95 backdrop-blur shadow text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/10">
                {activeSlide.category}
              </span>
            </div>

            {/* Inner Interactive Text Overlay Block */}
            <div className="relative z-10 p-6 sm:p-10 text-left space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs font-mono font-extrabold text-brand-gold tracking-widest uppercase">
                  Slide {currentIndex + 1} of {CHOIR_SLIDES.length}
                </span>
                <h3 className="font-serif text-2xl sm:text-4.5xl font-extrabold text-white leading-tight">
                  {activeSlide.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light max-w-lg">
                  {activeSlide.subtitle}
                </p>
              </div>

              {/* Progress Tickers for Custom Slideshow */}
              <div className="flex items-center gap-2 pt-2">
                {CHOIR_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsPlayingAudio(false);
                      setAudioProgress(0);
                      setElapsedTime("0:00");
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "w-8 bg-brand-gold" : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                    title={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Quick manual navigation buttons for slideshow */}
            <div className="absolute right-6 bottom-6 z-10 flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="bg-white/10 hover:bg-white/20 active:scale-95 text-white p-3 rounded-full backdrop-blur-sm border border-white/15 cursor-pointer transition-all"
                title="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-3 rounded-full backdrop-blur-sm shadow border cursor-pointer transition-all active:scale-95 ${
                  isPlaying 
                    ? "bg-brand-gold text-brand-brown border-brand-gold hover:bg-brand-gold-light" 
                    : "bg-white/10 text-white border-white/15 hover:bg-white/20"
                }`}
                title={isPlaying ? "Pause Auto-play" : "Start Auto-play"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button
                onClick={handleNext}
                className="bg-white/10 hover:bg-white/20 active:scale-95 text-white p-3 rounded-full backdrop-blur-sm border border-white/15 cursor-pointer transition-all"
                title="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
          </div>

          {/* Interactive Player, Scriptures & Actions Panel (Right - Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 text-left">
            
            {/* Praise & Worship Songs + Facebook Live Link (Bento Card A) */}
            <div className="bg-brand-brown text-brand-cream rounded-[2.5rem] p-6 sm:p-7 space-y-5 shadow-xl border border-brand-brown-light/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 w-36 h-36 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-brand-cream/10 pb-3.5">
                <div className="flex items-center gap-2">
                  <div className="bg-brand-gold/15 p-2 rounded-xl text-brand-gold">
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold tracking-wide text-white">
                      Worship & Praise Inspirations
                    </h4>
                    <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block mt-0.5">
                      Popular Gospel Repertoire
                    </span>
                  </div>
                </div>
                <span className="bg-white/10 border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-mono text-brand-gold font-bold">
                  Praise Favorites
                </span>
              </div>

              {/* Worship Songs Showcase */}
              <div className="space-y-3">
                <p className="text-xs text-brand-cream/80 leading-relaxed font-light">
                  While our choir prepares their upcoming original studio recordings, we minister together using beloved local & international gospel songs:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-brand-gold/20">
                  {POPULAR_GOSPEL_SONGS.map((song) => (
                    <div 
                      key={song.id}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 p-2.5 rounded-xl transition-all text-left flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-white block line-clamp-1">
                          {song.title}
                        </span>
                        <span className="text-[10px] text-brand-cream/70 font-sans block line-clamp-1">
                          {song.artist}
                        </span>
                      </div>
                      <span className={`inline-block text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mt-1.5 self-start ${
                        song.tag === "Local Ugandan" 
                          ? "bg-brand-gold/20 text-brand-gold border border-brand-gold/30" 
                          : "bg-white/15 text-brand-cream border border-white/20"
                      }`}>
                        {song.tag}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Direct Link to Facebook Worship Services */}
                <div className="pt-2 border-t border-brand-cream/10">
                  <a
                    href="https://www.facebook.com/renewalchurchbuloba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white font-display font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md hover:scale-[1.01]"
                  >
                    <Facebook className="w-4 h-4 fill-current text-white shrink-0" />
                    <span>Watch Praise & Worship Services on Facebook</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                  <p className="text-[10px] text-brand-cream/60 font-mono text-center pt-1.5">
                    Watch our Sunday morning worship sessions live on Facebook
                  </p>
                </div>

              </div>

            </div>

            {/* Scripture Reference Frame + CTA (Bento Card B) */}
            <div className="bg-brand-cream/50 border border-brand-brown/10 p-6 sm:p-7 rounded-[2.5rem] flex flex-col justify-between space-y-5 h-full relative">
              <span className="absolute -top-3 -left-3 text-brand-gold/10 select-none">
                <Quote className="w-24 h-24 stroke-[1.5]" />
              </span>

              <div className="space-y-2 relative z-10">
                <span className="text-[10px] font-mono font-bold text-brand-brown-light uppercase tracking-wider block">
                  WORSHIP WORDS FOR 2026
                </span>
                <p className="font-serif italic text-sm text-brand-charcoal leading-relaxed">
                  “{activeSlide.verseText}”
                </p>
                <div className="flex items-center gap-1.5 font-mono text-xxs font-extrabold text-brand-brown">
                  <div className="w-4 h-[1px] bg-brand-brown" />
                  <span>{activeSlide.verseRef}</span>
                </div>
              </div>

              {/* Action buttons CTAs */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    localStorage.setItem("pending_ministry_focus", "min-3");
                    if (onNavigate) {
                      onNavigate("ministries");
                    }
                  }}
                  className="px-4 py-3 bg-brand-brown text-white hover:bg-brand-brown-light transition-all rounded-xl font-display font-extrabold text-xxs sm:text-xs uppercase tracking-wider text-center cursor-pointer flex items-center justify-center gap-1 shadow"
                >
                  Join Choir
                </button>
                <a
                  href="https://wa.me/256709634182?text=Hello%20Renewal%20Church,%20I%20would%20like%20to%20know%20more%20about%20the%20Renewal%20Voices%20choir%20rehearsals%20or%20book%2520a%252520praise%2520team%2520service."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 border border-brand-brown text-brand-brown hover:bg-brand-brown/5 transition-all rounded-xl font-display font-extrabold text-xxs sm:text-xs uppercase tracking-wider text-center cursor-pointer flex items-center justify-center gap-1"
                >
                  Book / Support
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Choir Join Dialog Modal popup */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in" id="choir-join-modal">
          <div 
            className="relative bg-white rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden border border-brand-brown/10 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header image banner block */}
            <div className="bg-brand-brown p-6 text-white relative">
              <div className="absolute top-0 right-0 transform translate-x-10 -translate-y-10 w-32 h-32 bg-brand-gold/15 rounded-full blur" />
              <button
                onClick={() => {
                  setIsJoinModalOpen(false);
                  setJoinSubmitted(false);
                }}
                className="absolute top-4 right-4 bg-white/12 hover:bg-white/20 text-white p-2 rounded-lg cursor-pointer transition-colors border border-white/5"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-3 text-left">
                <Logo size={42} showText={false} />
                <div>
                  <h3 className="font-serif text-lg font-bold tracking-tight text-white">
                    Enroll in Renewal Voices
                  </h3>
                  <p className="text-brand-gold text-xxs font-bold tracking-wider uppercase mt-0.5 font-mono">
                    Worship & Vocals Assessment
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8">
              {joinSubmitted ? (
                <div className="text-center py-6 space-y-4 animate-fade-in">
                  <div className="bg-brand-gold/10 p-4 rounded-full inline-block mx-auto">
                    <FileCheck2 className="w-12 h-12 text-brand-brown stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-xl font-bold text-brand-brown">
                      Thank You, {formData.name}!
                    </h4>
                    <p className="text-xs text-brand-charcoal-light leading-relaxed font-sans max-w-sm mx-auto">
                      Your voice application has been logged on the Altar platform. Brother Nicholas Lule (Lead Worship Director) will contact you over WhatsApp shortly to schedule your voice range audition!
                    </p>
                  </div>
                  <div className="pt-2 text-xxs font-mono text-brand-brown-light font-bold">
                    📅 NEXT AUDITION SESSION: SATURDAY 5:00 PM
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitJoin} className="space-y-4 text-left">
                  <div className="space-y-1.5">
                    <label className="text-xxs font-mono font-bold uppercase text-brand-brown-light tracking-wider">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Angella Namubiru"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs font-sans border border-brand-brown/15 p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-gold bg-brand-cream/25 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xxs font-mono font-bold uppercase text-brand-brown-light tracking-wider">
                      WhatsApp Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g., +256 700 123 456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs font-sans border border-brand-brown/15 p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-gold bg-brand-cream/25 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xxs font-mono font-bold uppercase text-brand-brown-light tracking-wider">
                        Preferred Voice
                      </label>
                      <select
                        value={formData.voiceType}
                        onChange={(e) => setFormData({ ...formData, voiceType: e.target.value })}
                        className="w-full text-xs font-sans border border-brand-brown/15 p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-gold bg-brand-cream/25 cursor-pointer"
                      >
                        <option value="Soprano">Soprano</option>
                        <option value="Alto">Alto</option>
                        <option value="Tenor">Tenor</option>
                        <option value="Bass">Bass / Instrumentalist</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xxs font-mono font-bold uppercase text-brand-brown-light tracking-wider">
                        Experience Level
                      </label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full text-xs font-sans border border-brand-brown/15 p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-gold bg-brand-cream/25 cursor-pointer"
                      >
                        <option value="No experience">Just beginning</option>
                        <option value="Some experience">Sang in choirs before</option>
                        <option value="Experienced">Trained musician</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-brand-brown text-white hover:bg-brand-brown-light font-display font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow cursor-pointer text-center"
                    >
                      Send My Application
                    </button>
                    <p className="text-center font-sans text-[10px] text-brand-charcoal-light/70 mt-2">
                      Join the Saturday rehearsals at 6:00 PM - 10:00 PM at our Main Sanctuary.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
