import React, { useState } from "react";
import { MINISTRIES } from "../data";
import { Ministry } from "../types";
import { Sparkles, Calendar, User, HeartHandshake, Phone, ArrowRight, X, Mail, CheckCircle } from "lucide-react";

function MinistryImageCycler({ images, alt, objectPosition }: { images: string[]; alt: string; objectPosition?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500); // Changes image every 3.5 seconds
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-full">
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt={`${alt} image ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          } ${objectPosition || "object-center"}`}
          referrerPolicy="no-referrer"
        />
      ))}
    </div>
  );
}

export default function Ministries() {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [successJointName, setSuccessJointName] = useState<string | null>(null);
  const [successVisitorName, setSuccessVisitorName] = useState<string>("");
  const [successWhatsappUrl, setSuccessWhatsappUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    visitorName: "",
    visitorPhone: "",
    skillNote: "",
  });

  React.useEffect(() => {
    const focusId = localStorage.getItem("pending_ministry_focus");
    if (focusId) {
      const matched = MINISTRIES.find((m) => m.id === focusId);
      if (matched) {
        setSelectedMinistry(matched);
        setTimeout(() => {
          const el = document.getElementById(`ministry-${focusId}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.classList.add("ring-2", "ring-brand-gold", "shadow-2xl", "scale-[1.02]", "transition-all", "duration-500");
            setTimeout(() => {
              el.classList.remove("ring-2", "ring-brand-gold", "scale-[1.02]");
            }, 3000);
          }
        }, 600);
      }
      localStorage.removeItem("pending_ministry_focus");
    }
  }, []);

  const handleJoinClick = (ministry: Ministry) => {
    setSelectedMinistry(ministry);
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.visitorName || !formData.visitorPhone || !selectedMinistry) return;

    // Save interest locally
    const previousInterests = JSON.parse(localStorage.getItem("ministry_interests") || "[]");
    const interestRecord = {
      id: Date.now().toString(),
      ministryId: selectedMinistry.id,
      ministryName: selectedMinistry.name,
      ...formData,
      dateInserted: new Date().toLocaleDateString(),
    };
    localStorage.setItem("ministry_interests", JSON.stringify([interestRecord, ...previousInterests]));

    // Construct highly personalized WhatsApp message
    const talentDetails = formData.skillNote ? ` Here is a brief note on my talents/interests: ${formData.skillNote}.` : "";
    const whatsappText = `Hello, my name is ${formData.visitorName}. I visited your website and would like to join the ${selectedMinistry.name} team.${talentDetails} Please guide me on how to get started!`;
    const whatsappUrl = `https://wa.me/256709634182?text=${encodeURIComponent(whatsappText)}`;

    setSuccessJointName(selectedMinistry.name);
    setSuccessVisitorName(formData.visitorName);
    setSuccessWhatsappUrl(whatsappUrl);

    // Open WhatsApp in a new tab securely
    window.open(whatsappUrl, "_blank");

    setSelectedMinistry(null);
    setFormData({ visitorName: "", visitorPhone: "", skillNote: "" });

    setTimeout(() => {
      setSuccessJointName(null);
    }, 20000); // Higher timeout to let them click the manual link if popups are blocked
  };

  return (
    <section id="church-ministries-section" className="py-20 bg-brand-cream/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-brown font-mono text-xs font-bold uppercase tracking-widest block">
            Find Your Place to Serve
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-brown">
            DISCOVER OUR ACTIVE MINISTRIES
          </h3>
          <p className="text-sm text-brand-charcoal-light leading-relaxed font-sans">
            A healthy church is a serving church. Each of us is gifted with unique strengths designed to build others and share God's divine harvest inside Buloba.
          </p>
        </div>

        {/* Success Alert */}
        {successJointName && (
          <div className="bg-emerald-50 border border-emerald-200/80 p-5 rounded-3xl text-left animate-fade-in flex flex-col sm:flex-row items-start gap-4 max-w-xl mx-auto shadow-md">
            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-3 flex-grow">
              <div>
                <h5 className="font-serif text-sm font-bold text-emerald-900">
                  Ready to Connect on WhatsApp!
                </h5>
                <p className="text-xs text-emerald-800 leading-relaxed mt-1">
                  Thank you, <strong>{successVisitorName}</strong>! We've prepared a customized message to connect you with the <strong>{successJointName}</strong> leader on WhatsApp.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={successWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4.5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
                >
                  💬 Open WhatsApp Chat
                </a>
                <span className="text-xxxxs font-mono text-emerald-600 uppercase tracking-wider">
                  Direct Integration Active
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Ministry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MINISTRIES.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 border border-brand-brown/5 flex flex-col justify-between text-left"
              id={`ministry-${m.id}`}
            >
              {/* Graphic Header Panel */}
              <div>
                <div className="h-48 sm:h-52 overflow-hidden relative bg-brand-brown/5">
                  {m.images && m.images.length > 0 ? (
                    <MinistryImageCycler
                      images={m.images}
                      alt={m.name}
                      objectPosition={m.objectPosition}
                    />
                  ) : (
                    <img
                      src={m.image}
                      alt={m.name}
                      className={`w-full h-full object-cover ${m.objectPosition || "object-center"}`}
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-brown/85 via-brand-brown/20 to-transparent z-20" />
                  {m.leader && (
                    <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xxs font-mono font-bold text-brand-gold uppercase tracking-wider z-30">
                      <User className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span>{m.leader}</span>
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <h4 className="font-serif text-base font-bold text-brand-brown leading-snug">
                    {m.name}
                  </h4>
                  <p className="text-xs text-brand-charcoal-light/90 leading-relaxed line-clamp-3">
                    {m.description}
                  </p>

                  {/* Highlights Bulleting */}
                  <div className="pt-3 border-t border-brand-brown/5">
                    <span className="text-xxs font-bold text-brand-brown uppercase tracking-wider block mb-1 font-mono">
                      Key Engagements:
                    </span>
                    <ul className="space-y-1">
                      {m.activities.slice(0, 2).map((act, idx) => (
                        <li key={idx} className="text-xxs text-brand-charcoal-light/80 flex items-start gap-1">
                          <span className="text-brand-gold font-bold">✓</span>
                          <span className="truncate">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card CTA Footer Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => handleJoinClick(m)}
                  className="w-full bg-brand-brown hover:bg-brand-charcoal text-white font-display font-semibold transition-colors text-xs py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 text-center"
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-brand-gold" /> Join Ministry Section
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Join Ministry Sheet / Popup Form */}
        {selectedMinistry && (
          <div
            id="ministry-apply-backdrop"
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-brand-charcoal/85 backdrop-blur-md"
            onClick={() => setSelectedMinistry(null)}
          >
            <div
              className="bg-white text-brand-charcoal rounded-3xl max-w-sm w-full overflow-hidden border border-brand-brown/10 shadow-2xl relative animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-brand-brown p-5 text-white">
                <button
                  onClick={() => setSelectedMinistry(null)}
                  className="absolute top-4 right-4 text-brand-cream hover:text-brand-gold p-1 rounded-full cursor-pointer bg-white/5"
                  aria-label="Close form"
                >
                  <X className="w-4 h-4" />
                </button>
                <span className="font-mono text-brand-gold text-xxs font-bold uppercase tracking-widest block text-left">
                  Ministry Serve Form
                </span>
                <h4 className="font-serif font-bold text-sm tracking-wide mt-1 text-white leading-tight text-left">
                  {selectedMinistry.name}
                </h4>
              </div>

              {/* Form Body */}
              <form onSubmit={handleJoinSubmit} className="p-5 space-y-4">


                {/* Name */}
                <div className="text-left">
                  <label className="block text-xxs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.visitorName}
                    onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
                    placeholder="e.g. Samuel Mugabi"
                    className="w-full text-xs font-sans p-2.5 rounded-lg border border-brand-brown/15 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>

                {/* Phone */}
                <div className="text-left">
                  <label className="block text-xxs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                    Ugandan Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.visitorPhone}
                    onChange={(e) => setFormData({ ...formData, visitorPhone: e.target.value })}
                    placeholder="e.g. +256 772 443210"
                    className="w-full text-xs font-sans p-2.5 rounded-lg border border-brand-brown/15 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>

                {/* Note */}
                <div className="text-left">
                  <label className="block text-xxs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                    Brief note on your talents or interests
                  </label>
                  <textarea
                    rows={2}
                    value={formData.skillNote}
                    onChange={(e) => setFormData({ ...formData, skillNote: e.target.value })}
                    placeholder="e.g. Play bass guitar / have experience teaching children / happy to handle cameras..."
                    className="w-full text-xs font-sans p-2.5 rounded-lg border border-brand-brown/15 focus:outline-none-2 resize-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMinistry(null)}
                    className="flex-1 p-2 bg-brand-cream hover:bg-brand-brown/5 text-brand-brown text-xs font-semibold rounded-lg border border-brand-brown/10 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 p-2 bg-brand-brown hover:bg-brand-charcoal text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
