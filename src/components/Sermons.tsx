import React, { useState } from "react";
import { SERMONS } from "../data";
import { Calendar, User, Search, Video } from "lucide-react";

export default function Sermons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("All");

  const seriesOptions = ["All", "Harvest Series", "Spiritual Vision", "Hope & Resilience", "Deep Conviction"];

  // Filter list
  const filteredSermons = SERMONS.filter((sermon) => {
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeries = selectedSeries === "All" || sermon.series === selectedSeries;
    return matchesSearch && matchesSeries;
  });

  return (
    <section id="church-sermons-section" className="py-20 bg-brand-cream/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl text-left">
            <span className="text-brand-brown font-mono text-xs font-bold uppercase tracking-widest block">
              Spiritual Nourishment
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-brown">
              RECENT SERMONS & ARCHIVES
            </h3>
            <p className="text-sm text-brand-charcoal-light leading-relaxed">
              Explore our weekly bible-based sermons and theme series shared in our local congregation in Buloba.
            </p>
          </div>

          {/* Filtering Widgets */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal-light/60" />
              <input
                type="text"
                placeholder="Search speaker or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-sans p-3 pl-10 rounded-xl bg-white border border-brand-brown/10 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
            
            {/* Series Dropdown */}
            <select
              value={selectedSeries}
              onChange={(e) => setSelectedSeries(e.target.value)}
              className="p-3 bg-white border border-brand-brown/10 rounded-xl text-xs font-sans text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold cursor-pointer"
            >
              {seriesOptions.map((series) => (
                <option key={series} value={series}>
                  {series}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sermon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSermons.map((sermon) => (
            <div
              key={sermon.id}
              className="bg-white rounded-3xl overflow-hidden border border-brand-brown/5 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              id={`sermon-card-${sermon.id}`}
            >
              <div>
                {/* Thumbnail Display */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-brand-brown/10">
                  <img
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Action Badge */}
                  <div className="absolute top-4 left-4 bg-brand-gold text-brand-brown font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {sermon.series}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-brand-charcoal/80 text-brand-cream/90 font-mono text-xxs px-2 py-0.5 rounded">
                    {sermon.duration}
                  </div>
                </div>

                {/* Information block */}
                <div className="p-6 space-y-3 text-left">
                  <div className="flex items-center gap-4 text-xxs font-mono text-brand-charcoal-light/70">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-gold" />
                      {sermon.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-brand-gold" />
                      {sermon.speaker}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-brand-brown leading-snug group-hover:text-brand-brown-light transition-colors">
                    {sermon.title}
                  </h4>
                  <p className="text-xs text-brand-charcoal-light/80 leading-relaxed line-clamp-3">
                    {sermon.description}
                  </p>
                </div>
              </div>

              {/* Direct Facebook Sermon Stream Link Button */}
              <div className="p-6 pt-0">
                <a
                  href="https://www.facebook.com/renewalchurchbuloba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-display font-semibold transition-all text-xs py-2.5 px-4 rounded-xl cursor-pointer flex items-center justify-center gap-2 text-center shadow-sm hover:shadow-md"
                >
                  <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Watch Sermon on Facebook ↗
                </a>
              </div>
            </div>
          ))}

          {filteredSermons.length === 0 && (
            <div className="col-span-full bg-white p-12 text-center rounded-3xl border border-brand-brown/5">
              <span className="text-3xl">🏜️</span>
              <h4 className="font-serif text-lg font-bold text-brand-brown mt-3">No Sermons Found</h4>
              <p className="text-xs text-brand-charcoal-light mt-1">
                Try modifying your keywords or select another series category.
              </p>
            </div>
          )}
        </div>

        {/* Facebook Link Footer Cta */}
        <div className="bg-brand-brown text-brand-cream p-8 md:p-12 rounded-3xl text-center space-y-6 max-w-4xl mx-auto border border-brand-gold/15 shadow-xl animate-fade-in mt-12">
          <div className="space-y-4">
            <span className="font-mono text-[10px] text-brand-gold uppercase tracking-widest font-bold block">
              Watch & Live Stream Online
            </span>
            <h4 className="font-serif text-2xl md:text-3xl font-extrabold text-white">
              Discover More Sermons & Live Ministries
            </h4>
            <p className="text-xs sm:text-sm text-brand-cream/80 max-w-2xl mx-auto leading-relaxed">
              We stream all of our Sunday worship services, miracle sessions, and dynamic prayer altar events live. Join our online church family and follow us to watch our full library.
            </p>
          </div>
          <div className="pt-2">
            <a
              href="https://www.facebook.com/RenewalChurchBuloba"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-white text-brand-brown hover:text-brand-brown font-display font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md hover:scale-[1.01]"
            >
              <Video className="w-4 h-3.5" /> See More Sermons on Facebook Live ➔
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
