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
  { title: "3 Days Vizag & Araku", href: "/tours/vizag-araku-3d" },
  { title: "Araku Valley Tour", href: "/tours/araku-valley" },
  { title: "Temple Tour", href: "/tours/arasavalli-temple" },
  { title: "Lambasingi Tour", href: "/tours/lambasingi" },
  { title: "Vizag Full City Tour", href: "/tours/vizag-city-tour" },
];

export const OUTSTATION_LINKS = [
  { title: "Amadalavalasa", href: "/booking/amadalavalasa" },
  { title: "Annavaram", href: "/booking/annavaram" },
  { title: "Araku Valley", href: "/booking/araku-valley" },
  { title: "Arasavalli", href: "/booking/arasavalli" },
  { title: "Bangalore", href: "/booking/bangalore" },
  { title: "Bhadrachalam", href: "/booking/bhadrachalam" },
  { title: "Bhubaneswar", href: "/booking/bhubaneswar" },
  { title: "Bobbili", href: "/booking/bobbili" },
  { title: "Chennai", href: "/booking/chennai" },
  { title: "Eluru", href: "/booking/eluru" },
  { title: "Guntur", href: "/booking/guntur" },
  { title: "Hyderabad", href: "/booking/hyderabad" },
  { title: "Ichchapuram", href: "/booking/ichchapuram" },
  { title: "Jagdalpur", href: "/booking/jagdalpur" },
  { title: "Kakinada", href: "/booking/kakinada" },
  { title: "Khammam", href: "/booking/khammam" },
  { title: "Kolkata", href: "/booking/kolkata" },
  { title: "Kurnool", href: "/booking/kurnool" },
  { title: "Lambasingi", href: "/booking/lambasingi" },
  { title: "Narasannapeta", href: "/booking/narasannapeta" },
  { title: "Nellore", href: "/booking/nellore" },
  { title: "Palakollu", href: "/booking/palakollu" },
  { title: "Palakonda", href: "/booking/palakonda" },
  { title: "Palasa", href: "/booking/palasa" },
  { title: "Parvathipuram", href: "/booking/parvathipuram" },
  { title: "Raipur", href: "/booking/raipur" },
  { title: "Rajahmundry", href: "/booking/rajahmundry" },
  { title: "Ravulapalem", href: "/booking/ravulapalem" },
  { title: "Razam", href: "/booking/razam" },
  { title: "Sompeta", href: "/booking/sompeta" },
  { title: "Srikakulam", href: "/booking/srikakulam" },
  { title: "Srimukhalingam", href: "/booking/srimukhalingam" },
  { title: "Tirupati", href: "/booking/tirupati" },
  { title: "Tuni", href: "/booking/tuni" },
  { title: "Vijayawada", href: "/booking/vijayawada" },
  { title: "Vizianagaram", href: "/booking/vizianagaram" }
];

export const MEGA_MENU_DATA = [
  {
    id: "local",
    title: "Local Taxi",
    icon: Clock,
    description: "Hourly Packages",
    items: [
      { title: "8hrs/80km", href: "/booking/local-city-taxi", info: "City exploration" },
      { title: "10hrs/100km", href: "/booking/local-city-taxi", info: "Full day city tour" },
      { title: "12hrs/120km", href: "/booking/local-city-taxi", info: "Extended city travel" },
      { title: "Professional Drivers", href: ROUTES.HIRE_DRIVER, info: "Safe & Reliable" },
    ]
  },
  {
    id: "outstation",
    title: "Outstation",
    icon: MapPin,
    description: "Long Distance Destinations",
    items: [
      { title: "One-way Drops", href: "/booking/amadalavalasa", info: "All major cities" },
      { title: "Round Trips", href: "/booking/araku-valley", info: "Best per-km rates" },
      { title: "Multi-city Travel", href: "/booking/hyderabad", info: "Customized itinerary" },
    ]
  },
  {
    id: "airport",
    title: "Airport Transfer",
    icon: Plane,
    description: "Vizag Airport (VTZ)",
    items: [
      { title: "Arrival Pickup", href: "/booking/vizag-airport-transfer", info: "Meet & Greet service" },
      { title: "Departure Drop", href: "/booking/vizag-airport-transfer", info: "On-time guarantee" },
      { title: "Fixed Rates", href: "/booking/vizag-airport-transfer", info: "No hidden charges" },
    ]
  },
  {
    id: "tours",
    title: "Tour Packages",
    icon: MapPin,
    description: "Explore Vizag & Beyond",
    items: [
      { title: "Vizag City Tours", href: "/booking/vizag-city-tour", info: "Beaches & Museums" },
      { title: "Araku Valley Tours", href: "/booking/araku-valley", info: "Hill station experience" },
      { title: "Lambasingi Tours", href: "/booking/lambasingi", info: "The Kashmir of Andhra" },
    ]
  },
  {
    id: "group",
    title: "Group Tours",
    icon: Users,
    description: "Perfect for Large Teams",
    items: [
      { title: "Corporate Outings", href: "/booking/outstation?fleet=tempo", info: "Team building trips" },
      { title: "Family Vacations", href: "/booking/outstation?fleet=tempo", info: "Comfortable travel" },
      { title: "College Trips", href: "/booking/outstation?fleet=tempo", info: "Budget friendly" },
    ]
  },
  {
    id: "tempo",
    title: "Tempo Traveller Rental",
    icon: Bus,
    description: "Luxury Force Urbania",
    items: [
      { title: "12 Seater Luxury", href: "/booking/outstation?fleet=tempo", info: "Premium comfort" },
      { title: "17 Seater Executive", href: "/booking/outstation?fleet=tempo", info: "Spacious seating" },
      { title: "26 Seater Standard", href: "/booking/outstation?fleet=tempo", info: "Ideal for groups" },
    ]
  }
];
