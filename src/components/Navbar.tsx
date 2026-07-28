import React, { useState, useEffect } from "react";
import { Menu, X, Heart, MapPin, Calendar, HeartHandshake } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenPlanVisit: () => void;
}

export default function Navbar({ currentView, onNavigate, onOpenPlanVisit }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor screen scrolls to add beautiful solid background & shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Ministries", id: "ministries" },
    { name: "Events", id: "events" },
    { name: "Sermons", id: "sermons" },
    { name: "Life Groups", id: "lifegroups" },
    { name: "Give Online", id: "give" },
    { name: "Prayer Requests", id: "prayer" },
    { name: "Contact", id: "contact" },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav
      id="main-church-navigation"
      className={`sticky top-0 z-90 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md border-b border-brand-brown/10 py-3"
          : "bg-brand-cream/95 backdrop-blur-md border-b border-brand-brown/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Official Branding Logo Clickable to Home */}
          <button
            onClick={() => handleLinkClick("home")}
            className="flex items-center cursor-pointer text-left focus:outline-none py-1 group/logo"
            title="Renewal Church Buloba"
          >
            <Logo size={54} showText={true} textColor="dark" className="transition-transform duration-300 group-hover/logo:scale-[1.02]" />
          </button>

          {/* Large Screen Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative font-display text-xs xl:text-xs.5 font-bold uppercase tracking-widest px-3.5 py-2 rounded-full cursor-pointer transition-all duration-200 focus:outline-none ${
                    active
                      ? "text-white bg-brand-brown"
                      : "text-brand-brown/75 hover:text-brand-brown hover:bg-brand-brown/5"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-gold" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Call for Visitors */}
          <div className="hidden sm:block shrink-0">
            <button
              onClick={onOpenPlanVisit}
              className="bg-brand-gold hover:bg-[#E2A600] text-brand-brown font-display font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-lg shadow-brand-gold/20 transition-transform duration-200 active:scale-95 hover:scale-103 cursor-pointer flex items-center gap-1.5"
            >
              <HeartHandshake className="w-4 h-4 text-brand-brown" /> Plan Your Visit
            </button>
          </div>

          {/* Tablet/Mobile Burger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenPlanVisit}
              className="sm:hidden bg-brand-gold text-brand-brown p-2.5 rounded-full shadow hover:bg-brand-gold-light cursor-pointer"
              title="Plan Your Visit"
            >
              <HeartHandshake className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-brown hover:text-brand-gold p-2 cursor-pointer focus:outline-none bg-brand-brown/5 rounded-lg border border-brand-brown/5"
              title="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Drawer Overlay for Mobile viewports */}
      {isOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-brand-cream/98 backdrop-blur-lg border-b border-brand-brown/10 animate-fade-in absolute top-full left-0 w-full p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[85vh]"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full font-display text-sm font-bold uppercase tracking-widest text-left p-3 rounded-lg cursor-pointer transition-colors ${
                    active
                      ? "text-white bg-brand-brown"
                      : "text-brand-brown/80 hover:text-brand-brown hover:bg-brand-brown/5"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Secondary Plan Visit on Mobile */}
          <div className="pt-2 border-t border-brand-brown/10">
            <button
              onClick={() => {
                onOpenPlanVisit();
                setIsOpen(false);
              }}
              className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-brown font-display font-extrabold p-3.5 rounded-xl transition-colors duration-150 flex items-center justify-center gap-2 uppercase tracking-wider text-xs cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4" /> Schedule Visit Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
