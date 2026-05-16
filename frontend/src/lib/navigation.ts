/**
 * =========================================
 * Navigation Configuration
 * Centralized routes for the entire website
 * =========================================
 */

import { Clock, MapPin, Plane, Users, Star, Bus, BookOpen, ShieldAlert, RotateCcw, HelpCircle, FileText, User, Shield, CreditCard, Scale, AlertTriangle } from "lucide-react";

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  VISION: "/vision",
  FLEET: "/fleet",
  CAREERS: "/careers",
  SUPPORT: "/support",
  HELP: "/help",
  CONTACT: "/contact",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  REFUND: "/refund-policy",
  HIRE_DRIVER: "/hire-driver",
  SERVICES_SECTION: "/#services",
  TOURS_SECTION: "/#tours",
  FLEET_SECTION: "/#fleet",
  FAQ_SECTION: "/#faq",
};

export const NAV_LINKS = [
  { name: "Services", href: ROUTES.SERVICES_SECTION, hasDropdown: true },
  { name: "Tour Packages", href: ROUTES.TOURS_SECTION, hasDropdown: true },
  { name: "Outstation", href: "/#outstation", hasDropdown: true },
  { name: "Company", href: ROUTES.ABOUT, hasDropdown: true },
  { name: "Support", href: ROUTES.SUPPORT, hasDropdown: true },
  { name: "Hire Driver", href: ROUTES.HIRE_DRIVER },
];

export const COMPANY_LINKS = [
  { title: "Our Story", href: ROUTES.ABOUT },
  { title: "Vision & Mission", href: ROUTES.VISION },
  { title: "Fleet", href: ROUTES.FLEET },
  { title: "Careers", href: ROUTES.CAREERS },
];

export const SUPPORT_LINKS = [
  { title: "Support Overview", href: ROUTES.SUPPORT },
  { title: "Help Center", href: ROUTES.HELP },
  { title: "Contact Us", href: ROUTES.CONTACT },
  { title: "Terms & Conditions", href: ROUTES.TERMS },
  { title: "Privacy Policy", href: ROUTES.PRIVACY },
  { title: "Cancellation & Refund Policy", href: ROUTES.REFUND },
];

export const TOUR_LINKS = [
  { title: "3 Days Vizag & Araku", href: "/booking/3-days-vizag-and-araku-valley-tour" },
  { title: "Araku Valley Tour", href: "/booking/araku-valley-tour" },
  { title: "Temple Tour", href: "/booking/arasavalli-and-srikurmam-temple-tour" },
  { title: "Lambasingi Tour", href: "/booking/lambasingi-tour" },
  { title: "Vizag Full City Tour", href: "/booking/vizag-full-city-tour" },
];

export const OUTSTATION_LINKS = [
  { title: "Srikakulam", href: "/booking/srikakulam" },
  { title: "Vizianagaram", href: "/booking/vizianagaram" },
  { title: "Annavaram", href: "/booking/annavaram" },
  { title: "Kakinada", href: "/booking/kakinada" },
  { title: "Rajahmundry", href: "/booking/rajahmundry" },
  { title: "Anakapalli", href: "/booking/anakapalli" },
  { title: "Tuni", href: "/booking/tuni" },
  { title: "Payakaraopeta", href: "/booking/payakaraopeta" },
  { title: "Yalamanchili", href: "/booking/yalamanchili" },
  { title: "Narsipatnam", href: "/booking/narsipatnam" },
];

export const MEGA_MENU_DATA = [
  {
    id: "local",
    title: "Local Taxi",
    icon: Clock,
    description: "Hourly Packages",
    items: [
      { title: "8hrs/80km", href: ROUTES.FLEET, info: "City exploration" },
      { title: "10hrs/100km", href: ROUTES.FLEET, info: "Full day city tour" },
      { title: "12hrs/120km", href: ROUTES.FLEET, info: "Extended city travel" },
      { title: "Professional Drivers", href: ROUTES.HIRE_DRIVER, info: "Safe & Reliable" },
    ]
  },
  {
    id: "outstation",
    title: "Outstation",
    icon: MapPin,
    description: "Long Distance Destinations",
    items: [
      { title: "One-way Drops", href: ROUTES.CONTACT, info: "All major cities" },
      { title: "Round Trips", href: ROUTES.CONTACT, info: "Best per-km rates" },
      { title: "Multi-city Travel", href: ROUTES.CONTACT, info: "Customized itinerary" },
    ]
  },
  {
    id: "airport",
    title: "Airport Transfer",
    icon: Plane,
    description: "Vizag Airport (VTZ)",
    items: [
      { title: "Arrival Pickup", href: ROUTES.CONTACT, info: "Meet & Greet service" },
      { title: "Departure Drop", href: ROUTES.CONTACT, info: "On-time guarantee" },
      { title: "Fixed Rates", href: ROUTES.CONTACT, info: "No hidden charges" },
    ]
  },
  {
    id: "tours",
    title: "Tour Packages",
    icon: MapPin, // Or Mountain if I import it
    description: "Explore Vizag & Beyond",
    items: [
      { title: "Vizag City Tours", href: ROUTES.TOURS_SECTION, info: "Beaches & Museums" },
      { title: "Araku Valley Tours", href: ROUTES.TOURS_SECTION, info: "Hill station experience" },
      { title: "Lambasingi Tours", href: ROUTES.TOURS_SECTION, info: "The Kashmir of Andhra" },
    ]
  },
  {
    id: "group",
    title: "Group Tours",
    icon: Users,
    description: "Perfect for Large Teams",
    items: [
      { title: "Corporate Outings", href: ROUTES.CONTACT, info: "Team building trips" },
      { title: "Family Vacations", href: ROUTES.CONTACT, info: "Comfortable travel" },
      { title: "College Trips", href: ROUTES.CONTACT, info: "Budget friendly" },
    ]
  },
  {
    id: "tempo",
    title: "Tempo Traveller Rental",
    icon: Bus,
    description: "Luxury Force Urbania",
    items: [
      { title: "12 Seater Luxury", href: ROUTES.FLEET, info: "Premium comfort" },
      { title: "17 Seater Executive", href: ROUTES.FLEET, info: "Spacious seating" },
      { title: "26 Seater Standard", href: ROUTES.FLEET, info: "Ideal for groups" },
    ]
  }
];
