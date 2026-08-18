// ---------------------------------------------------------------------------
// Hotel search data generator
// ---------------------------------------------------------------------------
// Trip Edit doesn't restrict hotel search to a fixed list of cities the way
// flights are pinned to airports — a traveller can type literally any city,
// region or country and get a results page. This module procedurally builds
// a believable set of hotels for whatever destination string is passed in,
// seeded off that string so the same search returns the same list.
// ---------------------------------------------------------------------------

const PREFIXES = ["The Grand", "Royal", "The Imperial", "Hotel", "The Ivory", "Sunset", "The Pearl", "Golden", "The Regency", "Silver Oak", "The Lotus", "Emerald"];
const SUFFIXES = ["Palace", "Residency", "Suites", "Inn", "Retreat", "Heights", "Gardens", "Boutique Hotel", "Resort & Spa", "Manor", "Court", "Plaza"];
const AREAS = ["City Centre", "Old Town", "Riverside", "Airport Road", "Downtown", "Beachfront", "Hillside", "Business District", "Marina", "Historic Quarter"];
const ALL_AMENITIES = ["Free WiFi", "Swimming Pool", "Breakfast Included", "Free Parking", "Spa", "Gym", "Airport Shuttle", "Bar", "Restaurant", "Air Conditioning", "Pet Friendly", "Room Service"];
const BOARD_TYPES = ["Room Only", "Breakfast Included", "Half Board"];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

// Deterministic PRNG (mulberry32) so a given destination + index always
// produces the same hotel — searching "Paris" twice returns the same list.
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function titleCase(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1;
  const ms = new Date(checkOut) - new Date(checkIn);
  const nights = Math.round(ms / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 1;
}

export function generateHotels(destinationRaw, { count = 12 } = {}) {
  const destination = titleCase(destinationRaw || "Anywhere");
  const baseSeed = hashString(destination.toLowerCase());
  const list = [];

  for (let i = 0; i < count; i++) {
    const rng = mulberry32(baseSeed + i * 7919);
    const stars = [3, 3, 4, 4, 4, 5][Math.floor(rng() * 6)];
    const basePrice = 1800 + Math.floor(rng() * 9200);
    const priceAdj = stars >= 5 ? 1.7 : stars === 4 ? 1.15 : 0.75;
    const pricePerNight = Math.round((basePrice * priceAdj) / 100) * 100;

    const amenityCount = 4 + Math.floor(rng() * 4);
    const shuffled = [...ALL_AMENITIES].sort(() => rng() - 0.5);
    const amenities = shuffled.slice(0, amenityCount);

    const rating = Math.round((6.8 + rng() * 3.1) * 10) / 10;
    const reviews = 40 + Math.floor(rng() * 1800);
    const distanceKm = Math.round((0.3 + rng() * 9.5) * 10) / 10;

    list.push({
      id: `${destination.toLowerCase().replace(/\s+/g, "-")}-${i}`,
      name: `${pick(rng, PREFIXES)} ${destination} ${pick(rng, SUFFIXES)}`,
      destination,
      area: pick(rng, AREAS),
      stars,
      rating,
      reviews,
      distanceKm,
      pricePerNight,
      board: pick(rng, BOARD_TYPES),
      refundable: rng() > 0.35,
      amenities,
      image: `https://picsum.photos/seed/hotel-${destination.toLowerCase().replace(/\s+/g, "-")}-${i}/700/500`,
    });
  }

  return list;
}
