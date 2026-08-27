import { Sermon, ChurchEvent, Ministry, LifeGroup, FAQItem, Testimonial, Announcement } from "./types";

const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-2",
    text: "📅 Weekly Altar Intercession Overnight: This Friday at 10:00 PM.",
    linkText: "Prayer Details",
    targetView: "prayer"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Saul & Lorraine Kagwa",
    text: "When I walked into Renewal Church Buloba, I felt an immediate warmth. The community is truly a family, and my spiritual walk has been refreshed beyond words.",
    role: "Deacon/ Married Department",
    date: "2026-05-12"
  },
  {
    id: "test-2",
    name: "David Kusubira",
    text: "The Harvest Theme has challenged our family to live with eternal intentionality. God is doing amazing things in Buloba!",
    role: "Music Director",
    date: "2026-04-20"
  },
  {
    id: "test-3",
    name: "Kyoshaba Isaac",
    text: "Having shifted from kampala, i found a welcoming spiritual family and now we host a life group. I recommend everyone to Join a life group and Renewal church family",
    role: "Deacon/Finance/Administrator",
    date: "2026-05-28"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Where is Renewal Church Buloba located?",
    answer: "We are physically situated Along Mityana Rd, Buloba Trading Centre, located at Africa Renewal University grounds. It is a scenic location designed to offer peace and welcoming worship to all travelers, residents, and visitors.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "What are your Sunday and Midweek service times?",
    answer: "Our Sunday Service runs from 10:30 AM to 1:00 PM. We also gather for Discipleship Classes on Tuesdays (5:00 PM - 6:00 PM), Midweek Prayer on Wednesdays (5:00 PM - 7:00 PM), joint Friday Night Overnight Prayers, and Choir rehearsals on Saturdays (6:00 PM - 10:00 PM).",
    category: "Services"
  },
  {
    id: "faq-3",
    question: "How can I support the church or give online?",
    answer: "You can securely give through official Airtel Money (*185*9# Merchant Code 6880753) and Direct Bank Transfer to our dfcu Bank account. Detailed guidance is available on our 'Give' page.",
    category: "Giving"
  },
  {
    id: "faq-4",
    question: "What is a Life Group and how do I join?",
    answer: "Life Groups are small neighborhood cell fellowships meeting weekly to review the Word, pray, share, and support each other. You can browse and connect with any of our Buloba cell sectors right here on our website!",
    category: "Life Groups"
  },
  {
    id: "faq-5",
    question: "Is there children's church or youth ministry?",
    answer: "Yes! Children's Church runs parallel during both of our Sunday services with dedicated, well-vetted guides. We also have a vibrant Youth Ministry gathering every Saturday afternoon for discipleship, games, and fellowship.",
    category: "Services"
  }
];

export const SERMONS: Sermon[] = [
  {
    id: "serm-1",
    title: "Prepared for a Harvest: Sowing in Righteousness",
    videoId: "m98v3vI6g20",
    speaker: "Ps. Renson Mwawasi",
    date: "May 31, 2026",
    series: "Harvest Series",
    duration: "45 mins",
    description: "In this powerful sermon, Ps. Renson unpacks Hosea 10:12, teaching on what it means to break up our fallow grounds and prepare ourselves for God's divine outpouring.",
    thumbnail: img("Sermons preaching.jpeg")
  },
  {
    id: "serm-3",
    title: "Don't Give Up: Divine Endurance",
    videoId: "dont-give-up",
    speaker: "Ps. Carol Emmy Mwawasi",
    date: "November 17, 2024",
    series: "Hope & Resilience",
    duration: "35 mins",
    description: "A message of divine hope, steady endurance, and steadfast perseverance through hard, dry chapters. God is organizing a sweet breakthrough in your waiting season.",
    thumbnail: img("1 (5).jpeg")
  },
  {
    id: "serm-2",
    title: "Seeing the Unseen & Walking in Purpose",
    videoId: "unseen-2026",
    speaker: "Ps. Carol Emmy Mwawasi",
    date: "April 12, 2026",
    series: "Spiritual Vision",
    duration: "40 mins",
    description: "Walking by faith and not by sight. Go deep into spiritual alertness and focusing your eyes on the eternal and spiritual reality of God's unchanging promises.",
    thumbnail: img("1 (6).jpeg")
  },
  {
    id: "serm-4",
    title: "The other side of Faith",
    videoId: "other-side-faith",
    speaker: "Ps. Male Kassim",
    date: "July 21, 2024",
    series: "Deep Conviction",
    duration: "42 mins",
    description: "Stepping into uncharted territories of obedience and absolute trust. Discover what happens when we leave the shore of comfort and meet God's supernatural hand over waters.",
    thumbnail: img("1 (4).jpeg")
  }
];

export const EVENTS: ChurchEvent[] = [
  {
    id: "ev-discipleship-leadership",
    title: "Discipleship and Leadership Development Training",
    date: "2026-09-19",
    time: "9:00 AM - 1:00 PM",
    location: "Renewal Church Buloba Training Hall",
    description: "An essential and transformative leadership session designed to equip emerging leaders, life group stewards, and faithful believers with deep biblical foundations, ministry leadership skills, and discipleship practical tools for kingdom advancement.",
    category: "General",
    image: img("1 (2).jpeg"),
    requiresRegistration: true,
    registeredCount: 0,
    isPast: false
  },
  {
    id: "ev-financial-literacy-2",
    title: "Second Financial Literacy Training",
    date: "2026-11-14",
    time: "10:00 AM - 2:00 PM",
    location: "Church Auditorium, Renewal Church Buloba",
    description: "Empowering families and church members with practical kingdom stewardship, budgeting mastery, debt freedom, wise investing, and entrepreneurship principles to build lasting generational wealth and impact.",
    category: "General",
    image: img("Literacy.jpeg"),
    requiresRegistration: true,
    registeredCount: 0,
    isPast: false
  },
  {
    id: "ev-4",
    title: "Men's Breakfast",
    date: "2026-07-25",
    time: "8:00 AM",
    location: "Church Auditorium, Renewal Church Buloba",
    description: "Saturate your Saturday morning in fervent prayer, rich fellowship, and a hearty warm brotherhood breakfast under the theme \"The boy in you must DIE\" (#THE_QUEST_FOR_AUTHENTIC_MANHOOD). An essential gathering of Renewal men to establish strong, secure spiritual altars for our families and homes.",
    category: "Men",
    image: img("WhatsApp Image 2026-07-13 at 10.22.02 AM.jpeg"),
    requiresRegistration: true,
    registeredCount: 0,
    isPast: true
  },
  {
    id: "ev-3",
    title: "WOW (Women of Worth Conference)",
    date: "2026-10-10",
    time: "8:00 AM",
    location: "Renewal Church Buloba",
    description: "A transformative, empowering conference themed \"For Such a time as this\" (Esther 4:14) featuring guest speakers Ps. Irene Kasirivu, Ps. Ann Matovu, and Ps. Lillian Teira, hosted by Ps. Renson & Ps. Carol Mwawasi. Come and be spiritually refreshed, equipped, and built up in God's presence.",
    category: "Women",
    image: img("WOW conference.png"),
    requiresRegistration: false,
    registeredCount: 0
  },
  {
    id: "ev-7",
    title: "31st December Community Outreach Celebration",
    date: "2026-12-31",
    time: "8:00 PM Onwards",
    location: "Renewal Church Grounds & Buloba Suburbs",
    description: "Our massive end of year celebration with the community crossing into the next year! Thanksgiving prayers, joy-filled sharing meals, corporate testimonies, and high praise.",
    category: "Outreach",
    image: img("Crowd.jpeg"),
    requiresRegistration: false,
    registeredCount: 0
  }
];

export const MINISTRIES: Ministry[] = [
  {
    id: "min-1",
    name: "Renewal Children's Ministry (Renewal Kids)",
    leader: "",
    role: "Director of Children Ministries",
    description: "Catering to children from age 2 to 12. Our goal is to plant the seed of God's Word in young hearts early through scripture retention, interactive lessons, drama, and fun Christian games.",
    image: img("Children-1.jpeg"),
    images: [
      img("Children-1.jpeg"),
      img("Childrens ministry.jpeg"),
      img("Childrens m.jpeg"),
      img("Children.jpeg"),
      img("Children mm.jpg")
    ],
    objectPosition: "object-top",
    activities: ["Creative Sunday School classes during both services", "Annual Kids' Bible Camp during holidays", "Children's Choir rehearsals"],
    schedule: "Sundays (10:30 AM - 1:00 PM) in the Children's Annex",
    contact: "kids@renewalbuloba.org"
  },
  {
    id: "min-2",
    name: "Renewal Youth Ministry",
    leader: "",
    role: "Youth & Discipleship Pastor",
    description: "A passionate assembly of teenagers and university students. Our youth ministry works to spark bold faith, solid bible habits, and help young Ugandans live impact-driven lifestyles.",
    image: img("youth2.jpeg"),
    images: [
      img("youth2.jpeg"),
      img("Youth still.jpeg")
    ],
    objectPosition: "object-[center_25%]",
    activities: ["Weekly Saturday Youth fellowship sessions", "High school outreach teams", "Creative Arts and Youth Sports tournaments"],
    schedule: "Saturdays at 2:00 PM inside the Youth Center Annex",
    contact: "youth@renewalbuloba.org"
  },
  {
    id: "min-3",
    name: "Renewal Worship & Creative Arts Ministry",
    leader: "",
    role: "Lead Worship Director",
    description: "Lifting up a pure, sound, and spirit-filled sacrifice of praise in Buloba. This team guides our congregations into dynamic, celebratory, and intimate encounters with God's presence.",
    image: img("XChoir.jpeg"),
    images: [
      img("XChoir.jpeg"),
      img("choir.jpeg"),
      img("Phillip praise.jpeg"),
      img("Her praise.jpeg")
    ],
    objectPosition: "object-top",
    activities: ["Sunday worship guidance", "Monthly Night of Devoted Praise", "Songwriting and instrument masterclasses"],
    schedule: "Saturdays at 6:00 PM - 10:00 PM for rehearsals / Saturday prayers",
    contact: "worship@renewalbuloba.org"
  },
  {
    id: "min-4",
    name: "Renewal Women's Ministry (WOW-Women Of Worth)",
    leader: "",
    role: "Women's Ministry Patron",
    description: "Empowering women to walk in emotional, financial, and spiritual authority. Ladies of Honor focus on building stable standard marriages, supporting widows, and establishing enterprises.",
    image: img("new women.jpeg"),
    images: [
      img("new women.jpeg"),
      img("wow.jpeg"),
      img("women m.jpeg"),
      img("Wow1.jpeg")
    ],
    objectPosition: "object-center",
    activities: ["Monthly business incubation circles", "Welfare and maternal support missions", "Counselling and family values panels"],
    schedule: "First Saturday of the month at 10:00 AM",
    contact: "women@renewalbuloba.org"
  },
  {
    id: "min-5",
    name: "Renewal Men's Ministry",
    leader: "",
    role: "President",
    description: "Unbending biblical leadership for husbands, fathers, and bachelors. We challenge men to take up spiritual responsibility in their homes, business ethics, and practical church maintenance.",
    image: img("MENs B.jpeg"),
    images: [
      img("MENs B.jpeg"),
      img("Men.jpeg"),
      img("phillip men.jpeg")
    ],
    objectPosition: "object-[center_30%]",
    activities: ["Men's Prayer Breakfast retreats", "Youth boy mentorship drills", "Community micro-capital associations"],
    schedule: "Third Saturday of the month at 7:30 AM",
    contact: "men@renewalbuloba.org"
  },
  {
    id: "min-6",
    name: "Renewal Evangelism & Community Outreach",
    leader: "",
    role: "Evangelism Coordinator",
    description: "Bringing the love of Christ onto the dusty streets, homes, and hospitals around Buloba. This team organizes medical camps, prison fellowships, and open-air gospel crusades.",
    image: img("evangelism.jpeg"),
    images: [
      img("evangelism.jpeg"),
      img("3 (6).jpeg"),
      img("E1.jpeg"),
      img("3 (1).jpeg")
    ],
    objectPosition: "object-center",
    activities: ["Buloba street track-sharing", "Quarterly clinical medical testing drives", "Emergency family relief food baskets"],
    schedule: "Every Saturday morning from 9:00 AM",
    contact: "outreach@renewalbuloba.org"
  },
  {
    id: "min-7",
    name: "Renewal Media & Technical Ministry",
    leader: "",
    role: "Technical Production Supervisor",
    description: "Spreading the Renewal message to Buloba and the ends of the earth. Responsible for live streaming, projection, pristine sound production, video editing, and graphic design.",
    image: img("media.png"),
    objectPosition: "object-center",
    facebookLink: "https://www.facebook.com/renewalchurchbuloba",
    activities: ["Weekly YouTube/Facebook streams setup (Facebook: renewalchurchbuloba)", "Pre-production filming", "Audio mastering and acoustics upgrade team"],
    schedule: "Sundays and Midweek Service (5:00 PM)",
    contact: "media@renewalbuloba.org"
  },
  {
    id: "min-8",
    name: "Renewal Prayer and Intercessory",
    leader: "",
    role: "Lead Intercessor",
    description: "The engine-room of Renewal Church. Keeping the fire burning day and night as we stand in the gap for families, the church leadership, Uganda, and the global body of Christ.",
    image: img("PRAYER.jpeg"),
    images: [
      img("PRAYER.jpeg"),
      img("PRAYER2.jpeg"),
      img("PRayer3.jpeg")
    ],
    objectPosition: "object-[center_30%]",
    activities: ["Wednesday 5:00pm to 7:00pm", "Friday Night Altar overnights", "Fast-alert prayer request dispatch team"],
    schedule: "Fridays 6:00 PM onwards & Wednesday Prayers",
    contact: "prayer@renewalbuloba.org"
  },
  {
    id: "min-9",
    name: "Renewal Ushers",
    leader: "",
    role: "Head Ushers Coordinator",
    description: "Greeting, hosting, serving, and maintaining beautiful order and decorum in the House of God during all ministries, regular services, and special events.",
    image: img("usher1.jpeg"),
    images: [
      img("usher1.jpeg"),
      img("usher2.jpeg"),
      img("Usher.jpg"),
      img("U2.jpg"),
      img("USHERS M.jpeg"),
      img("USHERS W.jpeg"),
      img("IMMAUSHER.jpeg"),
      img("IRENEUSHER.jpeg")
    ],
    objectPosition: "object-top",
    activities: ["Welcoming visitors, managing seating layouts, communion logistical setups, and offering decorum"],
    schedule: "Sundays & Midweek Service assemblies (30 mins before start)",
    contact: "ushers@renewalbuloba.org"
  }
];

export const LIFE_GROUPS: LifeGroup[] = [];