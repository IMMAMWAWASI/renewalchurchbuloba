import React from "react";
import { Facebook, Instagram, Youtube, ArrowUp, Calendar, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenPlanVisit: () => void;
}

export default function Footer({ onNavigate, onOpenPlanVisit }: FooterProps) {
  const currentYear = 2026;

  const quickLinks = [
    { name: "About Us", id: "about" },
    { name: "Our Ministries", id: "ministries" },
    { name: "Sermons Online", id: "sermons" },
    { name: "Upcoming Events", id: "events" },
    { name: "Life Groups", id: "lifegroups" },
    { name: "Giving Portal", id: "give" },
    { name: "Prayer Requests", id: "prayer" },
  ];

  return (
    <footer
      id="main-church-footer"
      className="bg-brand-brown text-white pt-16 pb-24 md:pb-8 border-t border-brand-gold/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Segment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 border-b border-white/10 pb-12 text-left">
          
          {/* Logo and brief intro segment (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center text-left cursor-pointer focus:outline-none"
              title="Renewal Church Buloba"
            >
              <Logo size={48} showText={true} textColor="light" />
            </button>
            <p className="text-xs text-brand-cream/70 leading-relaxed font-sans max-w-sm">
              We are a Christ-centered family located Along Mityana Rd, Buloba Trading Centre, at Africa Renewal University grounds. Influencing lives through the Gospel of Jesus Christ and preparing people for God's divine harvest.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/renewalchurchbuloba"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="bg-white/5 hover:bg-brand-gold hover:text-brand-brown p-2.5 rounded-full transition-all duration-300 hover:scale-105 text-white shadow-sm flex items-center justify-center"
                title="Search 'renewalchurchbuloba' on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/renewalchurchbuloba"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="bg-white/5 hover:bg-brand-gold hover:text-brand-brown p-2.5 rounded-full transition-all duration-300 hover:scale-105 text-white shadow-sm flex items-center justify-center"
                title="Search 'renewalchurchbuloba' on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@renewalchurchbuloba"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="bg-white/5 hover:bg-brand-gold hover:text-brand-brown p-2.5 rounded-full transition-all duration-300 hover:scale-105 text-white shadow-sm flex items-center justify-center"
                title="Subscribe on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links columns (Col 5-7) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-gold">
              Quick Navigation
            </h4>
            <div className="h-0.5 w-12 bg-brand-gold" />
            <ul className="grid grid-cols-1 gap-2 text-xs font-sans">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-brand-cream/80 hover:text-white transition-colors cursor-pointer text-left font-light"
                  >
                    💡 {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service timings column (Col 8-10) */}
          <div className="lg:col-span-3 space-y-4" id="footer-weekly-services-list">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-gold">
              Weekly Services
            </h4>
            <div className="h-0.5 w-12 bg-brand-gold" />
            <div className="space-y-3 text-xs font-sans">
              
              {/* Sunday */}
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-[9px] font-bold bg-[#E2A600] text-brand-brown px-1.5 py-0.5 rounded leading-none shrink-0 uppercase mt-0.5">
                  SUN
                </span>
                <div className="space-y-0.5">
                  <span className="font-bold text-white block leading-none">Sunday Celebration</span>
                  <span className="text-[11px] text-brand-cream/70 block font-mono">10:30 AM - 1:00 PM</span>
                </div>
              </div>

              {/* Tuesday */}
              <div className="flex items-start gap-2.5 pt-2 border-t border-white/5">
                <span className="font-mono text-[9px] font-bold bg-white/10 text-brand-cream px-1.5 py-0.5 rounded leading-none shrink-0 uppercase mt-0.5">
                  TUE
                </span>
                <div className="space-y-0.5">
                  <span className="font-bold text-white block leading-none">Discipleship Classes</span>
                  <span className="text-[11px] text-brand-cream/70 block font-mono">5:00 PM - 6:00 PM</span>
                </div>
              </div>

              {/* Wednesday */}
              <div className="flex items-start gap-2.5 pt-2 border-t border-white/5">
                <span className="font-mono text-[9px] font-bold bg-white/10 text-brand-cream px-1.5 py-0.5 rounded leading-none shrink-0 uppercase mt-0.5">
                  WED
                </span>
                <div className="space-y-0.5">
                  <span className="font-bold text-white block leading-none">Midweek Prayer</span>
                  <span className="text-[11px] text-brand-cream/70 block font-mono">5:00 PM - 7:00 PM</span>
                </div>
              </div>

              {/* Friday */}
              <div className="flex items-start gap-2.5 pt-2 border-t border-white/5">
                <span className="font-mono text-[9px] font-bold bg-white/10 text-brand-cream px-1.5 py-0.5 rounded leading-none shrink-0 uppercase mt-0.5">
                  FRI
                </span>
                <div className="space-y-0.5">
                  <span className="font-bold text-white block leading-none">Overnight Prayer</span>
                  <span className="text-[11px] text-brand-cream/70 block font-mono">10:00 PM Onwards</span>
                </div>
              </div>

              {/* Saturday */}
              <div className="flex items-start gap-2.5 pt-2 border-t border-white/5">
                <span className="font-mono text-[9px] font-bold bg-[#E2A600]/20 text-[#E2A600] px-1.5 py-0.5 rounded leading-none shrink-0 uppercase mt-0.5">
                  SAT
                </span>
                <div className="space-y-0.5">
                  <span className="font-bold text-white block leading-none">Choir Practices</span>
                  <span className="text-[11px] text-brand-cream/70 block font-mono">6:00 PM - 10:00 PM</span>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Details column (Col 11-12) */}
          <div className="lg:col-span-2 space-y-4 text-xs font-sans text-brand-cream/80">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-gold">
              Contact Desk
            </h4>
            <div className="h-0.5 w-12 bg-brand-gold" />
            
            <div className="space-y-3 leading-relaxed">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Africa+Renewal+University,+Buloba,+Mityana+Road,+Uganda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 group/footaddr hover:text-brand-gold cursor-pointer transition-colors"
                title="Get directions on Google Maps"
              >
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5 group-hover/footaddr:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="font-medium text-brand-cream group-hover/footaddr:underline decoration-brand-gold/40">Along Mityana Rd, Buloba Trading Centre.</span>
                  <span className="font-light text-xxs text-brand-cream/70">Located at Africa Renewal University grounds.</span>
                </div>
              </a>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div className="font-mono font-medium text-xs flex flex-col">
                    <span>+256 709 634 182</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="truncate">rmwawasi@afru.ac.ug</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenPlanVisit}
                className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-brown font-display font-extrabold text-[10px] uppercase tracking-widest py-2 rounded transition-colors cursor-pointer"
              >
                Plan Your Visit Now
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copy/Top Segment */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xxs font-mono text-brand-cream/60">
          <div>
            © {currentYear} <strong>RENEWAL CHURCH BULOBA</strong>. All Rights Reserved. Co-operating with local community cell divisions.
          </div>
          
          <div className="flex items-center gap-2">
            <span>Prepared for a Harvest</span>
            <span>•</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-white/5 hover:bg-white/10 text-white p-2 rounded-lg cursor-pointer flex items-center gap-1 transition-all"
              title="Return to top level"
            >
              <ArrowUp className="w-3 h-3" /> Top
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
