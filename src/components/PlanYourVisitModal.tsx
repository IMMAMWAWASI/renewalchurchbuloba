import React, { useState } from "react";
import { X, Calendar, Clock, MapPin, CheckCircle, Flame, Users, HeartHandshake, MessageCircle } from "lucide-react";
import Logo from "./Logo";

interface PlanYourVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlanYourVisitModal({ isOpen, onClose }: PlanYourVisitModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Sunday Worship Service - 10:30 AM",
    guestsCount: "1",
    hasKids: "no",
    prayerHelp: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const getWhatsAppUrl = () => {
    const waPhone = "256709634182";
    const kidsText = formData.hasKids === "yes" ? "Yes, with children" : "No";
    const waMessage = `*New Visit Planned - Renewal Church Buloba*\n\n` +
      `• *Name:* ${formData.name}\n` +
      `• *Phone:* ${formData.phone}\n` +
      `• *Email:* ${formData.email || 'N/A'}\n` +
      `• *Service:* ${formData.service}\n` +
      `• *Number of Guests:* ${formData.guestsCount}\n` +
      `• *Bringing Kids:* ${kidsText}\n` +
      (formData.prayerHelp ? `• *Prayer/Needs:* ${formData.prayerHelp}\n` : "");
      
    return `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    // Store localized storage
    const previousVisits = JSON.parse(localStorage.getItem("planned_visits") || "[]");
    const newVisit = {
      ...formData,
      id: Date.now().toString(),
      dateCreated: new Date().toLocaleDateString(),
    };
    localStorage.setItem("planned_visits", JSON.stringify([newVisit, ...previousVisits]));
    
    setSubmitted(true);

    try {
      const url = getWhatsAppUrl();
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Popup blocked or failed to redirect automatically:", err);
    }
  };

  return (
    <div
      id="plan-visit-modal-backdrop"
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-brand-charcoal/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="plan-visit-modal-content"
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-brand-brown/10 animate-scale-up"
      >
        {/* Header decoration banner */}
        <div className="bg-brand-brown p-6 text-white relative">
          <button
            onClick={() => {
              onClose();
              setSubmitted(false);
            }}
            className="absolute top-4 right-4 text-brand-cream hover:text-brand-gold bg-brand-charcoal-light/30 p-2 rounded-full transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <Logo size={44} showText={false} />
            <div>
              <h3 className="font-serif text-xl font-bold tracking-tight text-white">
                Plan Your Blessed Visit
              </h3>
              <p className="text-brand-gold text-xs font-semibold tracking-wider uppercase mt-0.5">
                We are preparing a harvest for you!
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {submitted ? (
            <div className="text-center py-8 px-4 flex flex-col items-center justify-center animate-fade-in">
              <div className="bg-brand-gold/10 p-4 rounded-full mb-4">
                <CheckCircle className="w-16 h-16 text-brand-brown" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-brand-brown">
                Welcome Home, {formData.name}!
              </h4>
              <p className="mt-3 text-sm text-brand-charcoal-light leading-relaxed">
                Thank you for scheduling your visit to <strong>Renewal Church Buloba</strong>. We cannot wait to worship with you on Sunday during the <strong>{formData.service}</strong>!
              </p>
              
              <div className="my-6 p-4 bg-brand-cream rounded-xl text-left border border-brand-brown/10 w-full text-xs space-y-2 font-sans">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Africa+Renewal+University,+Buloba,+Mityana+Road,+Uganda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 group/visitaddr hover:text-[#E2A600] transition-colors cursor-pointer"
                  title="Open in Google Maps"
                >
                  <MapPin className="w-4 h-4 text-brand-brown shrink-0 group-hover/visitaddr:scale-110 transition-transform mt-0.5" />
                  <div className="flex flex-col">
                    <span><strong>Location:</strong> <span className="underline decoration-[#E2A600]/30 font-medium">Along Mityana Rd, Buloba Trading Centre.</span> ↗</span>
                    <span className="text-brand-charcoal-light/70 text-[11px] font-normal">Located at Africa Renewal University grounds.</span>
                  </div>
                </a>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-brown shrink-0" />
                  <span><strong>Scheduled Service:</strong> {formData.service}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-brown shrink-0" />
                  <span><strong>Your Party size:</strong> {formData.guestsCount} Person(s)</span>
                </div>
                {formData.hasKids === "yes" && (
                  <div className="flex items-center gap-2 text-brand-brown-light font-medium">
                    <Flame className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>Special Kids Sunday School hosts are notified for children registration!</span>
                  </div>
                )}
              </div>

              <p className="text-xxs text-brand-brown-light/75 mb-4">
                A host from our connection team will call/text you at <strong>{formData.phone}</strong> before Sunday to help you find parking and walk in smoothly.
              </p>

              <div className="flex flex-col gap-2 w-full">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-display font-semibold transition-all duration-200 px-6 py-2.5 rounded-lg cursor-pointer shadow-md hover:shadow-lg w-full text-sm flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-5 h-5 fill-current text-white animate-pulse" />
                  Send details via WhatsApp
                </a>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="bg-brand-brown hover:bg-brand-charcoal text-white font-display font-semibold transition-all duration-200 px-6 py-2 rounded-lg cursor-pointer text-xs text-center"
                >
                  Close & Back to Home
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-brand-charcoal-light leading-relaxed mb-4">
                Let us know you are coming so we can have a greeter at the front entrance waiting to welcome you, answer questions, guide your kids to classes, and pre-arrange comfortable seating.
              </p>

              {/* Name Input */}
              <div className="text-left">
                <label className="block text-xs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Ivan Ssewankambo"
                  className="w-full text-sm bg-brand-cream border border-brand-brown/15 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-shadow text-brand-charcoal font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Input */}
                <div className="text-left">
                  <label className="block text-xs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                    Ugandan Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g., +256 772 123 456"
                    className="w-full text-sm bg-brand-cream border border-brand-brown/15 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-shadow text-brand-charcoal font-sans"
                  />
                </div>

                {/* Email Input */}
                <div className="text-left">
                  <label className="block text-xs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g., ivan@gmail.com"
                    className="w-full text-sm bg-brand-cream border border-brand-brown/15 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-shadow text-brand-charcoal font-sans"
                  />
                </div>
              </div>

              {/* Service Select */}
              <div className="text-left">
                <label className="block text-xs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                  Which Service Will You Attend?
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full text-sm bg-brand-cream border border-brand-brown/15 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-shadow text-brand-charcoal font-sans"
                >
                  <option>Sunday Worship Service - 10:30 AM</option>
                  <option>Wednesday Midweek Assembly - 5:00 PM</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Guests Count */}
                <div className="text-left">
                  <label className="block text-xs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                    Number of Guests
                  </label>
                  <select
                    value={formData.guestsCount}
                    onChange={(e) => setFormData({ ...formData, guestsCount: e.target.value })}
                    className="w-full text-sm bg-brand-cream border border-brand-brown/15 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-shadow text-brand-charcoal font-sans"
                  >
                    <option value="1">Just me (1)</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5+ Family</option>
                  </select>
                </div>

                {/* Has Kids */}
                <div className="text-left">
                  <label className="block text-xs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                    Bringing Children? (Ages 2-12)
                  </label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-charcoal">
                      <input
                        type="radio"
                        name="hasKids"
                        value="no"
                        checked={formData.hasKids === "no"}
                        onChange={() => setFormData({ ...formData, hasKids: "no" })}
                        className="accent-brand-brown"
                      />
                      No children
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-charcoal">
                      <input
                        type="radio"
                        name="hasKids"
                        value="yes"
                        checked={formData.hasKids === "yes"}
                        onChange={() => setFormData({ ...formData, hasKids: "yes" })}
                        className="accent-brand-brown"
                      />
                      Yes, with kids
                    </label>
                  </div>
                </div>
              </div>

              {/* Special message or prayer note */}
              <div className="text-left">
                <label className="block text-xs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                  Any prayer requests or helper needs?
                </label>
                <textarea
                  value={formData.prayerHelp}
                  onChange={(e) => setFormData({ ...formData, prayerHelp: e.target.value })}
                  placeholder="e.g. Please pray for my family's health, or I require wheelchair accessibility..."
                  rows={2}
                  className="w-full text-sm bg-brand-cream border border-brand-brown/15 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-shadow text-brand-charcoal font-sans resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-brand-cream hover:bg-brand-brown/5 text-brand-brown border border-brand-brown/20 font-display font-semibold transition-all duration-150 py-2.5 rounded-lg text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-gold hover:bg-brand-gold-light text-brand-brown font-display font-bold py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer shadow-md shadow-brand-gold/20 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <HeartHandshake className="w-4 h-4" /> Ready, Let's Go!
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
