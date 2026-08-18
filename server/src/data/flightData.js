// ---------------------------------------------------------------------------
// FLIGHT PROVIDER SIMULATION (server-side)
// ---------------------------------------------------------------------------
// This module stands in for a real GDS/NDC flight-provider integration
// (e.g. Amadeus, Sabre, Travelport, or an airline's own NDC API). It is the
// single source of truth for offers, seat maps, repricing and PNR issuance —
// the frontend no longer generates any of this itself, it only renders what
// this API returns. Swap the internals of these functions for real provider
// calls when you're ready to go live; the route/controller layer and the
// response shapes can stay the same.
// ---------------------------------------------------------------------------

export const airports = [
  { code: "JAI", city: "Jaipur", name: "Jaipur International", country: "India" },
  { code: "DEL", city: "Delhi", name: "Indira Gandhi International", country: "India" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj Intl", country: "India" },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International", country: "India" },
  { code: "GOI", city: "Goa", name: "Manohar International", country: "India" },
  { code: "UDR", city: "Udaipur", name: "Maharana Pratap", country: "India" },
  { code: "COK", city: "Kochi", name: "Cochin International", country: "India" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi International", country: "India" },
  { code: "DXB", city: "Dubai", name: "Dubai International", country: "UAE" },
  { code: "SIN", city: "Singapore", name: "Changi Airport", country: "Singapore" },
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi Airport", country: "Thailand" },
  { code: "KUL", city: "Kuala Lumpur", name: "Kuala Lumpur Intl", country: "Malaysia" },
  { code: "LHR", city: "London", name: "Heathrow Airport", country: "United Kingdom" },
  { code: "JFK", city: "New York", name: "John F. Kennedy Intl", country: "United States" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle", country: "France" },
];

export const airlines = [
  { code: "6E", name: "IndiGo", accent: "#0E6F82" },
  { code: "AI", name: "Air India", accent: "#123A73" },
  { code: "UK", name: "Vistara", accent: "#F2883C" },
  { code: "SG", name: "SpiceJet", accent: "#DD6B1F" },
  { code: "EK", name: "Emirates", accent: "#0A1F3D" },
  { code: "QR", name: "Qatar Airways", accent: "#0E2C57" },
  { code: "SQ", name: "Singapore Airlines", accent: "#164B8C" },
];

export const mealOptions = [
  { id: "veg-meal", label: "Vegetarian Meal", price: 350 },
  { id: "nonveg-meal", label: "Non-Vegetarian Meal", price: 400 },
  { id: "jain-meal", label: "Jain Meal", price: 350 },
  { id: "diabetic-meal", label: "Diabetic-Friendly Meal", price: 400 },
];

export const baggageOptions = [
  { id: "bag-5", label: "+5 kg Checked Baggage", price: 900 },
  { id: "bag-10", label: "+10 kg Checked Baggage", price: 1600 },
  { id: "bag-15", label: "+15 kg Checked Baggage", price: 2200 },
];

export const priorityOptions = [
  { id: "priority-boarding", label: "Priority Boarding", price: 400 },
  { id: "priority-checkin", label: "Priority Check-in", price: 300 },
  { id: "extra-legroom-generic", label: "Preferred Seating (any available)", price: 500 },
];

const CABIN_MULTIPLIER = { economy: 1, premiumEconomy: 1.6, business: 3.2, first: 5.5 };
const FARE_TYPES = [
  { name: "Saver", refundable: false, checked: "15 kg", cabin: "7 kg" },
  { name: "Flexi", refundable: true, checked: "25 kg", cabin: "7 kg" },
  { name: "SuperSaver", refundable: false, checked: "20 kg", cabin: "7 kg" },
];

function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h || 1;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function minutesToClock(mins) {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${pad(h)}:${pad(m)}`;
}

export function formatDuration(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${pad(m)}m`;
}

const basePriceForRoute = (origin, destination) => {
  const domestic =
    airports.find((a) => a.code === origin)?.country === "India" &&
    airports.find((a) => a.code === destination)?.country === "India";
  return domestic ? 4200 : 21000;
};

const VALID_CABINS = new Set(Object.keys(CABIN_MULTIPLIER));

export class FlightApiError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

/** Validates and normalizes a leg search request coming from the client. */
export function validateSearchParams({ origin, destination, date, cabinClass = "economy", count }) {
  if (!origin || !airports.some((a) => a.code === origin)) {
    throw new FlightApiError(`Unknown origin airport: ${origin}`);
  }
  if (!destination || !airports.some((a) => a.code === destination)) {
    throw new FlightApiError(`Unknown destination airport: ${destination}`);
  }
  if (origin === destination) {
    throw new FlightApiError("Origin and destination must be different airports.");
  }
  if (!date || Number.isNaN(new Date(date).getTime())) {
    throw new FlightApiError(`Invalid date: ${date}`);
  }
  if (!VALID_CABINS.has(cabinClass)) {
    throw new FlightApiError(`Unknown cabin class: ${cabinClass}`);
  }
  const safeCount = Math.min(Math.max(Number(count) || 8, 1), 20);
  return { origin, destination, date, cabinClass, count: safeCount };
}

/**
 * Generates a deterministic-but-varied set of flight offers for a leg.
 * Deterministic per (origin,destination,date,cabinClass) so results feel
 * stable within a session, while still differing across searches.
 */
export function generateFlightOffers({ origin, destination, date, cabinClass = "economy", count = 8 }) {
  const seed = hashString(`${origin}-${destination}-${date}-${cabinClass}`);
  const rand = seededRandom(seed);
  const base = basePriceForRoute(origin, destination);
  const offers = [];

  for (let i = 0; i < count; i++) {
    const airline = airlines[Math.floor(rand() * airlines.length)];
    const fareType = FARE_TYPES[Math.floor(rand() * FARE_TYPES.length)];
    const departMinutes = Math.floor(rand() * 24 * 60);
    const durationMinutes = 60 + Math.floor(rand() * 6) * 35;
    const stops = rand() > 0.62 ? (rand() > 0.85 ? 2 : 1) : 0;
    const arriveMinutes = departMinutes + durationMinutes + stops * 45;
    const priceJitter = 0.75 + rand() * 0.9;
    const price = Math.round(
      (base * CABIN_MULTIPLIER[cabinClass] * priceJitter + stops * 900) / 10
    ) * 10;
    const seatsLeft = 1 + Math.floor(rand() * 9);
    const flightNumber = `${airline.code} ${100 + Math.floor(rand() * 899)}`;

    offers.push({
      id: `${origin}${destination}-${date}-${i}-${airline.code}`,
      airline,
      flightNumber,
      origin,
      destination,
      date,
      departTime: minutesToClock(departMinutes),
      arriveTime: minutesToClock(arriveMinutes % (24 * 60)),
      nextDay: arriveMinutes >= 24 * 60,
      durationMinutes: durationMinutes + stops * 45,
      stops,
      cabinClass,
      fareType: fareType.name,
      refundable: fareType.refundable,
      baggage: { checked: fareType.checked, cabin: fareType.cabin },
      currency: "INR",
      price,
      seatsLeft,
      fareRules: [
        fareType.refundable
          ? "Cancellation permitted; airline fee applies."
          : "Non-refundable fare; date change fee applies, no cancellation refund.",
        "Web check-in opens 48 hours before departure.",
        "Fare valid for the selected cabin and route only.",
      ],
    });
  }

  return offers.sort((a, b) => a.departTime.localeCompare(b.departTime));
}

/**
 * Simulates a reprice/availability check against the flight provider.
 * ~1 in 6 offers will show a small fare increase, mirroring real GDS
 * behaviour where a quoted fare can move before it's booked.
 */
export function repriceOffer(offer) {
  if (!offer || !offer.id || typeof offer.price !== "number") {
    throw new FlightApiError("A valid offer object (with id and price) is required.");
  }
  const rand = seededRandom(hashString(offer.id + "reprice" + Date.now().toString().slice(0, 6)));
  const changed = rand() > 0.83;
  const seatsGone = rand() > 0.95;
  if (seatsGone) {
    return { ...offer, available: false };
  }
  if (!changed) {
    return { ...offer, available: true, priceChanged: false };
  }
  const delta = Math.round((offer.price * (0.02 + rand() * 0.06)) / 10) * 10;
  return { ...offer, available: true, priceChanged: true, previousPrice: offer.price, price: offer.price + delta };
}

export function generateSeatMap(offerId) {
  if (!offerId) throw new FlightApiError("offerId is required to generate a seat map.");
  const rand = seededRandom(hashString(offerId + "seats"));
  const rows = 22;
  const cols = ["A", "B", "C", "D", "E", "F"];
  const seats = [];
  for (let r = 1; r <= rows; r++) {
    const isExtraLegroom = r === 1 || r === 12;
    const isPremium = r <= 3;
    cols.forEach((c) => {
      const roll = rand();
      let state = "available";
      if (roll > 0.82) state = "occupied";
      else if (roll > 0.78) state = "blocked";
      let price = 0;
      if (isPremium) price = 900;
      else if (isExtraLegroom) price = 550;
      else if (roll > 0.55 && roll <= 0.78) price = 250;
      seats.push({
        id: `${r}${c}`,
        row: r,
        col: c,
        state,
        type: isPremium ? "premium" : isExtraLegroom ? "legroom" : "standard",
        price,
        aisle: c === "C" || c === "D",
      });
    });
  }
  return { rows, cols, seats };
}

function randomAlphaNumeric(len, rand) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(rand() * chars.length)];
  return s;
}

/** Simulates the provider issuing a PNR + ticket numbers after a booking is paid for. */
export function issuePnr({ legs, passengers }) {
  const rand = seededRandom(Date.now() % 2147483647);
  const pnr = randomAlphaNumeric(6, rand);
  const bookingRef = `TE${randomAlphaNumeric(8, rand)}`;
  const ticketNumbers = passengers.map(() => `176-${Math.floor(1000000000 + Math.random() * 8999999999)}`);
  return {
    pnr,
    bookingRef,
    ticketNumbers,
    status: "TICKETED",
    createdAt: new Date().toISOString(),
    legs,
  };
}

/** Simulates a payment gateway authorization. ~6% decline rate, same as before. */
export function simulatePaymentCharge() {
  const failed = Math.random() < 0.06;
  return failed ? { status: "FAILED" } : { status: "CAPTURED" };
}

/**
 * Recomputes the fare total server-side from the priced offers, traveller
 * count, seat selections and addon ids — the client-computed total is only
 * ever a preview, this is the number that's actually charged/booked.
 */
export function computeFareBreakdown({ selectedFlights = [], travellerCount = 1, seatSelections = {}, addons = {} }) {
  const flights = selectedFlights.filter(Boolean);
  const baseFare = flights.reduce((sum, f) => sum + (Number(f.price) || 0), 0) * travellerCount || 0;
  const taxesAndFees = Math.round(baseFare * 0.12);
  const seatTotal = Object.values(seatSelections || {}).reduce((sum, sel) => sum + (Number(sel?.price) || 0), 0);
  const addonIds = [...(addons.baggage || []), ...(addons.meals || []), ...(addons.priority || [])];
  const allAddonDefs = [...baggageOptions, ...mealOptions, ...priorityOptions];
  const addonsTotal = addonIds.reduce((sum, id) => {
    const def = allAddonDefs.find((a) => a.id === id);
    return sum + (def ? def.price : 0);
  }, 0);
  const serviceFee = flights.length ? 299 : 0;
  const total = baseFare + taxesAndFees + seatTotal + addonsTotal + serviceFee;
  return { baseFare, taxesAndFees, seatTotal, addonsTotal, serviceFee, total };
}
