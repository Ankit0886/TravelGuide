import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useReferenceData } from "./ReferenceDataContext";

const FlightBookingContext = createContext(null);
const STORAGE_KEY = "tripedit_flight_booking_v1";

const initialSearch = {
  tripType: "roundTrip", // oneWay | roundTrip | multiCity
  legs: [
    { from: null, to: null, date: "" },
    { from: null, to: null, date: "" },
  ],
  adults: 1,
  children: 0,
  infants: 0,
  cabinClass: "economy",
};

function makeInitialState() {
  return {
    search: initialSearch,
    currentLegIndex: 0,
    resultsByLeg: {}, // legIndex -> offers[]
    selectedFlights: [], // parallel to legs
    passengers: [], // filled once traveller counts known
    contact: { fullName: "", email: "", mobile: "", countryCode: "+91" },
    seatSelections: {}, // `${legIndex}-${passengerIndex}` -> seat id
    seatFees: 0,
    addons: { baggage: [], meals: [], priority: [] },
    termsAccepted: false,
    payment: { status: "IDLE", method: null },
    booking: null,
  };
}

function loadState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return makeInitialState();
    const parsed = JSON.parse(raw);
    return { ...makeInitialState(), ...parsed };
  } catch {
    return makeInitialState();
  }
}

export function FlightBookingProvider({ children }) {
  const [state, setState] = useState(loadState);
  const { addons: addonCatalog } = useReferenceData();

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const travellerCount = state.search.adults + state.search.children + state.search.infants;

  // Client-side preview only — the backend recomputes and charges the
  // authoritative total when the booking is actually created.
  const fareBreakdown = useMemo(() => {
    const flights = state.selectedFlights.filter(Boolean);
    const baseFare = flights.reduce((sum, f) => sum + f.price, 0) * travellerCount || 0;
    const taxesAndFees = Math.round(baseFare * 0.12);
    const seatTotal = Object.values(state.seatSelections).reduce((sum, sel) => sum + (sel?.price || 0), 0);
    const addonIds = [...state.addons.baggage, ...state.addons.meals, ...state.addons.priority];
    const allAddonDefs = [...addonCatalog.baggage, ...addonCatalog.meals, ...addonCatalog.priority];
    const addonsTotal = addonIds.reduce((sum, id) => {
      const def = allAddonDefs.find((a) => a.id === id);
      return sum + (def ? def.price : 0);
    }, 0);
    const serviceFee = flights.length ? 299 : 0;
    const total = baseFare + taxesAndFees + seatTotal + addonsTotal + serviceFee;
    return { baseFare, taxesAndFees, seatTotal, addonsTotal, serviceFee, total };
  }, [state.selectedFlights, state.seatSelections, state.addons, travellerCount, addonCatalog]);

  const actions = useMemo(
    () => ({
      setSearch: (search) =>
        setState((s) => ({
          ...s,
          search,
          currentLegIndex: 0,
          resultsByLeg: {},
          selectedFlights: new Array(search.legs.length).fill(null),
          passengers: [],
          seatSelections: {},
          addons: { baggage: [], meals: [], priority: [] },
          termsAccepted: false,
          payment: { status: "IDLE", method: null },
          booking: null,
        })),
      setResultsForLeg: (legIndex, offers) =>
        setState((s) => ({ ...s, resultsByLeg: { ...s.resultsByLeg, [legIndex]: offers } })),
      selectFlightForLeg: (legIndex, offer) =>
        setState((s) => {
          const next = [...s.selectedFlights];
          next[legIndex] = offer;
          const nextLegIndex = legIndex + 1 < s.search.legs.length ? legIndex + 1 : legIndex;
          return { ...s, selectedFlights: next, currentLegIndex: nextLegIndex };
        }),
      setCurrentLegIndex: (i) => setState((s) => ({ ...s, currentLegIndex: i })),
      applyRepriceResults: (updatedFlights) =>
        setState((s) => ({ ...s, selectedFlights: updatedFlights })),
      initPassengers: () =>
        setState((s) => {
          if (s.passengers.length === travellerCount && s.passengers.length > 0) return s;
          const passengers = [];
          for (let i = 0; i < s.search.adults; i++)
            passengers.push({ type: "Adult", title: "Mr", firstName: "", lastName: "", dob: "", gender: "", nationality: "Indian", passportNumber: "", passportExpiry: "", passportCountry: "" });
          for (let i = 0; i < s.search.children; i++)
            passengers.push({ type: "Child", title: "Mstr", firstName: "", lastName: "", dob: "", gender: "", nationality: "Indian", passportNumber: "", passportExpiry: "", passportCountry: "" });
          for (let i = 0; i < s.search.infants; i++)
            passengers.push({ type: "Infant", title: "Inf", firstName: "", lastName: "", dob: "", gender: "", nationality: "Indian", passportNumber: "", passportExpiry: "", passportCountry: "" });
          return { ...s, passengers };
        }),
      updatePassenger: (index, patch) =>
        setState((s) => {
          const passengers = [...s.passengers];
          passengers[index] = { ...passengers[index], ...patch };
          return { ...s, passengers };
        }),
      setContact: (patch) => setState((s) => ({ ...s, contact: { ...s.contact, ...patch } })),
      setSeat: (legIndex, passengerIndex, seat) =>
        setState((s) => ({
          ...s,
          seatSelections: { ...s.seatSelections, [`${legIndex}-${passengerIndex}`]: seat },
        })),
      toggleAddon: (category, id) =>
        setState((s) => {
          const current = s.addons[category];
          const exists = current.includes(id);
          const nextList = exists ? current.filter((x) => x !== id) : [...current, id];
          return { ...s, addons: { ...s.addons, [category]: nextList } };
        }),
      setTermsAccepted: (val) => setState((s) => ({ ...s, termsAccepted: val })),
      setPayment: (payment) => setState((s) => ({ ...s, payment: { ...s.payment, ...payment } })),
      // The booking is already charged and persisted server-side by the time this
      // is called (see Payment.jsx) — this just stores the confirmed record locally
      // for the success page to render.
      completeBooking: (booking) => setState((s) => ({ ...s, booking })),
      resetBooking: () => {
        sessionStorage.removeItem(STORAGE_KEY);
        setState(makeInitialState());
      },
    }),
    [travellerCount, fareBreakdown]
  );

  const value = { ...state, travellerCount, fareBreakdown, ...actions };

  return <FlightBookingContext.Provider value={value}>{children}</FlightBookingContext.Provider>;
}

export function useFlightBooking() {
  const ctx = useContext(FlightBookingContext);
  if (!ctx) throw new Error("useFlightBooking must be used within FlightBookingProvider");
  return ctx;
}
