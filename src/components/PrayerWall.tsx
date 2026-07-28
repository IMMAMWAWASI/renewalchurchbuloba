import React, { useState, useEffect } from "react";
import { PrayerRequest } from "../types";
import { MessageSquare, Heart, Sparkles, Send, CheckCircle2, User, EyeOff, ShieldCheck, Footprints } from "lucide-react";

export default function PrayerWall() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    request: "",
    isPrivate: false,
  });
  
  const [success, setSuccess] = useState(false);

  // Load prayers from storage or load robust initial Ugandan church seeds
  useEffect(() => {
    const defaultSeeds: PrayerRequest[] = [
      {
        id: "pr-1",
        name: "Victor",
        email: "victor@renewalbuloba.org",
        request: "I am so Blessed by Wednesday prayer. I can't Miss",
        date: "July 22, 2026",
        hearts: 64,
        replies: ["Amen! Glory to God!"],
        isPrivate: false,
      },
      {
        id: "pr-2",
        name: "Kirabo Teddy",
        email: "teddy@renewalbuloba.org",
        request: "I am so grateful that we Pray on Wednesday",
        date: "July 22, 2026",
        hearts: 52,
        replies: ["Amen! Wednesday prayers are powerful."],
        isPrivate: false,
      },
      {
        id: "pr-3",
        name: "Talent Ainembabazi",
        email: "talent@renewalbuloba.org",
        request: "Can't miss to be in the presence of God",
        date: "July 20, 2026",
        hearts: 78,
        replies: ["Amen! Praise God!"],
        isPrivate: false,
      }
    ];

    const saved = localStorage.getItem("renewal_prayers");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If old seed names exist, replace with updated seeds
        const hasOldSeeds = parsed.some((p: PrayerRequest) => p.name.includes("Nakato") || p.name.includes("Ssemwanga") || p.name.includes("Wandera"));
        if (hasOldSeeds) {
          setPrayers(defaultSeeds);
          localStorage.setItem("renewal_prayers", JSON.stringify(defaultSeeds));
        } else {
          setPrayers(parsed);
        }
      } catch {
        setPrayers(defaultSeeds);
        localStorage.setItem("renewal_prayers", JSON.stringify(defaultSeeds));
      }
    } else {
      setPrayers(defaultSeeds);
      localStorage.setItem("renewal_prayers", JSON.stringify(defaultSeeds));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.request) return;

    const newPrayer: PrayerRequest = {
      id: "pr-" + Date.now().toString(),
      name: formData.name,
      email: formData.email,
      request: formData.request,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      hearts: 0,
      replies: [],
      isPrivate: formData.isPrivate,
    };

    const updated = [newPrayer, ...prayers];
    setPrayers(updated);
    localStorage.setItem("renewal_prayers", JSON.stringify(updated));

    // Clear form
    setFormData({ name: "", email: "", request: "", isPrivate: false });
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  const handleAmen = (id: string) => {
    const updated = prayers.map((p) => {
      if (p.id === id) {
        return { ...p, hearts: p.hearts + 1 };
      }
      return p;
    });
    setPrayers(updated);
    localStorage.setItem("renewal_prayers", JSON.stringify(updated));
  };

  // Filter out private requests from public wall viewing!
  const publicPrayers = prayers.filter((p) => !p.isPrivate);

  return (
    <section id="church-prayer-wall-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-brown font-mono text-xs font-bold uppercase tracking-widest block">
            Bear One Another's Burdens
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-brown">
            RENEWAL PRAYER ALTAR & WALL
          </h3>
          <p className="text-sm text-brand-charcoal-light leading-relaxed font-sans">
            We believe in the therapeutic and supernatural authority of joint intercession. Send your request securely. Choose to place it on the public encouragement wall, or keep it strictly confidential with the pastoral intercessors.
          </p>
        </div>

        {/* Form and public wall layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form container Left */}
          <div className="lg:col-span-5 bg-brand-cream border border-brand-brown/10 rounded-3xl p-6 md:p-8 space-y-6 text-left shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-brown" />
              <h4 className="font-serif text-lg font-extrabold text-brand-brown uppercase tracking-wider">
                Send Prayer Request
              </h4>
            </div>

            {success && (
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-3xl text-xs text-green-700 font-sans leading-relaxed animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mb-1 inline-block mr-2" />
                <strong>Glory to God!</strong> Your request has been logged safely. Our dedicated dawn intercessors will lift it up at 5:00 AM.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div className="text-left">
                <label className="block text-xxs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Brother Kato Samuel"
                  className="w-full text-xs font-sans p-3 rounded-xl bg-white border border-brand-brown/15 text-brand-charcoal focus:ring-2 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              {/* Email */}
              <div className="text-left">
                <label className="block text-xxs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                  Your Confidential Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. kato@gmail.com"
                  className="w-full text-xs font-sans p-3 rounded-xl bg-white border border-brand-brown/15 text-brand-charcoal focus:ring-2 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              {/* Text Area */}
              <div className="text-left">
                <label className="block text-xxs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                  What is your prayer petition? *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.request}
                  onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                  placeholder="Daughters, business, healings, local family challenges, salvation..."
                  className="w-full text-xs font-sans p-3 rounded-xl bg-white border border-brand-brown/15 text-brand-charcoal focus:ring-2 focus:ring-brand-gold focus:outline-none resize-none"
                />
              </div>

              {/* Privacy Toggle */}
              <div className="p-3 bg-white border border-brand-brown/5 rounded-xl flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-brand-brown block font-display">
                    Confidential Prayer Request?
                  </span>
                  <span className="text-xxs text-brand-charcoal-light/60">
                    If checked, request is invisible on public web wall.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isPrivate}
                  onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                  className="accent-brand-brown w-4.5 h-4.5 rounded cursor-pointer"
                />
              </div>

              {/* Submission button */}
              <button
                type="submit"
                className="w-full bg-brand-brown hover:bg-brand-charcoal text-white font-display font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow"
              >
                <Send className="w-3.5 h-3.5 text-brand-gold" /> Alert Intercession Altar
              </button>

            </form>

            {/* Micro warning indicator */}
            <div className="flex items-start gap-2 text-xxs text-brand-charcoal-light/65 pt-2 font-sans">
              <ShieldCheck className="w-4 h-4 text-brand-brown shrink-0" />
              <span>We value your heart security. Pastor-held submissions are deleted or archived safely in compliance with biblical stewardship guidance.</span>
            </div>

          </div>

          {/* Public Wall display Right */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-brand-brown/10 pb-3">
              <h4 className="font-serif text-sm font-extrabold text-brand-brown uppercase tracking-widest flex items-center gap-1.5">
                <Footprints className="w-4 h-4 text-brand-gold" /> Active Public Prayer Wall
              </h4>
              <span className="text-xxs font-mono text-brand-brown-light font-bold">
                {publicPrayers.length} Prayers Active
              </span>
            </div>

            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
              {publicPrayers.map((prayer) => (
                <div
                  key={prayer.id}
                  className="bg-brand-cream/20 hover:bg-brand-cream/35 border border-brand-brown/5 rounded-3xl p-5 space-y-3 transition-colors text-left"
                  id={`wall-item-${prayer.id}`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-2 text-xxs">
                      <div className="bg-brand-brown/10 p-1.5 rounded-full text-brand-brown shrink-0">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-brand-brown block">{prayer.name}</span>
                      </div>
                    </div>
                    
                    {/* Heart Counter click */}
                    <button
                      onClick={() => handleAmen(prayer.id)}
                      className="inline-flex items-center gap-1.5 bg-brand-gold/10 hover:bg-brand-gold/25 border border-brand-gold/20 text-brand-brown text-xxs px-3 py-1.5 rounded-full font-mono font-extrabold transition-all duration-150 cursor-pointer active:scale-95"
                      title="Stand in support - click Amen"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current text-brand-brown" />
                      <span>{prayer.hearts} Amen</span>
                    </button>
                  </div>

                  <p className="text-xs text-brand-charcoal-light font-sans leading-relaxed">
                    “{prayer.request}”
                  </p>
                </div>
              ))}

              {publicPrayers.length === 0 && (
                <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl text-center">
                  <span className="text-2xl">🙏</span>
                  <h5 className="font-display text-sm font-bold text-amber-900 mt-2">Connecting Prayer Chains</h5>
                  <p className="text-xxs text-amber-800 tracking-wide mt-1">
                    Send the very first public request to fuel the prayer intercessors!
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
