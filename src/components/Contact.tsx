import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Info, Landmark, Compass, ChevronRight } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://formsubmit.co/ajax/8dc267ea7bec032f76006b2dedf39155", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || "No Email Provided",
          phone: formData.phone || "No Phone Provided",
          message: formData.message,
          _subject: `New Message from ${formData.name} (Renewal Church Contact)`,
        })
      });

      if (!response.ok) {
        throw new Error("Failed to send message over server connection.");
      }

      // Save locally
      const previousMessages = JSON.parse(localStorage.getItem("contact_messages") || "[]");
      const newMsg = {
        ...formData,
        id: "msg-" + Date.now().toString(),
        dateReceived: new Date().toLocaleDateString(),
      };
      localStorage.setItem("contact_messages", JSON.stringify([newMsg, ...previousMessages]));

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setSubmitError("Could not send the message in real-time. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="church-contact-section" className="py-20 bg-brand-cream/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-brown font-mono text-xs font-bold uppercase tracking-widest block">
            We are Here for You
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-brown">
            GET IN TOUCH WITH RENEWAL
          </h3>
          <p className="text-sm text-brand-charcoal-light leading-relaxed font-sans">
            Have questions about services, membership, or need to schedule counseling? Reach our administrator desk. Or plan to drive directly over to our sanctuary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contacts Information Left */}
          <div className="lg:col-span-5 bg-brand-brown text-white p-8 rounded-3xl flex flex-col justify-between shadow-xl relative overflow-hidden border border-brand-gold/15">
            <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 opacity-5 pointer-events-none">
              <Compass className="w-80 h-80" />
            </div>

            <div className="space-y-8 relative z-10 text-left">
              <div className="space-y-2">
                <span className="text-brand-gold font-mono text-[10px] font-bold uppercase tracking-widest block font-bold">
                  Location Registry
                </span>
                <h4 className="font-serif text-2xl font-bold text-white uppercase tracking-wide">
                  RENEWAL CHURCH BULOBA
                </h4>
                <div className="h-0.5 w-16 bg-brand-gold mt-1" />
              </div>

              {/* Items */}
              <div className="space-y-6 font-sans">
                
                {/* Location */}
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Africa+Renewal+University,+Buloba,+Mityana+Road,+Uganda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group/addr cursor-pointer select-none"
                  title="Open in Google Maps"
                >
                  <div className="bg-white/10 group-hover/addr:bg-[#E2A600]/20 p-2.5 rounded-xl text-brand-gold mt-1 text-center shrink-0 transition-colors">
                    <MapPin className="w-5 h-5 group-hover/addr:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="block text-xxs font-mono text-brand-gold uppercase tracking-wider font-bold group-hover/addr:text-white flex items-center gap-1">
                      Sanctuary Address <span className="text-[10px] opacity-0 group-hover/addr:opacity-100 transition-opacity">↗</span>
                    </span>
                    <span className="block text-xs text-brand-cream/90 font-medium leading-relaxed group-hover/addr:text-brand-gold transition-colors">
                      Along Mityana Rd, Buloba Trading Centre.
                    </span>
                    <span className="block text-xxs text-brand-cream/70 leading-relaxed font-light mt-0.5">
                      Located at Africa Renewal University grounds.
                    </span>
                  </div>
                </a>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-2.5 rounded-xl text-brand-gold mt-1 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xxs font-mono text-brand-gold uppercase tracking-wider font-bold">
                      Admin Desk Mobile:
                    </span>
                    <span className="block text-xs text-brand-cream/90 font-medium font-mono leading-none mt-1">
                      +256 709 634 182
                    </span>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-2.5 rounded-xl text-brand-gold mt-1 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xxs font-mono text-brand-gold uppercase tracking-wider font-bold">
                      Direct Email Inbox:
                    </span>
                    <span className="block text-xs text-brand-cream/90 font-medium font-mono">
                      rmwawasi@afru.ac.ug
                    </span>
                    <span className="block text-xxxs text-brand-cream/50 mt-0.5">
                      We check and respond to administration emails daily.
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Ugandan quick directions prompt */}
            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 text-xxs text-brand-cream/70 font-sans leading-relaxed text-left relative z-10">
              💡 <strong>Travel Guide:</strong> If boarding a taxi from Kampala, Get off at Buloba Trading Center near the Police station. Ask for Direction.
            </div>

          </div>

          {/* Contact and Map panel Right */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Form */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-brand-brown/10 text-left shadow-sm">
              <h4 className="font-serif text-lg font-bold text-brand-brown mb-4 uppercase tracking-wider">
                Send a Quick Message
              </h4>

              {submitted ? (
                <div className="p-6 text-center space-y-3 animate-fade-in">
                  <div className="inline-block bg-green-50 p-3 rounded-full text-green-600">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h5 className="font-display text-lg font-bold text-green-800">
                    Message Sent in Real-Time!
                  </h5>
                  <p className="text-xs text-green-700 leading-relaxed font-sans">
                    Thank you for reaching out to Renewal Buloba. Your message has been sent directly to our administration desk (<strong>rmwawasi@afru.ac.ug</strong>) and registered. A representative will reach back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-display font-semibold uppercase text-brand-brown hover:text-brand-gold cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="text-left">
                      <label className="block text-xxs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Timothy Ssekimpi"
                        className="w-full text-xs font-sans p-3 rounded-xl bg-brand-cream border border-brand-brown/10 focus:ring-2 focus:ring-brand-gold focus:outline-none disabled:opacity-50"
                      />
                    </div>
                    {/* Email */}
                    <div className="text-left">
                      <label className="block text-xxs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                        Email Address
                      </label>
                      <input
                        type="email"
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. tim@gmail.com"
                        className="w-full text-xs font-sans p-3 rounded-xl bg-brand-cream border border-brand-brown/10 focus:ring-2 focus:ring-brand-gold focus:outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="text-left">
                    <label className="block text-xxs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                      Your Phone Number
                    </label>
                    <input
                      type="tel"
                      disabled={isSubmitting}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +256 701 123456"
                      className="w-full text-xs font-sans p-3 rounded-xl bg-brand-cream border border-brand-brown/10 focus:ring-2 focus:ring-brand-gold focus:outline-none disabled:opacity-50"
                    />
                  </div>

                  {/* Message */}
                  <div className="text-left">
                    <label className="block text-xxs font-bold text-brand-brown uppercase tracking-wider mb-1 font-display">
                      Message / Question *
                    </label>
                    <textarea
                      required
                      rows={3}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we assist you? Counseling needs, joining groups, baptism dates..."
                      className="w-full text-xs font-sans p-3 rounded-xl bg-brand-cream border border-brand-brown/10 focus:ring-2 focus:ring-brand-gold focus:outline-none resize-none disabled:opacity-50"
                    />
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-[10px] text-red-600 font-sans leading-relaxed text-left flex items-start gap-2 animate-pulse">
                      <span className="shrink-0 text-red-500">⚠️</span>
                      <div>
                        <strong>Could not send:</strong> {submitError}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-brown hover:bg-brand-charcoal disabled:bg-brand-brown/50 disabled:cursor-not-allowed text-white font-display font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Custom Interactive SVG Google Map Placeholder Pointing to Buloba */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Africa+Renewal+University,+Buloba,+Mityana+Road,+Uganda"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-cream border border-brand-brown/10 rounded-3xl p-5 text-left shadow-2xl relative overflow-hidden block transition-all duration-300 hover:shadow-brand-brown/10 hover:border-[#E2A600]/40 group cursor-pointer"
              title="Click to open Google Maps directions to Africa Renewal University, Buloba"
              id="google-maps-card-trigger"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] font-bold text-brand-brown flex items-center gap-1.5">
                  📍 VISUAL LOCATION MAP (BULOBA, UGANDA)
                </span>
                <span className="font-mono text-[9px] font-bold text-[#E2A600] group-hover:underline flex items-center gap-1">
                  GET DIRECTIONS ↗
                </span>
              </div>

              {/* Vector SVG Map layout representing highway */}
              <div className="h-44 bg-white rounded-2xl relative overflow-hidden flex items-center justify-center border border-brand-brown/5 transition-all duration-300 group-hover:ring-1 group-hover:ring-[#E2A600]/20">
                <svg
                  viewBox="0 0 500 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-slate-300"
                >
                  {/* Background landscape grids */}
                  <rect width="500" height="200" fill="#E8F0E4" />
                  
                  {/* Grid fields */}
                  <path d="M 0 50 L 500 80 M 0 120 L 500 150" stroke="#DFEDE0" strokeWidth="2" />
                  <path d="M 100 0 L 120 200 M 350 0 L 320 200" stroke="#DFEDE0" strokeWidth="2" />

                  {/* Main highway road - Kampala-Mityana Highway */}
                  <path
                    d="M 0 100 Q 250 85, 500 100"
                    stroke="#D0D3D4"
                    strokeWidth="32"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 0 100 Q 250 85, 500 100"
                    stroke="#FFCC00"
                    strokeWidth="1.5"
                    strokeDasharray="6,6"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Off road to Renewal Church Buloba */}
                  <path
                    d="M 230 100 Q 240 150, 280 200"
                    stroke="#F2F3F4"
                    strokeWidth="20"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Neighboring locations labeled */}
                  <text x="20" y="80" fill="#7F8C8D" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                    ← TO MITYANA
                  </text>
                  <text x="400" y="80" fill="#7F8C8D" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                    TO KAMPALA →
                  </text>

                  {/* Shell Station Buloba block */}
                  <circle cx="160" cy="74" r="6" fill="#FF5E2A" />
                  <text x="140" y="62" fill="#222222" fontSize="7" fontFamily="sans-serif" fontWeight="bold">
                    ⛽ Shell Station
                  </text>

                  {/* Buloba Road Junction labeling */}
                  <text x="195" y="132" fill="#7F8C8D" fontSize="7" fontFamily="sans-serif" fontWeight="bold">
                    Forest Ridge Road
                  </text>

                  {/* Renewal Church Sanctuary Block */}
                  <g transform="translate(265, 145)">
                    {/* Church compound shape highlighted */}
                    <rect x="5" y="5" width="60" height="40" rx="6" fill="#3B1F0F" opacity="0.9" />
                    
                    {/* Small Gold Cross symbol */}
                    <path d="M 35 12 L 35 34 M 26 20 L 44 20" stroke="#F4B400" strokeWidth="3" strokeLinecap="round" />
                    
                    {/* Text Label */}
                    <text x="10" y="41" fill="#FFFFFF" fontSize="6.5" fontFamily="sans-serif" fontWeight="bold">
                      RENEWAL CHURCH
                    </text>
                  </g>

                  {/* Custom Pin Animation over Church */}
                  <g transform="translate(290, 125)" className="animate-bounce">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="#F4B400"
                    />
                  </g>
                </svg>

                {/* Overlapped navigation tooltip */}
                <div className="absolute top-3 left-3 bg-brand-brown text-white text-xxs font-semibold px-2 py-1 rounded shadow-md border border-brand-gold/20 flex items-center gap-1">
                  🌐 GPS: 0.3167° N, 32.4833° E
                </div>
              </div>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
