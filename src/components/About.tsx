import React from "react";
import { Check, ShieldCheck, Heart, Users, Compass, BookOpen, Flame, Sparkles, Search, ChevronDown, ChevronUp } from "lucide-react";

interface AboutProps {
  showStatementOfFaith?: boolean;
}

export default function About({ showStatementOfFaith = true }: AboutProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const statementOfFaith = [
    {
      title: "THE WORD",
      desc: "We believe that the Holy Scripture is God’s own word written by men as the Holy Spirit inspired them. It is an infallible record of God’s self-disclosure to mankind. The Scriptures are the authoritative and normative rule and guide of all Christian life, practice and doctrine.",
      scriptures: "2 Peter 1:20-21; 2 Tim 3:16-17"
    },
    {
      title: "ONE GOD (FATHER, SON, HOLY SPIRIT)",
      desc: "We believe that there is but one God, eternal, infinite, perfect and unchangeable. God is one in His essential being, but in this one being there are three persons called Father, Son and Holy Spirit.",
      scriptures: "Gen 1:26; 11:7; Matt 28:19; Luke 3:21, 22; John 14:16"
    },
    {
      title: "VIRGIN BIRTH",
      desc: "We believe that the Lord Jesus Christ is God. He became man when conceived by the Holy Spirit, born of the Virgin Mary in order that He might redeem the sinful man. Christ became man without ceasing to be God. Christ redeemed man by voluntarily giving himself as a sinless sacrifice on the cross, a perfect atonement to satisfy God’s judgment against sin.",
      scriptures: "Isaiah 7:14; Matt 1:18; Matt 20:28; John 1:29; Rom 3:25"
    },
    {
      title: "THE HOLY SPIRIT",
      desc: "We believe that the Holy Spirit is the givers of life, convicts the world of guilt, in regard to sin, righteousness and judgment. Through the proclamation of the Gospel, He persuades men to repent of their sins and confess Jesus as Lord. He gives birth to new life and dwells in the life of those born again. The Holy Spirit has come to glorify the Son, who in turn came to glorify the Father. He leads the believer into understanding the truth and application of God’s word.",
      scriptures: "John 16:8-11; John 3:5-6; John 14:15-17, 25, 26"
    },
    {
      title: "SANCTIFICATION",
      desc: "We believe that the Holy Spirit is the active agent in our sanctification who seeks to produce His fruit in us. Though indwelling sin remains a reality, the Spirit of God comes to lead to knowledge of the Lord. In addition to regeneration and sanctification, the Holy Spirit also empowers believers to serve the body of Jesus Christ. While all believers are indwelt by the Holy Spirit at conversion, the scriptures clearly show the growing empowerment of the Spirit.",
      scriptures: "Gal 5:22-23"
    },
    {
      title: "SAVED BY GRACE",
      desc: "We believe that one is saved by the grace of God and not by character, law or good works. The death and resurrection of Christ are adequate for the salvation of all and offered to all. However, salvation is appropriated only by faith in Christ. Those who repent and believe in Christ as Savior and Lord are born again adopted into the family of God and receive the gift of eternal life.",
      scriptures: "John 3:16; Rom 3:21-25"
    },
    {
      title: "JESUS WILL RETURN",
      desc: "We believe that the same Jesus who ascended to heaven will come back. Those dead in Christ will resurrect from the rest of the dead, and the living believers who will be alive at the time of His coming shall be caught up in the air to join Christ.",
      scriptures: "Acts 1:9-11; 1 Thes 4:13-18"
    },
    {
      title: "ETERNAL JUDGEMENT",
      desc: "We believe in the resurrection of both the saved and the lost; the saved to the resurrection of eternal life and the lost to the resurrection of damnation and eternal punishment.",
      scriptures: "Rev 20:11-15; 1 Cor 15:51-57"
    },
    {
      title: "THE CHURCH",
      desc: "We believe in the spiritual unity of believers in our Lord Jesus Christ and that all true believers are members of His body, the Church. We therefore believe that every believer should be a faithful member of a local church.",
      scriptures: "Eph 1:22-23; 1 Cor 12:12, 27"
    },
    {
      title: "EVANGELISM",
      desc: "We believe that the ministry of evangelism is a responsibility of both the church and each Christian. We are therefore called upon by the Lord to be His witnesses in both deeds and word of mouth.",
      scriptures: "Rom 10:9-15; Acts 1:8; Matt 28:18-20; 1 Peter 3:15"
    }
  ];

  const values = [
    {
      name: "Love for Others",
      icon: Heart,
      desc: "Caring deeply and intentionally, serving unconditionally, and demonstrating Christ's self-giving love to everyone.",
      scriptures: "John 13:35, Matthew 22:36-40"
    },
    {
      name: "Rooted in Scripture",
      icon: BookOpen,
      desc: "An unwavering commitment to studying, teaching, and living out God's active, inerrant, and final Word.",
      scriptures: "2 Timothy 2:15, 2 Timothy 3:16-17, Titus 2:1"
    },
    {
      name: "Diligent in Prayer",
      icon: Flame,
      desc: "Approaching God in continuous, steadfast intercession with a humble spirit and active prayer fellowships.",
      scriptures: "Isaiah 56:7c, Philippians 4:6, James 5:16, Hebrews 5:7"
    },
    {
      name: "Fruitful by the Holy Spirit",
      icon: Sparkles,
      desc: "Relying on the Spirit's power to bear godly character, walk in dynamic gifts, and win souls for the Kingdom.",
      scriptures: "Acts 1:8, Romans 8:14, John 15:16"
    },
    {
      name: "Lifestyle of Evangelism",
      icon: Compass,
      desc: "Consistently proclaiming and demonstrating the saving work of Christ across all local neighborhoods and pathways.",
      scriptures: "2 Timothy 4:5, Romans 1:16"
    },
    {
      name: "Serving with Excellence",
      icon: ShieldCheck,
      desc: "Offering our very best in presentation, honor, and preparation because everything we do reflects God's supreme glory.",
      scriptures: "Titus 2:7-8, Philippians 2:15"
    },
    {
      name: "Stewardship with Integrity",
      icon: Check,
      desc: "Managing our time, talents, funds, and callings with absolute transparency, honesty, and accountability before heaven.",
      scriptures: "Daniel 6:3, 1 Peter 4:10"
    },
  ];

  const leaders = [
    {
      name: "Ps. Renson Mwawasi",
      role: "Team leader of RENEWAL CHURCH BULOBA",
      bio: "Ps. Renson Mwawasi serves as the Team leader of RENEWAL CHURCH BULOBA. He possesses a deep shepherd's heart and a passionate mandate for practical discipleship, community transformation, and raising spirit-led families in Buloba.",
      avatar: "/src/assets/images/lead2.jpeg",
    },
    {
      name: "Ps. Carol Mwawasi",
      role: "Ladies Patron",
      bio: "Ps. Carol Mwawasi co-leads the ministry with a distinct, powerful intercessory grace. As Co-Lead Pastor and wife to Ps. Renson, she mentors ladies, hosts counseling sessions, patron for Womens ministry and Raising young girls to Maturity",
      avatar: "/src/assets/images/CAROL.jpeg",
    },
    {
      name: "Renewal Deacons",
      role: "Administration and ServantHood",
      bio: "Our diligent Deacons and Deaconesses oversee the practical, physical, and logistical departments of the church—managing sanctuary setups, visitor hospitality, mercy care support, and finances with absolute integrity.",
      avatar: "/src/assets/images/ps male deacons.jpg",
    },
  ];

  return (
    <section id="about-church-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Mission and Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch" id="mission-vision-grid">
          
          {/* Vision */}
          <div className="bg-brand-brown text-white p-8 md:p-12 rounded-3xl flex flex-col justify-center shadow-2xl relative overflow-hidden min-h-[220px]">
            <span className="absolute -top-10 -right-10 text-white/5 text-9xl font-extrabold select-none font-serif">
              V
            </span>
            <div className="space-y-4 relative z-10">
              <span className="text-brand-gold font-mono text-xs font-bold uppercase tracking-widest block">
                The Preferred Future
              </span>
              <h3 className="font-serif text-3xl font-extrabold text-brand-gold tracking-tight">
                OUR VISION
              </h3>
              <p className="font-serif text-xl md:text-2xl text-brand-cream leading-relaxed font-extrabold">
                “Christ-Like People Transforming Society.”
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-brand-cream p-8 md:p-12 rounded-3xl border border-brand-brown/5 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden min-h-[220px]">
            <span className="absolute -top-10 -right-10 text-brand-brown/5 text-9xl font-extrabold select-none font-serif">
              M
            </span>
            <div className="space-y-4 relative z-10">
              <span className="text-brand-brown font-mono text-xs font-bold uppercase tracking-widest block">
                Our Primary Calling
              </span>
              <h3 className="font-serif text-3xl font-extrabold text-brand-brown tracking-tight">
                OUR MISSION
              </h3>
              <p className="font-serif text-lg md:text-xl text-brand-charcoal leading-relaxed font-semibold">
                “We are a church influencing lives through the gospel, growing together in Christ-likeness and equipping generations of believers to be agents of transformation in society.”
              </p>
            </div>
          </div>

        </div>

        {/* Our Core Values Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-brown uppercase">
              OUR CORE VALUES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const IconComp = v.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-brand-cream/40 rounded-3xl border border-brand-brown/5 hover:border-brand-gold/30 hover:bg-brand-cream/70 transition-all duration-300 group text-left flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="bg-brand-brown/5 group-hover:bg-[#E2A600]/15 p-3 rounded-xl inline-block text-brand-brown group-hover:text-[#E2A600] transition-colors">
                      <IconComp className="w-5 h-5 text-brand-brown group-hover:text-[#E2A600]" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-serif text-base font-bold text-brand-brown group-hover:text-[#E2A600] transition-colors leading-snug">
                        {v.name}
                      </h4>
                      {v.scriptures && (
                        <p className="text-xs font-sans text-[#E2A600] font-semibold tracking-tight">
                          ({v.scriptures})
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statement of Faith Section */}
        {showStatementOfFaith && (
          <div id="statement-of-faith-section" className="space-y-8 pt-10 border-t border-brand-brown/10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-brand-gold font-mono text-xs font-bold uppercase tracking-widest">
                What We Stand For
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-brown uppercase">
                Statement of Faith
              </h3>
              <p className="text-sm text-brand-charcoal-light">
                Core biblical doctrines that shape our teaching, preaching, fellowship, and corporate worship at Renewal Church Buloba.
              </p>
            </div>

            {/* Doc Search Filter Bar */}
            <div className="max-w-md mx-auto relative px-1">
              <div className="absolute inset-y-0 left-3 pl-1 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-brand-brown/40" />
              </div>
              <input
                type="text"
                placeholder="Search statements (e.g., Word, Virgin Birth, Grace)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setExpandedIndex(null); 
                }}
                className="block w-full pl-10 pr-4 py-3 border border-brand-brown/15 rounded-2xl bg-brand-cream/10 text-xs sm:text-sm text-brand-brown placeholder-brand-brown/50 focus:outline-hidden focus:ring-1 focus:ring-[#E2A600]/60 focus:border-[#E2A600]/60 transition-all font-sans shadow-xs"
              />
            </div>

            {/* Statement Grid Accordions */}
            {(() => {
              const queryClean = searchQuery.trim().toLowerCase();
              const filteredLists = statementOfFaith.filter(
                (item) =>
                  item.title.toLowerCase().includes(queryClean) ||
                  item.desc.toLowerCase().includes(queryClean) ||
                  item.scriptures.toLowerCase().includes(queryClean)
              );

              if (filteredLists.length === 0) {
                return (
                  <div className="text-center py-12 bg-brand-cream/10 rounded-3xl border border-dashed border-brand-brown/10 max-w-md mx-auto px-4">
                    <p className="text-xs font-mono text-[#E2A600] font-bold">No doctrine matched "{searchQuery}"</p>
                    <p className="text-xxs text-brand-charcoal-light/75 mt-1">Try typing another core keyword like God, Grace, Spirit, or Word.</p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-6xl mx-auto pt-2">
                  {filteredLists.map((item) => {
                    const origIdx = statementOfFaith.findIndex(o => o.title === item.title);
                    const isExpanded = expandedIndex === origIdx;

                    return (
                      <div
                        key={origIdx}
                        onClick={() => setExpandedIndex(isExpanded ? null : origIdx)}
                        className="bg-brand-cream/15 hover:bg-brand-cream/35 border border-brand-brown/10 rounded-2xl p-5 hover:border-brand-gold/25 transition-all text-left flex flex-col justify-between cursor-pointer group shadow-xs select-none"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="font-serif text-sm font-extrabold text-brand-brown group-hover:text-[#E2A600] transition-colors tracking-wide uppercase leading-tight pt-0.5">
                              {item.title}
                            </h4>
                            <span className="shrink-0 p-1 rounded-full bg-brand-brown/5 text-brand-brown group-hover:bg-[#E2A600]/15 group-hover:text-[#E2A600] transition-colors">
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </span>
                          </div>
                          <p className={`text-xs text-brand-charcoal-light/95 leading-relaxed font-sans transition-all duration-300 ${isExpanded ? "" : "line-clamp-2 md:line-clamp-3"}`}>
                            {item.desc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-brand-brown/5 mt-3 flex items-center justify-between text-xxs">
                          <span className="font-mono text-brand-gold font-bold uppercase tracking-wider">
                            Scriptures
                          </span>
                          <span className="font-mono text-brand-brown/85 font-bold italic text-[#E2A600] tracking-tight text-right shrink select-all">
                            {item.scriptures}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* Leadership Segment */}
        <div id="leadership-church-segment" className="space-y-12 pt-10 border-t border-brand-brown/10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-brand-brown font-mono text-xs font-bold uppercase tracking-widest">
              Administration and Servanthood
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-brown">
              OUR LEADERSHIP FAMILY
            </h3>
            <p className="text-sm text-brand-charcoal-light">
              We are blessed with devoted and accountable leaders committed to serving the spiritual needs of Buloba.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {leaders.map((leader, i) => (
              <div
                key={i}
                className="bg-brand-cream/20 rounded-3xl overflow-hidden border border-brand-brown/5 flex flex-col group hover:shadow-lg transition-all duration-300 text-left"
              >
                {/* Photo frame */}
                <div className="h-64 overflow-hidden relative bg-brand-brown/5">
                  <img
                    src={leader.avatar}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500 rounded-b-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-mono text-brand-gold text-xxs font-bold uppercase tracking-widest">
                      {leader.role}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-brand-brown">
                      {leader.name}
                    </h4>
                    <p className="text-xs text-brand-charcoal-light/90 leading-relaxed mt-2.5">
                      {leader.bio}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-brand-brown/10 flex items-center justify-between text-xxs font-mono text-brand-brown font-semibold">
                    <span>
                      {leader.name.includes("Renson") ? "Team Leader" : (leader.name.includes("Carol") ? "Ladies Patron" : "Renewal Deacons")}
                    </span>
                    <span className="text-brand-gold">● Call to Connect</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
