export interface Vehicle {
  slug: string;
  model: string;
  type: string;
  description: string;
  pax: string;
  pricePerKm: string;
  features: string[];
  images: string[];
  minKm: string;
  isPremium: boolean;
}

export const FLEET_DATA: Record<string, Vehicle> = {
  "swift-dzire": {
    slug: "swift-dzire",
    model: "Swift Dzire",
    type: "Sedan",
    description: "The Maruti Swift Dzire is the most popular choice for small families and business travelers. It offers a smooth ride, excellent fuel efficiency, and enough luggage space for a weekend getaway. Perfect for city tours and short outstation trips.",
    pax: "4",
    pricePerKm: "14",
    features: ["Air Conditioning", "Bluetooth Audio", "Ample Legroom", "Reliable Performance", "Clean Interiors"],
    images: ["/images/fleet/swift_dzire.png", "/images/fleet/honda_amaze.png"],
    minKm: "300",
    isPremium: false
  },
  "toyota-glanza": {
    slug: "toyota-glanza",
    model: "Toyota Glanza",
    type: "Hatchback",
    description: "A premium hatchback offering a smooth, comfortable ride. Perfect for city driving and small family trips, providing excellent mileage and compact convenience.",
    pax: "4",
    pricePerKm: "14",
    features: ["Touchscreen Infotainment", "Air Conditioning", "ABS & Airbags", "Rear Parking Camera", "USB Charger"],
    images: ["/images/fleet/glanza.png", "/images/fleet/swift_dzire.png"],
    minKm: "300",
    isPremium: false
  },
  "honda-amaze": {
    slug: "honda-amaze",
    model: "Honda Amaze",
    type: "Sedan",
    description: "A spacious subcompact sedan with excellent comfort, sleek styling, and plenty of trunk space. Great for budget-conscious outstation trips.",
    pax: "4",
    pricePerKm: "14",
    features: ["Spacious Cabin", "Dual Airbags", "AC with Heater", "Central Locking", "Power Steering"],
    images: ["/images/fleet/honda_amaze.png", "/images/fleet/swift_dzire.png"],
    minKm: "300",
    isPremium: false
  },
  "ertiga": {
    slug: "ertiga",
    model: "Ertiga",
    type: "MUV",
    description: "A versatile 7-seater that balances comfort and economy. The Ertiga is perfect for medium-sized groups looking for a reliable and affordable travel solution without compromising on space.",
    pax: "6",
    pricePerKm: "18",
    features: ["Flexible Seating", "Roof Mounted AC", "Efficient Engine", "Comfortable Suspension", "Music System"],
    images: ["/images/fleet/ertiga.png", "/images/fleet/innova_crysta.png"],
    minKm: "300",
    isPremium: false
  },
  "innova-crysta": {
    slug: "innova-crysta",
    model: "Innova Crysta",
    type: "MUV / SUV",
    description: "Toyota Innova Crysta is the gold standard for luxury group travel in India. Known for its unmatched comfort, powerful performance, and premium interiors, it's the ideal choice for long family vacations and corporate travel.",
    pax: "7",
    pricePerKm: "20",
    features: ["Captain Seats", "Dual Zone AC", "Premium Sound System", "Spacious Boot Space", "Advanced Safety Features"],
    images: ["/images/fleet/innova_crysta.png", "/images/fleet/ertiga.png"],
    minKm: "300",
    isPremium: true
  },
  "tempo-traveller": {
    slug: "tempo-traveller",
    model: "Tempo Traveller",
    type: "Luxury Van",
    description: "Our 17-seater Tempo Traveller is the ultimate solution for large group tours, weddings, and corporate outings. With push-back seats and a high-roof design, it ensures every passenger travels in comfort.",
    pax: "17",
    pricePerKm: "35",
    features: ["Push-back Seats", "LED TV / Audio", "Ample Luggage Space", "Professional Driver", "High-Cooling AC"],
    images: ["/images/fleet/tempo_traveller.png", "/images/fleet/urbania.png"],
    minKm: "300",
    isPremium: true
  },
  "urbania": {
    slug: "urbania",
    model: "Force Urbania",
    type: "Elite Luxury Van",
    description: "The Force Urbania redefined luxury group travel. It offers international-standard aesthetics, superior safety features, and a whispering cabin experience. Best for high-profile guests and long-distance luxury tours.",
    pax: "16",
    pricePerKm: "40",
    features: ["Individual AC Vents", "Panoramic Windows", "Ultra-Silent Cabin", "Premium Upholstery", "Executive Styling"],
    images: ["/images/fleet/urbania.png", "/images/fleet/tempo_traveller.png"],
    minKm: "300",
    isPremium: true
  }
};
