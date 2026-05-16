export interface Destination {
  name: string;
  distanceKm: number;
  duration: string;
  description: string;
  highlights: string[];
  itinerary: { day: string; title: string; activities: string[] }[];
  images: string[];
  type: "tour" | "outstation";
}

const DEFAULT_ITINERARY = [
  { day: "1", title: "Arrival & Local Sightseeing", activities: ["Pickup from Visakhapatnam", "Travel to destination", "Check-in at hotel", "Evening local visit"] },
  { day: "2", title: "Full Day Exploration", activities: ["Breakfast at hotel", "Full day sightseeing of major attractions", "Evening leisure time"] }
];

const DEFAULT_HIGHLIGHTS = ["Professional Driver", "Clean & Sanitized Cars", "On-time Pickup", "No Hidden Charges"];

export const DESTINATIONS: Record<string, Destination> = {
  "amadalavalasa": { 
    name: "Amadalavalasa", distanceKm: 115, duration: "2h 30m", type: "outstation",
    description: "Industrial hub with scenic surroundings.",
    highlights: DEFAULT_HIGHLIGHTS, itinerary: DEFAULT_ITINERARY,
    images: ["https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=800"]
  },
  "annavaram": { 
    name: "Annavaram", distanceKm: 110, duration: "2h 15m", type: "outstation",
    description: "Sacred pilgrimage site home to Sri Veera Venkata Satyanarayana Swamy Temple.",
    highlights: ["Temple Darshan", "Pampa River"], itinerary: DEFAULT_ITINERARY,
    images: ["https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800"]
  },
  "araku-valley": { 
    name: "Araku Valley", distanceKm: 115, duration: "3h 30m", type: "tour",
    description: "The 'Ooty of Andhra', famous for coffee plantations and caves.",
    highlights: ["Borra Caves", "Coffee Museum"], itinerary: DEFAULT_ITINERARY,
    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800"]
  },
  "arasavalli": { 
    name: "Arasavalli", distanceKm: 120, duration: "2h 45m", type: "outstation",
    description: "Home to the ancient Sun God Temple.",
    highlights: ["Sun Temple"], itinerary: DEFAULT_ITINERARY,
    images: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800"]
  },
  "vizag-full-city-tour": {
    name: "Vizag Full City Tour", distanceKm: 80, duration: "10h", type: "tour",
    description: "Complete exploration of the City of Destiny.",
    highlights: ["Simhachalam", "Kailasagiri", "Beach Road"], itinerary: DEFAULT_ITINERARY,
    images: ["https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=800"]
  },
  "lambasingi-tour": {
    name: "Lambasingi Tour", distanceKm: 105, duration: "3h", type: "tour",
    description: "Kashmir of Andhra Pradesh.",
    highlights: ["Strawberry Farms", "Pine Forests"], itinerary: DEFAULT_ITINERARY,
    images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800"]
  },
  "vanajangi-tour": {
    name: "Vanajangi Tour", distanceKm: 100, duration: "3h 30m", type: "tour",
    description: "Spectacular sunrise views above the clouds.",
    highlights: ["Sunrise Point", "Trekking"], itinerary: DEFAULT_ITINERARY,
    images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800"]
  },
  "araku-valley-tour": { 
    name: "Araku Valley Tour", distanceKm: 115, duration: "3h 30m", type: "tour",
    description: "Scenic hill station tour.",
    highlights: ["Borra Caves", "Coffee Museum"], itinerary: DEFAULT_ITINERARY,
    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800"]
  },
  "3-days-vizag-and-araku-valley-tour": {
    name: "3 Days Vizag & Araku Valley Tour", distanceKm: 460, duration: "3 Days", type: "tour",
    description: "Comprehensive 3-day journey.",
    highlights: ["Vizag City", "Araku Hills"], itinerary: DEFAULT_ITINERARY,
    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800"]
  },
  "arasavalli-and-srikurmam-temple-tour": {
    name: "Arasavalli & Srikurmam Temple Tour", distanceKm: 240, duration: "10h", type: "tour",
    description: "Spiritual journey to Sun God and Kurmanathaswamy temples.",
    highlights: ["Sun Temple", "Srikurmam Temple"], itinerary: DEFAULT_ITINERARY,
    images: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800"]
  },
  "vizag-city-tour": {
     name: "Vizag City Tour", distanceKm: 80, duration: "10h", type: "tour",
     description: "Beaches and Museums.",
     highlights: ["RK Beach", "Submarine Museum"], itinerary: DEFAULT_ITINERARY,
     images: ["https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=800"]
  },
  "hyderabad": { name: "Hyderabad", distanceKm: 620, duration: "11h", type: "outstation", description: "City of Pearls.", highlights: ["Charminar"], itinerary: DEFAULT_ITINERARY, images: ["https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=800"] },
  "bangalore": { name: "Bangalore", distanceKm: 1000, duration: "18h", type: "outstation", description: "Garden City.", highlights: ["Lalbagh"], itinerary: DEFAULT_ITINERARY, images: ["https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=800"] },
  "chennai": { name: "Chennai", distanceKm: 800, duration: "14h", type: "outstation", description: "Gateway to South India.", highlights: ["Marina Beach"], itinerary: DEFAULT_ITINERARY, images: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800"] },
  "vijayawada": { name: "Vijayawada", distanceKm: 350, duration: "6h 30m", type: "outstation", description: "Business Hub.", highlights: ["Kanaka Durga Temple"], itinerary: DEFAULT_ITINERARY, images: ["https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800"] },
  "tirupati": { name: "Tirupati", distanceKm: 750, duration: "13h", type: "outstation", description: "Spiritual Hub.", highlights: ["Tirumala"], itinerary: DEFAULT_ITINERARY, images: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800"] },
  "kakinada": { name: "Kakinada", distanceKm: 155, duration: "3h 30m", type: "outstation", description: "Port City.", highlights: ["Coringa"], itinerary: DEFAULT_ITINERARY, images: ["https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=800"] },
  "rajahmundry": { name: "Rajahmundry", distanceKm: 190, duration: "4h", type: "outstation", description: "Cultural Capital.", highlights: ["Godavari"], itinerary: DEFAULT_ITINERARY, images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800"] },
};

// Populate the rest of the 36 destinations with default content
const ALL_SLUGS = [
  "bhadrachalam", "bhubaneswar", "bobbili", "eluru", "guntur", "ichchapuram", "jagdalpur", "khammam", "kolkata", "kurnool", "narasannapeta", "nellore", "palakollu", "palakonda", "palasa", "parvathipuram", "raipur", "ravulapalem", "razam", "sompeta", "srikakulam", "srimukhalingam", "tuni", "vizianagaram"
];

ALL_SLUGS.forEach(slug => {
  if (!DESTINATIONS[slug]) {
    DESTINATIONS[slug] = {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      distanceKm: 150 + (slug.length * 12), // Use deterministic value to avoid hydration mismatch
      duration: "4-8 hours",
      type: "outstation",
      description: `${slug.charAt(0).toUpperCase() + slug.slice(1)} is a key destination for outstation travel from Visakhapatnam.`,
      highlights: DEFAULT_HIGHLIGHTS,
      itinerary: DEFAULT_ITINERARY,
      images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800"]
    };
  }
});
