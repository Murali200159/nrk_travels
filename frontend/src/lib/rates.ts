/**
 * ============================================================================
 * Rates & Terms Matrix Configuration
 * Dynamic Rates & Terms for Vehicle Classes
 * ============================================================================
 */

export interface VehicleTerms {
  vehicleClass: string;
  extraKm: number;
  extraHour: number;
  driverBhatta: number;
  tollAndParking: string; // "Paid by Customer"
  driverFood: boolean;
}

export const RATE_MATRIX: Record<string, VehicleTerms> = {
  "40-seater": {
    vehicleClass: "40 Seater Bus",
    extraKm: 65,
    extraHour: 1100,
    driverBhatta: 500,
    tollAndParking: "Paid by Customer",
    driverFood: false,
  },
  "36-seater": {
    vehicleClass: "36 Seater Bus",
    extraKm: 60,
    extraHour: 800,
    driverBhatta: 500,
    tollAndParking: "Paid by Customer",
    driverFood: false,
  },
  "28-seater": {
    vehicleClass: "28 Seater Bus",
    extraKm: 55,
    extraHour: 500,
    driverBhatta: 500,
    tollAndParking: "Paid by Customer",
    driverFood: false,
  },
  "27-seater": {
    vehicleClass: "27 Seater Bus",
    extraKm: 50,
    extraHour: 250,
    driverBhatta: 500,
    tollAndParking: "Paid by Customer",
    driverFood: false,
  },
  "20-seater": {
    vehicleClass: "20/21 Seater Bus",
    extraKm: 45,
    extraHour: 250,
    driverBhatta: 400,
    tollAndParking: "Paid by Customer",
    driverFood: false,
  },
  "17-seater": {
    vehicleClass: "16/17 Seater Tempo Traveller",
    extraKm: 35,
    extraHour: 250,
    driverBhatta: 300,
    tollAndParking: "Paid by Customer",
    driverFood: false,
  },
  "12-seater": {
    vehicleClass: "12 Seater Coach",
    extraKm: 35,
    extraHour: 250,
    driverBhatta: 300,
    tollAndParking: "Paid by Customer",
    driverFood: false,
  },
  "innova-crysta": {
    vehicleClass: "Innova Crysta / 7 Seater",
    extraKm: 20,
    extraHour: 400,
    driverBhatta: 200,
    tollAndParking: "Paid by Customer",
    driverFood: true,
  },
  "dzire": {
    vehicleClass: "4 Seater / Dzire / Sedan",
    extraKm: 14,
    extraHour: 250,
    driverBhatta: 200,
    tollAndParking: "Paid by Customer",
    driverFood: true,
  },
};

/**
 * Resolves the vehicle name, capacity, or slug to the matching vehicle terms from RATE_MATRIX.
 */
export const getVehicleTerms = (
  slug?: string,
  modelName?: string,
  pax?: number | string
): VehicleTerms => {
  const s = (slug || "").toLowerCase();
  const m = (modelName || "").toLowerCase();
  const p = Number(pax) || 0;

  // 1. Check slug matches
  if (s.includes("dzire") || s.includes("glanza") || s.includes("amaze") || s === "sedan" || s === "hatchback" || s.includes("toyota-sedan")) {
    return RATE_MATRIX["dzire"];
  }
  if (s.includes("innova") || s.includes("ertiga")) {
    return RATE_MATRIX["innova-crysta"];
  }
  if (s.includes("12-seater") || s.includes("12seater")) {
    return RATE_MATRIX["12-seater"];
  }
  if (s.includes("tempo") || s.includes("traveller") || s.includes("urbania") || s.includes("17")) {
    return RATE_MATRIX["17-seater"];
  }
  if (s.includes("mini-bus") || s.includes("minibus") || s.includes("20") || s.includes("21")) {
    return RATE_MATRIX["20-seater"];
  }
  if (s.includes("28-seater") || s.includes("28seater") || s.includes("28")) {
    return RATE_MATRIX["28-seater"];
  }
  if (s.includes("36-seater") || s.includes("36seater") || s.includes("36")) {
    return RATE_MATRIX["36-seater"];
  }
  if (s.includes("bus") || s.includes("40") || s.includes("luxury-bus")) {
    return RATE_MATRIX["40-seater"];
  }

  // 2. Check model name matches
  if (m.includes("dzire") || m.includes("glanza") || m.includes("amaze") || m.includes("toyota sedan")) {
    return RATE_MATRIX["dzire"];
  }
  if (m.includes("innova") || m.includes("ertiga")) {
    return RATE_MATRIX["innova-crysta"];
  }
  if (m.includes("tempo") || m.includes("traveller") || m.includes("urbania") || m.includes("17")) {
    return RATE_MATRIX["17-seater"];
  }
  if (m.includes("mini") || m.includes("21")) {
    return RATE_MATRIX["20-seater"];
  }
  if (m.includes("28")) {
    return RATE_MATRIX["28-seater"];
  }
  if (m.includes("36")) {
    return RATE_MATRIX["36-seater"];
  }
  if (m.includes("40") || m.includes("bus")) {
    return RATE_MATRIX["40-seater"];
  }

  // 3. Fallback to capacity (pax) matches
  if (p > 0) {
    if (p <= 4) return RATE_MATRIX["dzire"];
    if (p <= 7) return RATE_MATRIX["innova-crysta"];
    if (p <= 12) return RATE_MATRIX["12-seater"];
    if (p <= 17) return RATE_MATRIX["17-seater"];
    if (p <= 26) return RATE_MATRIX["20-seater"];
    if (p <= 28) return RATE_MATRIX["28-seater"];
    if (p <= 36) return RATE_MATRIX["36-seater"];
    return RATE_MATRIX["40-seater"];
  }

  // Final fallback
  return RATE_MATRIX["dzire"];
};

/**
 * Resolves the one-way rate (per km) for the vehicle.
 */
export const getOneWayRate = (slug?: string, modelName?: string): number => {
  const s = (slug || "").toLowerCase();
  const m = (modelName || "").toLowerCase();

  if (s.includes("dzire") || s.includes("glanza") || s.includes("amaze") || s === "sedan" || s === "hatchback" || s.includes("toyota-sedan") ||
      m.includes("dzire") || m.includes("glanza") || m.includes("amaze") || m.includes("sedan") || m.includes("hatchback") || m.includes("toyota sedan")) {
    return 20;
  }
  if (s.includes("ertiga") || m.includes("ertiga")) {
    return 28;
  }
  if (s.includes("crysta") || m.includes("crysta")) {
    return 38;
  }
  if (s.includes("hycross") || s.includes("hy-cross") || s.includes("hy cross") ||
      m.includes("hycross") || m.includes("hy-cross") || m.includes("hy cross")) {
    return 40;
  }
  if (s.includes("12-seater") || s.includes("12seater") || m.includes("12-seater") || m.includes("12 seater")) {
    return 46;
  }
  if (s.includes("tempo") || s.includes("traveller") || s.includes("urbania") || s.includes("17") ||
      m.includes("tempo") || m.includes("traveller") || m.includes("urbania") || m.includes("17 seater")) {
    return 54;
  }
  if (s.includes("mini-bus") || s.includes("minibus") || s.includes("20") || s.includes("21") ||
      m.includes("mini") || m.includes("21")) {
    return 60;
  }
  if (s.includes("28") || m.includes("28")) {
    return 80;
  }
  if (s.includes("36") || m.includes("36")) {
    return 100;
  }
  if (s.includes("bus") || s.includes("40") || m.includes("40") || m.includes("bus")) {
    return 120;
  }

  return 20; // fallback
};

/**
 * Returns formatted bullet points for terms and conditions based on vehicle rates.
 */
export const getFormattedVehicleTermsList = (
  slug?: string,
  modelName?: string,
  pax?: number | string,
  tripType?: string
): string[] => {
  const terms = getVehicleTerms(slug, modelName, pax);
  const bhattaAmount = tripType === "round-trip" ? 300 : terms.driverBhatta;
  const list = [
    `For extra kilometers (after time limit), charge is ₹${terms.extraKm}/km.`,
    `For extra hours (after time limit), charge is ₹${terms.extraHour}/hour.`,
    `Driver Bhatta is ₹${bhattaAmount}/day (per day driver allowance).`,
    "Toll gates charges and parking fees should be paid by the customer.",
  ];

  if (terms.driverFood) {
    list.push("Driver food should be paid/provided by the customer.");
  }

  return list;
};
