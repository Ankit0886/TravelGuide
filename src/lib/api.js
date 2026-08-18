// ---------------------------------------------------------------------------
// Flights API client
// ---------------------------------------------------------------------------
// Thin fetch wrapper around the backend in /server. Every flight search,
// reprice, seat map, and booking now goes through the network — nothing
// flight-related is generated in the browser any more.
// ---------------------------------------------------------------------------

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8787/api";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new ApiError("Couldn't reach the flights server. Is it running?", 0);
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    throw new ApiError(body?.error || `Request failed (${res.status})`, res.status);
  }
  return body;
}

export const api = {
  getAirports: () => request("/airports"),
  getAirlines: () => request("/airlines"),
  getAddons: () => request("/addons"),

  searchFlights: ({ origin, destination, date, cabinClass, count }) =>
    request("/flights/search", {
      method: "POST",
      body: JSON.stringify({ origin, destination, date, cabinClass, count }),
    }),

  repriceFlights: (offers) =>
    request("/flights/reprice", {
      method: "POST",
      body: JSON.stringify({ offers }),
    }),

  getSeatMap: (offerId) => request(`/flights/${encodeURIComponent(offerId)}/seatmap`),

  createBooking: (payload) =>
    request("/bookings", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  lookupBooking: (ref, contact) =>
    request(`/bookings/lookup?ref=${encodeURIComponent(ref)}&contact=${encodeURIComponent(contact)}`),

  cancelBooking: (ref) => request(`/bookings/${encodeURIComponent(ref)}/cancel`, { method: "POST" }),
};

export { ApiError };
