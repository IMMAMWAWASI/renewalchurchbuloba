
import React, { useState } from "react";
import { EVENTS } from "../data";
import { ChurchEvent } from "../types";
import {
  Calendar,
  MapPin,
  Clock,
  Search,
  CheckCircle,
  Ticket,
  X,
  CalendarCheck2,
} from "lucide-react";

interface EventsProps {
  onNavigate?: (view: string) => void;
  eventsList?: ChurchEvent[];
  onAddEvent?: (newEvent: ChurchEvent) => void;
  onUpdateEvents?: (updatedList: ChurchEvent[]) => void;
}

export default function Events({
  onNavigate,
  eventsList: propsEventsList,
  onAddEvent,
  onUpdateEvents,
}: EventsProps) {
  const [localEventsList, setLocalEventsList] = useState<ChurchEvent[]>(() => {
    const saved = localStorage.getItem("church_events");

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ChurchEvent[];

        const customEvents = parsed.filter(
          (ev) =>
            ![
              "ev-1",
              "ev-2",
              "ev-3",
              "ev-4",
              "ev-5",
              "ev-6",
              "ev-7",
              "ev-discipleship-leadership",
              "ev-financial-literacy-2",
            ].includes(ev.id) &&
            !EVENTS.some((event) => event.id === ev.id)
        );

        return [...EVENTS, ...customEvents];
      } catch (err) {
        console.error("Could not load saved church events:", err);
        return EVENTS;
      }
    }

    return EVENTS;
  });

  const displayEvents = propsEventsList || localEventsList;

  const [activeCategory, setActiveCategory] = useState<
    "All" | "Youth" | "Women" | "Men" | "Prayer" | "Outreach" | "General"
  >("All");

  const [registeringEvent, setRegisteringEvent] =
    useState<ChurchEvent | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  // Add Event Form State
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  const [addFormData, setAddFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "General" as ChurchEvent["category"],
    requiresRegistration: false,
    image: "",
  });

  // Registration state
  const [successEventId, setSuccessEventId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    seats: "1",
  });

  // Event categories
  const categories: (
    | "All"
    | "Youth"
    | "Women"
    | "Men"
    | "Prayer"
    | "Outreach"
    | "General"
  )[] = ["All", "Prayer", "Men", "Women", "Youth", "Outreach", "General"];

  // Map events to their hosting ministry IDs.
  const getMinistryIdForEvent = (
    eventId: string,
    category: string
  ): string => {
    if (eventId === "ev-6") return "min-1";
    if (eventId === "ev-2") return "min-2";
    if (eventId === "ev-3") return "min-4";
    if (eventId === "ev-4") return "min-5";
    if (eventId === "ev-1" || eventId === "ev-5") return "min-6";
    if (eventId === "ev-7") return "min-3";

    // Category fallbacks
    if (category === "Women") return "min-4";
    if (category === "Men") return "min-5";
    if (category === "Youth") return "min-2";
    if (category === "Outreach") return "min-6";
    if (category === "Prayer") return "min-8";

    return "min-3";
  };

  // Open the registration form.
  const handleRegisterClick = (event: ChurchEvent) => {
    setRegisteringEvent(event);
  };

  // Submit event registration.
  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !registeringEvent) {
      return;
    }

    const seats = Number.parseInt(formData.seats, 10);

    const updated = displayEvents.map((ev) =>
      ev.id === registeringEvent.id
        ? {
            ...ev,
            registeredCount: (ev.registeredCount || 0) + seats,
          }
        : ev
    );

    if (onUpdateEvents) {
      onUpdateEvents(updated);
    } else {
      setLocalEventsList(updated);
      localStorage.setItem("church_events", JSON.stringify(updated));
    }

    // Save the registration locally.
    try {
      const previousRegistrations = JSON.parse(
        localStorage.getItem("event_registrations") || "[]"
      );

      const newReg = {
        id: Date.now().toString(),
        eventId: registeringEvent.id,
        eventTitle: registeringEvent.title,
        ...formData,
        dateRegistered: new Date().toLocaleDateString(),
      };

      localStorage.setItem(
        "event_registrations",
        JSON.stringify([newReg, ...previousRegistrations])
      );
    } catch (err) {
      console.error("Could not save event registration:", err);
    }

    // Show registration success.
    setSuccessEventId(registeringEvent.id);
    setRegisteringEvent(null);
    setFormData({ name: "", phone: "", seats: "1" });

    window.setTimeout(() => {
      setSuccessEventId(null);
    }, 6000);
  };

  // Add a new fellowship event.
  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !addFormData.title.trim() ||
      !addFormData.date ||
      !addFormData.time.trim() ||
      !addFormData.location.trim()
    ) {
      return;
    }

    // Default event images.
    // The Women image uses a public URL rather than a /src/assets path.
    const categoryImages: Record<string, string> = {
      Prayer:
        "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=600&auto=format&fit=crop",
      Men:
        "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=600&auto=format&fit=crop",
      Women:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop",
      Youth:
        "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop",
      Outreach:
        "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=600&auto=format&fit=crop",
      General:
        "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=600&auto=format&fit=crop",
    };

    const finalImage =
      addFormData.image.trim() ||
      categoryImages[addFormData.category] ||
      categoryImages.General;

    const newEvent: ChurchEvent = {
      id: "ev-" + Date.now().toString(),
      title: addFormData.title.trim(),
      date: addFormData.date,
      time: addFormData.time.trim(),
      location: addFormData.location.trim(),
      description:
        addFormData.description.trim() ||
        "A wonderful fellowship circle gathering at Renewal Church Buloba.",
      category: addFormData.category,
      image: finalImage,
      requiresRegistration: addFormData.requiresRegistration,
      registeredCount: 0,
    };

    if (onAddEvent) {
      onAddEvent(newEvent);
    } else {
      setLocalEventsList((prev) => {
        const updated = [newEvent, ...prev];

        localStorage.setItem("church_events", JSON.stringify(updated));

        return updated;
      });
    }

    setIsAddEventOpen(false);

    setAddFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      category: "General",
      requiresRegistration: false,
      image: "",
    });
  };

  // ---------------------------------------------------------
  // EVENT DATE HELPERS
  // Use Uganda's calendar date for automatic event status.
  // ---------------------------------------------------------

  const getEventDateInfo = (date: string) => {
    // Handle date-only values such as "2026-10-10".
    // Match the entire string so timestamps are handled separately.
    const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

    if (dateOnlyMatch) {
      const year = Number(dateOnlyMatch[1]);
      const month = Number(dateOnlyMatch[2]);
      const day = Number(dateOnlyMatch[3]);

      const calendarDate = new Date(year, month - 1, day);

      // Reject invalid calendar dates.
      if (
        calendarDate.getFullYear() !== year ||
        calendarDate.getMonth() !== month - 1 ||
        calendarDate.getDate() !== day
      ) {
        return {
          key: null as string | null,
          displayDate: null as Date | null,
        };
      }

      return {
        key: `${dateOnlyMatch[1]}-${dateOnlyMatch[2]}-${dateOnlyMatch[3]}`,
        displayDate: calendarDate,
      };
    }

    // Handle timestamps using Uganda's timezone.
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return {
        key: null as string | null,
        displayDate: null as Date | null,
      };
    }

    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Africa/Kampala",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(parsed);

    const getPart = (type: string) =>
      parts.find((part) => part.type === type)?.value ?? "";

    const year = getPart("year");
    const month = getPart("month");
    const day = getPart("day");

    return {
      key: `${year}-${month}-${day}`,
      displayDate: new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
      ),
    };
  };

  // Get today's date in Uganda.
  const todayParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Kampala",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const todayPart = (type: string) =>
    todayParts.find((part) => part.type === type)?.value ?? "";

  const todayKey = `${todayPart("year")}-${todayPart(
    "month"
  )}-${todayPart("day")}`;

  // Automatically determine whether an event has passed.
  // Events happening today remain current for the whole day.
  const isEventPast = (event: ChurchEvent) => {
    const eventDate = getEventDateInfo(event.date);

    return eventDate.key !== null && eventDate.key < todayKey;
  };

  // Filter events and sort upcoming events before passed events.
  const filteredEvents = displayEvents
    .filter((ev) => {
      const matchesCategory =
        activeCategory === "All" || ev.category === activeCategory;

      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        ev.title.toLowerCase().includes(query) ||
        ev.description.toLowerCase().includes(query) ||
        ev.location.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const aPast = isEventPast(a);
      const bPast = isEventPast(b);

      // Upcoming events first; passed events below them.
      if (aPast !== bPast) {
        return aPast ? 1 : -1;
      }

      const dateA = getEventDateInfo(a.date).key;
      const dateB = getEventDateInfo(b.date).key;

      // Invalid dates go after valid dates.
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;

      // Upcoming: nearest first.
      // Passed: most recently completed first.
      return aPast
        ? dateB.localeCompare(dateA)
        : dateA.localeCompare(dateB);
    });

  return (
    <section id="church-events-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl text-left">
            <span className="text-brand-brown font-mono text-xs font-bold uppercase tracking-widest block">
              Active Community
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-brown">
              UPCOMING CHURCH EVENTS
            </h3>

            <p className="text-sm text-brand-charcoal-light leading-relaxed">
              We draw closer as a spiritual community through active,
              specialized fellowship cells. Search events, secure your
              attendance pass, or browse completed gatherings.
            </p>
          </div>

          {/* Search and Add Event */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-stretch sm:items-center">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal-light/60" />

              <input
                type="text"
                placeholder="Search church events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-sans p-3 pl-10 rounded-xl bg-brand-cream border border-brand-brown/10 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsAddEventOpen(true)}
              className="bg-brand-brown hover:bg-brand-charcoal hover:scale-[1.01] transition-all duration-150 text-white font-display font-semibold text-xs px-5 py-3 rounded-xl cursor-pointer flex items-center justify-center gap-2 border border-brand-gold/15 shadow-sm whitespace-nowrap"
            >
              <CalendarCheck2 className="w-4 h-4 text-brand-gold" />
              Add Fellowship Event
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-start md:justify-center border-b border-brand-brown/10 pb-4">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-display font-semibold uppercase tracking-widest rounded-full cursor-pointer transition-all duration-200 focus:outline-none ${
                activeCategory === cat
                  ? "bg-brand-brown text-white shadow-md shadow-brand-brown/20"
                  : "bg-brand-cream text-brand-charcoal-light hover:bg-brand-brown/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Registration Success Message */}
        {successEventId && (
          <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-3xl text-left animate-fade-in flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />

            <div>
              <h5 className="font-serif text-sm font-bold text-green-800">
                Attendance Pass Confirmed!
              </h5>

              <p className="text-xs text-green-700 leading-relaxed mt-0.5">
                Your registration has been recorded in this browser. We look
                forward to fellowshipping with you!
              </p>
            </div>
          </div>
        )}

        {/* Timeline Event Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredEvents.map((ev) => {
            const dateInfo = getEventDateInfo(ev.date);
            const eventIsPast = isEventPast(ev);

            return (
              <div
                key={ev.id}
                id={`event-row-${ev.id}`}
                className="bg-brand-cream/30 rounded-3xl overflow-hidden border border-brand-brown/5 flex flex-col md:flex-row hover:shadow-lg transition-all duration-300"
              >
                {/* Event Image */}
                <div className="md:w-2/5 h-48 md:h-auto relative bg-brand-brown/10 overflow-hidden">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                    className={`w-full h-full object-cover ${
                      eventIsPast ? "grayscale brightness-75" : ""
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-brown/70 via-transparent to-transparent" />

                  {/* Past Event Stamp */}
                  {eventIsPast && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 pointer-events-none overflow-hidden">
                      <div className="transform -rotate-12 bg-red-600 text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest px-6 py-2 border-2 border-white shadow-2xl rounded drop-shadow-2xl">
                        PASSED / OVER
                      </div>
                    </div>
                  )}

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-brand-brown p-2.5 rounded-2xl text-center text-white border border-brand-gold/20 shadow-md z-10">
                    <span className="block font-mono text-[10px] font-bold leading-none tracking-widest text-brand-gold">
                      {dateInfo.displayDate
                        ?.toLocaleDateString("en", { month: "short" })
                        .toUpperCase() ?? "DATE"}
                    </span>

                    <span className="block font-serif text-lg font-extrabold leading-tight mt-0.5">
                      {dateInfo.displayDate?.getDate() ?? "—"}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6 md:w-3/5 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xxs font-mono font-semibold uppercase text-brand-gold">
                      <span className="bg-brand-brown/10 px-2 py-0.5 rounded text-brand-brown">
                        {ev.category} Fellowship
                      </span>

                      {eventIsPast && (
                        <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">
                          CONCLUDED
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-lg font-bold text-brand-brown leading-tight">
                      {ev.title}
                    </h4>

                    <p className="text-xs text-brand-charcoal-light/85 leading-relaxed line-clamp-3">
                      {ev.description}
                    </p>
                  </div>

                  {/* Event Time and Location */}
                  <div className="text-xxs font-sans space-y-1.5 text-brand-charcoal/70 pt-2 border-t border-brand-brown/10">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span>{ev.time}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span className="truncate">{ev.location}</span>
                    </div>
                  </div>

                  {/* Registration and Ministry Links */}
                  <div className="pt-2 space-y-2">
                    {eventIsPast ? (
                      <div className="bg-red-50 text-red-700 border border-red-200 py-2 px-3 text-center rounded-lg text-xs font-bold font-mono tracking-wider uppercase flex items-center justify-center gap-1.5">
                        Event Concluded / Passed
                      </div>
                    ) : ev.requiresRegistration ? (
                      <button
                        type="button"
                        onClick={() => handleRegisterClick(ev)}
                        className="bg-brand-brown hover:bg-brand-charcoal text-white font-display font-semibold transition-colors duration-150 text-xs px-4 py-2 rounded-lg cursor-pointer flex items-center justify-center gap-1.5 w-full"
                      >
                        <Ticket className="w-3.5 h-3.5 text-brand-gold" />
                        Secure Entry Pass
                      </button>
                    ) : (
                      <div className="bg-slate-100 py-1.5 px-3 text-center border border-slate-200 text-brand-charcoal-light rounded-lg text-xxs font-semibold font-mono tracking-wide">
                        OPEN TO ALL
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        const minId = getMinistryIdForEvent(
                          ev.id,
                          ev.category
                        );

                        localStorage.setItem("pending_ministry_focus", minId);

                        if (onNavigate) {
                          onNavigate("ministries");
                        }
                      }}
                      className="w-full text-[10px] font-mono font-bold uppercase tracking-wider text-brand-brown hover:text-[#E2A600] flex items-center justify-center gap-1 bg-brand-brown/5 hover:bg-brand-brown/10 py-1.5 px-3 rounded-lg group transition-all"
                      title="Join the organizing team or committee for this activity"
                    >
                      Join Organizing Committee / Ministry
                      <span className="group-hover:translate-x-1 transition-transform">
                        ➔
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredEvents.length === 0 && (
            <div className="col-span-full bg-brand-cream/15 p-12 text-center rounded-3xl border border-brand-brown/5">
              <Calendar className="w-9 h-9 mx-auto text-brand-brown/50" />

              <h4 className="font-display text-lg font-bold text-brand-brown mt-3">
                No Fellowship Circles Found
              </h4>

              <p className="text-xs text-brand-charcoal-light mt-1">
                Try another search term or category. Please check back for
                upcoming church events.
              </p>
            </div>
          )}
        </div>

        {/* Add Fellowship Event Modal */}
        {isAddEventOpen && (
          <div
            id="add-event-backdrop"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-charcoal/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsAddEventOpen(false)}
          >
            <div
              className="bg-white text-brand-charcoal rounded-2xl max-w-lg w-full overflow-hidden border border-brand-brown/10 shadow-2xl relative my-8 animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-brand-brown p-5 text-white">
                <button
                  type="button"
                  onClick={() => setIsAddEventOpen(false)}
                  className="absolute top-4 right-4 text-brand-cream hover:text-brand-gold p-1.5 rounded-full bg-white/5 cursor-pointer"
                  aria-label="Close Dialog"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <CalendarCheck2 className="w-5 h-5 text-brand-gold" />
                  <span className="font-display font-extrabold text-sm uppercase tracking-wider text-brand-gold">
                    Live Portal
                  </span>
                </div>

                <h4 className="font-serif text-lg font-bold mt-1 text-white leading-snug">
                  Add Fellowship Event
                </h4>
              </div>

              <form
                onSubmit={handleAddEventSubmit}
                className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-left"
              >
                {/* Event Title */}
                <div>
                  <label className="block text-xxs font-bold uppercase tracking-wider text-brand-brown mb-1 font-display">
                    Event Title *
                  </label>

                  <input
                    type="text"
                    required
                    value={addFormData.title}
                    onChange={(e) =>
                      setAddFormData({
                        ...addFormData,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g. Youth Encounter Rally"
                    className="w-full text-xs font-sans p-2.5 rounded-lg border border-brand-brown/15 focus:ring-2 focus:ring-brand-gold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Event Date */}
                  <div>
                    <label className="block text-xxs font-bold uppercase tracking-wider text-brand-brown mb-1 font-display">
                      Event Date *
                    </label>

                    <input
                      type="date"
                      required
                      value={addFormData.date}
                      onChange={(e) =>
                        setAddFormData({
                          ...addFormData,
                          date: e.target.value,
                        })
                      }
                      className="w-full text-xs font-sans p-2.5 rounded-lg border border-brand-brown/15 focus:ring-2 focus:ring-brand-gold focus:outline-none"
                    />
                  </div>

                  {/* Event Time */}
                  <div>
                    <label className="block text-xxs font-bold uppercase tracking-wider text-brand-brown mb-1 font-display">
                      Time / Duration *
                    </label>

                    <input
                      type="text"
                      required
                      value={addFormData.time}
                      onChange={(e) =>
                        setAddFormData({
                          ...addFormData,
                          time: e.target.value,
                        })
                      }
                      placeholder="e.g. 5:00 PM - 7:30 PM"
                      className="w-full text-xs font-sans p-2.5 rounded-lg border border-brand-brown/15 focus:ring-2 focus:ring-brand-gold focus:outline-none"
                    />
                  </div>
                </div>

                {/* Event Location */}
                <div>
                  <label className="block text-xxs font-bold uppercase tracking-wider text-brand-brown mb-1 font-display">
                    Gathering Location *
                  </label>

                  <input
                    type="text"
                    required
                    value={addFormData.location}
                    onChange={(e) =>
                      setAddFormData({
                        ...addFormData,
                        location: e.target.value,
                      })
                    }
                    placeholder="e.g. Main Tabernacle, Renewal Church"
                    className="w-full text-xs font-sans p-2.5 rounded-lg border border-brand-brown/15 focus:ring-2 focus:ring-brand-gold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Event Category */}
                  <div>
                    <label className="block text-xxs font-bold uppercase tracking-wider text-brand-brown mb-1 font-display">
                      Fellowship Category *
                    </label>

                    <select
                      value={addFormData.category}
                      onChange={(e) =>
                        setAddFormData({
                          ...addFormData,
                          category: e.target.value as ChurchEvent["category"],
                        })
                      }
                      className="w-full text-xs font-sans p-2.5 rounded-lg border border-brand-brown/15 focus:ring-2 focus:ring-brand-gold focus:outline-none bg-white font-semibold"
                    >
                      <option value="General">General Assembly</option>
                      <option value="Prayer">Prayer &amp; Altar</option>
                      <option value="Men">Men's Ministry</option>
                      <option value="Women">Women's Fellowship</option>
                      <option value="Youth">Youth Street Ministry</option>
                      <option value="Outreach">Community Outreach</option>
                    </select>
                  </div>

                  {/* Optional Custom Image */}
                  <div>
                    <label className="block text-xxs font-bold uppercase tracking-wider text-brand-brown mb-1 font-display">
                      Custom Image URL (Optional)
                    </label>

                    <input
                      type="url"
                      value={addFormData.image}
                      onChange={(e) =>
                        setAddFormData({
                          ...addFormData,
                          image: e.target.value,
                        })
                      }
                      placeholder="https://example.com/image.jpg"
                      className="w-full text-xs font-sans p-2.5 rounded-lg border border-brand-brown/15 focus:ring-2 focus:ring-brand-gold focus:outline-none"
                    />
                  </div>
                </div>

                {/* Event Description */}
                <div>
                  <label className="block text-xxs font-bold uppercase tracking-wider text-brand-brown mb-1 font-display">
                    Brief Description
                  </label>

                  <textarea
                    rows={3}
                    value={addFormData.description}
                    onChange={(e) =>
                      setAddFormData({
                        ...addFormData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Provide details about the event, guests, or items to carry..."
                    className="w-full text-xs font-sans p-2.5 rounded-lg border border-brand-brown/15 focus:ring-2 focus:ring-brand-gold focus:outline-none resize-none"
                  />
                </div>

                {/* Registration Requirement */}
                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="requiresRegistration"
                    checked={addFormData.requiresRegistration}
                    onChange={(e) =>
                      setAddFormData({
                        ...addFormData,
                        requiresRegistration: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-brand-gold focus:ring-brand-gold border-brand-brown/10 rounded cursor-pointer"
                  />

                  <label
                    htmlFor="requiresRegistration"
                    className="text-xxs font-bold uppercase tracking-wider text-brand-brown cursor-pointer select-none"
                  >
                    Requires Free Entry Pass Booking?
                  </label>
                </div>

                {/* Modal Buttons */}
                <div className="pt-2 flex gap-3 text-center">
                  <button
                    type="button"
                    onClick={() => setIsAddEventOpen(false)}
                    className="flex-1 p-2.5 rounded-lg text-xs font-semibold bg-brand-cream hover:bg-brand-brown/5 text-brand-brown border border-brand-brown/10 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 p-2.5 rounded-lg text-xs font-bold bg-brand-brown hover:bg-brand-charcoal text-white cursor-pointer transition-colors"
                  >
                    Publish Event &amp; Notice
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Event Registration Modal */}
        {registeringEvent && (
          <div
            id="event-registration-backdrop"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-charcoal/85 backdrop-blur-md"
            onClick={() => setRegisteringEvent(null)}
          >
            <div
              className="bg-white text-brand-charcoal rounded-2xl max-w-md w-full overflow-hidden border border-brand-brown/10 shadow-2xl relative animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-brand-brown p-5 text-white">
                <button
                  type="button"
                  onClick={() => setRegisteringEvent(null)}
                  className="absolute top-4 right-4 text-brand-cream hover:text-brand-gold p-1.5 rounded-full bg-white/5 cursor-pointer"
                  aria-label="Close Registration Dialog"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <CalendarCheck2 className="w-5 h-5 text-brand-gold" />

                  <span className="font-display font-extrabold text-sm uppercase tracking-wider text-brand-gold">
                    Free Seminar Pass
                  </span>
                </div>

                <h4 className="font-display text-base font-bold mt-1 text-white leading-snug">
                  {registeringEvent.title}
                </h4>
              </div>

              {/* Registration Form */}
              <form
                onSubmit={handleRegistrationSubmit}
                className="p-5 space-y-4"
              >
                <p className="text-xxs text-brand-charcoal-light leading-relaxed">
                  Join our fellowship by securing an entry pass. Enter your
                  contact details so our coordinator can provide further
                  instructions.
                </p>

                {/* Name */}
                <div className="text-left">
                  <label className="block text-xxs font-bold uppercase tracking-wider text-brand-brown mb-1 font-display">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Juliet Namata"
                    className="w-full text-xs font-sans p-2.5 rounded-lg border border-brand-brown/15 focus:ring-2 focus:ring-brand-gold focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <div className="text-left">
                  <label className="block text-xxs font-bold uppercase tracking-wider text-brand-brown mb-1 font-display">
                    Contact Phone (Uganda) *
                  </label>

                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    placeholder="e.g. +256 701 123456"
                    className="w-full text-xs font-sans p-2.5 rounded-lg border border-brand-brown/15 focus:ring-2 focus:ring-brand-gold focus:outline-none"
                  />
                </div>

                {/* Number of Seats */}
                <div className="text-left">
                  <label className="block text-xxs font-bold uppercase tracking-wider text-brand-brown mb-1 font-display">
                    How many seats to reserve?
                  </label>

                  <select
                    value={formData.seats}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seats: e.target.value,
                      })
                    }
                    className="w-full text-xs font-sans p-2.5 rounded-lg border border-brand-brown/15 focus:ring-2 focus:ring-brand-gold focus:outline-none bg-white font-semibold text-brand-charcoal"
                  >
                    <option value="1">1 Seat (Just me)</option>
                    <option value="2">2 Seats</option>
                    <option value="3">3 Seats</option>
                    <option value="4">4 Seats</option>
                    <option value="5">5 Seats (Max family reserve)</option>
                  </select>
                </div>

                {/* Registration Buttons */}
                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setRegisteringEvent(null)}
                    className="flex-1 p-2.5 rounded-lg text-xs font-semibold bg-brand-cream hover:bg-brand-brown/5 text-brand-brown border border-brand-brown/10 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 p-2.5 rounded-lg text-xs font-bold bg-brand-gold hover:bg-brand-gold-light text-brand-brown cursor-pointer"
                  >
                    Confirm My Pass
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
