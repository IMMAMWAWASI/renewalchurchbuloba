/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Announcements from "./components/Announcements";
import LiveBanner from "./components/LiveBanner";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Sermons from "./components/Sermons";
import Events from "./components/Events";
import Ministries from "./components/Ministries";
import Give from "./components/Give";
import LifeGroups from "./components/LifeGroups";
import PrayerWall from "./components/PrayerWall";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import PlanYourVisitModal from "./components/PlanYourVisitModal";
import ChoirSlideshow from "./components/ChoirSlideshow";
import { Sparkles, ArrowRight, Play, HeartHandshake, Calendar, MessageSquare, Quote } from "lucide-react";
import { TESTIMONIALS, EVENTS, ANNOUNCEMENTS } from "./data";
import { ChurchEvent } from "./types";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("home");
  const [isPlanVisitOpen, setIsPlanVisitOpen] = useState<boolean>(false);

  // Shared state for the list of upcoming events
  const [eventsList, setEventsList] = useState<ChurchEvent[]>(() => {
    const saved = localStorage.getItem("church_events");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ChurchEvent[];
        // Always update previously stored static events with current static details
        const merged = parsed.map((ev) => {
          const staticEv = EVENTS.find((s) => s.id === ev.id);
          return staticEv ? { ...ev, ...staticEv } : ev;
        });
        EVENTS.forEach((staticEv) => {
          if (!merged.some((ev) => ev.id === staticEv.id)) {
            merged.push(staticEv);
          }
        });
        return merged;
      } catch (err) {
        return EVENTS;
      }
    }
    return EVENTS;
  });

  const handleAddEvent = (newEvent: ChurchEvent) => {
    const updated = [newEvent, ...eventsList];
    setEventsList(updated);
    localStorage.setItem("church_events", JSON.stringify(updated));
  };


  // Dynamically compute announcements from static announcements + upcoming events
  const dynamicAnnouncements = React.useMemo(() => {
    const list = [...ANNOUNCEMENTS];

    // Parse dates safely using local dates to avoid timezone shifts.
    const getEventDate = (date: string): Date | null => {
      const dateOnly = date.split("T")[0];
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateOnly);

      if (match) {
        const year = Number(match[1]);
        const month = Number(match[2]) - 1;
        const day = Number(match[3]);

        const parsed = new Date(year, month, day);

        // Reject invalid calendar dates.
        if (
          parsed.getFullYear() !== year ||
          parsed.getMonth() !== month ||
          parsed.getDate() !== day
        ) {
          return null;
        }

        return parsed;
      }

      const parsed = new Date(date);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    };

    // Today's date, with the time set to midnight.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Sort events chronologically; invalid dates go last.
    const sortedEvents = [...eventsList].sort((a, b) => {
      const dateA = getEventDate(a.date);
      const dateB = getEventDate(b.date);

      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;

      return dateA.getTime() - dateB.getTime();
    });

    sortedEvents.forEach((ev) => {
      const eventDate = getEventDate(ev.date);

      // Do not announce events with invalid or past dates.
      if (!eventDate || eventDate < today) return;

      const dateFormatted = eventDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      list.push({
        id: `dynamic-ann-${ev.id}`,
        text: `📅 NOTICE: [${ev.category}] "${ev.title}" is coming up on ${dateFormatted} at ${ev.time} (${ev.location})!`,
        linkText: "View Details",
        targetView: "events",
      });
    });

    return list;
  }, [eventsList]);

  // Auto-scroll to top when view/tab alterations occur
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const handleOpenPlanVisit = () => {
    setIsPlanVisitOpen(true);
  };

  const handleClosePlanVisit = () => {
    setIsPlanVisitOpen(false);
  };

  // Render the specific view requested
  const renderView = () => {
    switch (currentView) {
      case "home":
        return (
          <div className="space-y-0 animate-fade-in" id="church-home-view">
            {/* Hero Main Slider */}
            <Hero onNavigate={handleNavigate} onOpenPlanVisit={handleOpenPlanVisit} />
            
            {/* Counter stats & 2026 spiritual theme */}
            <Stats onNavigate={handleNavigate} />
            
            {/* Quick About panel segment */}
            <About showStatementOfFaith={false} />

            {/* In-Home dynamic snippets showcase */}
            <section className="py-20 bg-brand-cream/15 border-t border-b border-brand-brown/5" id="home-featured-showcase">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-brand-brown font-mono text-xs font-bold uppercase tracking-widest block">
                    Ongoing Highlights
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-brown tracking-tight">
                    FEATURED FELLOWSHIPS & SERMONS
                  </h3>
                  <div className="h-0.5 w-16 bg-brand-gold mx-auto mt-2" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Sermon quick block */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-brand-brown/10 text-left space-y-4 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <span className="text-brand-brown font-mono text-xxs font-extrabold uppercase bg-brand-gold/15 py-1 px-3 rounded-full border border-brand-gold/25 inline-block">
                        Featured Message
                      </span>
                      <h4 className="font-display text-xl font-bold text-brand-brown leading-tight">
                        Prepared for a Harvest: Sowing in Righteousness
                      </h4>
                      <p className="text-xs text-brand-charcoal-light leading-relaxed font-sans font-light">
                        Unpack what it means to break up fallow ground and cultivate active spiritual alignment for God's blessing in Buloba. Stream Full Sermon.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-brand-brown/5 flex items-center justify-between">
                      <span className="text-xxs text-brand-charcoal-light/60 font-mono">By Ps. Renson Mwawasi</span>
                      <button
                        onClick={() => handleNavigate("sermons")}
                        className="text-xs text-brand-brown hover:text-brand-gold font-bold font-display uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        See more <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Cell quick block */}
                  <div className="bg-brand-brown text-white rounded-3xl p-6 md:p-8 border border-brand-gold/15 text-left space-y-4 flex flex-col justify-between shadow-xl">
                    <div className="space-y-3">
                      <span className="text-brand-gold font-mono text-xxs font-extrabold uppercase bg-white/10 py-1 px-3 rounded-full border border-white/5 inline-block">
                        Community Call
                      </span>
                      <h4 className="font-display text-xl font-bold text-white leading-tight">
                        Find a Local Home Cell Fellowship
                      </h4>
                      <p className="text-xs text-brand-cream/80 leading-relaxed font-sans font-light">
                        Connect with neighbors, share testimonies, and review the word in our active midweek groups meeting every Tuesday and Thursday inside Buloba village sectors.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xxs text-brand-cream/60 font-mono">6 Cell Sectors Active</span>
                      <button
                        onClick={() => handleNavigate("lifegroups")}
                        className="text-xs text-brand-gold hover:text-white font-bold font-display uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        Browse Cell Map <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Dynamic Choir Spotlight & Interactive Slideshow */}
            <ChoirSlideshow onNavigate={handleNavigate} />

            {/* Testimonials Segment */}
            <section className="py-20 bg-white" id="home-community-testimonials">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-brand-brown font-mono text-xs font-bold uppercase tracking-widest block">
                    True Stories
                  </span>
                  <h3 className="font-display text-3xl font-extrabold text-brand-brown tracking-tight">
                    COMMUNITY TESTIMONIES
                  </h3>
                  <p className="text-xs text-brand-charcoal-light">
                    How God is restoring souls, transforming standard Ugandan homes, and reviving faith in Buloba.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TESTIMONIALS.map((t) => (
                    <div
                      key={t.id}
                      className="bg-brand-cream/20 p-6 rounded-2xl border border-brand-brown/5 relative text-left flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="absolute top-4 right-4 text-brand-gold/15">
                        <Quote className="w-10 h-10 fill-current" />
                      </span>
                      
                      <p className="font-serif italic text-xs.5 text-brand-charcoal/90 leading-relaxed pt-2">
                        “{t.text}”
                      </p>

                      <div className="pt-6 mt-6 border-t border-brand-brown/5 flex items-center gap-2 text-xxs font-sans font-bold text-brand-brown">
                        <div>
                          <span className="block">{t.name}</span>
                          <span className="block text-brand-charcoal-light/65 font-mono text-[9px] font-normal">{t.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick FAQ summary anchor */}
            <FAQ />
            
            {/* Quick Contact snippet visual */}
            <Contact />
          </div>
        );
      case "about":
        return <About />;
      case "ministries":
        return <Ministries />;
      case "events":
        return (
          <Events 
            onNavigate={handleNavigate} 
            eventsList={eventsList}
            onAddEvent={handleAddEvent}
            onUpdateEvents={(updatedList) => {
              setEventsList(updatedList);
              localStorage.setItem("church_events", JSON.stringify(updatedList));
            }}
          />
        );
      case "sermons":
        return <Sermons />;
      case "lifegroups":
        return <LifeGroups />;
      case "give":
        return <Give />;
      case "prayer":
        return <PrayerWall />;
      case "contact":
        return <Contact />;
      default:
        return <Hero onNavigate={handleNavigate} onOpenPlanVisit={handleOpenPlanVisit} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream antialiased" id="renewal-church-app-root">
      
      {/* Top Banner Notice Rotator */}
      <Announcements onNavigate={handleNavigate} announcements={dynamicAnnouncements} />

      {/* Real-time Broadcast schedule ticker */}
      <LiveBanner onWatchOnline={() => handleNavigate("sermons")} />

      {/* Main sticky navigation header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenPlanVisit={handleOpenPlanVisit}
      />

      {/* Main viewport render content */}
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* Universal footer */}
      <Footer onNavigate={handleNavigate} onOpenPlanVisit={handleOpenPlanVisit} />

      {/* Floating immediate Whatsapp outreach */}
      <WhatsAppButton />

      {/* Dialog overlay for Plan Your Visit CTA */}
      <PlanYourVisitModal isOpen={isPlanVisitOpen} onClose={handleClosePlanVisit} />
      
    </div>
  );
}
