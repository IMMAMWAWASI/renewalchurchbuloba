/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Sermon {
  id: string;
  title: string;
  videoId: string; // YouTube video ID or simulation ID
  speaker: string;
  date: string;
  series: string;
  duration: string;
  description: string;
  thumbnail: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string; // e.g. "2026-06-15"
  time: string; // e.g. "9:00 AM - 1:00 PM"
  location: string;
  description: string;
  category: "Youth" | "Women" | "Men" | "General" | "Outreach" | "Prayer";
  image: string;
  requiresRegistration: boolean;
  registeredCount: number;
  isPast?: boolean;
}

export interface Ministry {
  id: string;
  name: string;
  leader: string;
  role: string;
  description: string;
  image: string;
  images?: string[];
  activities: string[];
  schedule: string;
  contact: string;
  objectPosition?: string;
  facebookLink?: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  email: string;
  request: string;
  date: string;
  hearts: number;
  replies: string[];
  isPrivate: boolean;
}

export interface LifeGroup {
  id: string;
  name: string;
  leader: string;
  phone: string;
  day: string;
  time: string;
  location: string;
  coordinates: { lat: number; lng: number };
  category: "Youth" | "Families" | "Young Professionals" | "General" | "Couples";
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Services" | "Giving" | "Life Groups";
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  role: string;
  date: string;
}

export interface Announcement {
  id: string;
  text: string;
  linkText?: string;
  targetView?: string;
}
