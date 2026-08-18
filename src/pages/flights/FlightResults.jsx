import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlidersHorizontal, X, PlaneTakeoff, Loader2 } from "lucide-react";
import { useFlightBooking } from "../../context/FlightBookingContext";
import { api } from "../../lib/api";
import BookingStepper from "../../components/flights/BookingStepper";
import DemoBanner from "../../components/flights/DemoBanner";
import FlightCard from "../../components/flights/FlightCard";
import FiltersSidebar, { SortBar } from "../../components/flights/FiltersSidebar";

export default function FlightResults() {
  const navigate = useNavigate();
  const {
    search,
    currentLegIndex,
    resultsByLeg,
    setResultsForLeg,
    selectFlightForLeg,
    travellerCount,
  } = useFlightBooking();

  const leg = search.legs[currentLegIndex];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [detailsOffer, setDetailsOffer] = useState(null);
  const [filters, setFilters] = useState({ airlines: [], stops: [], refundableOnly: false, maxPrice: undefined });

  useEffect(() => {
    if (!leg?.from || !leg?.to) {
      navigate("/flights");
      return;
    }
    setLoading(true);
    setError(null);
    setFilters({ airlines: [], stops: [], refundableOnly: false, maxPrice: undefined });
    let cancelled = false;
    api
      .searchFlights({
        origin: leg.from.code,
        destination: leg.to.code,
        date: leg.date,
        cabinClass: search.cabinClass,
      })
      .then(({ offers }) => {
        if (cancelled) return;
        setResultsForLeg(currentLegIndex, offers);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLegIndex, leg?.from?.code, leg?.to?.code, leg?.date, search.cabinClass]);

  const offers = resultsByLeg[currentLegIndex] || [];
  const maxPrice = useMemo(() => offers.reduce((m, o) => Math.max(m, o.price), 0), [offers]);

  const filtered = useMemo(() => {
    let list = offers.filter((o) => {
      if (filters.airlines.length && !filters.airlines.includes(o.airline.code)) return false;
      if (filters.stops.length && !filters.stops.includes(o.stops >= 2 ? 2 : o.stops)) return false;
      if (filters.refundableOnly && !o.refundable) return false;
      if (filters.maxPrice !== undefined && o.price > filters.maxPrice) return false;
      return true;
    });
    if (sortBy === "cheapest") list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "fastest") list = [...list].sort((a, b) => a.durationMinutes - b.durationMinutes);
    else if (sortBy === "earliest") list = [...list].sort((a, b) => a.departTime.localeCompare(b.departTime));
    else list = [...list].sort((a, b) => a.price + a.durationMinutes / 10 - (b.price + b.durationMinutes / 10));
    return list;
  }, [offers, filters, sortBy]);

  const onSelect = (offer) => {
    selectFlightForLeg(currentLegIndex, offer);
    if (currentLegIndex + 1 < search.legs.length) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/flights/review");
    }
  };

  if (!leg?.from || !leg?.to) return null;

  return (
    <div className="pt-[110px] pb-20">
      <div className="container-content">
        <div className="mb-6">
          <BookingStepper current="results" />
        </div>

        <div className="pass p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6" style={{ "--pass-bg": "#FBFCFE" }}>
          <div className="flex items-center gap-2.5">
            <PlaneTakeoff size={16} className="text-teal-600" />
            <span className="font-display text-lg font-semibold text-navy-800">
              {leg.from.city} ({leg.from.code}) → {leg.to.city} ({leg.to.code})
            </span>
          </div>
          <span className="text-sm text-navy-500">
            {new Date(leg.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
          </span>
          <span className="text-sm text-navy-500">
            {travellerCount} traveller{travellerCount > 1 ? "s" : ""} · {search.cabinClass === "premiumEconomy" ? "Premium Economy" : search.cabinClass[0].toUpperCase() + search.cabinClass.slice(1)}
          </span>
          {search.legs.length > 1 && (
            <span className="sm:ml-auto text-xs font-semibold text-sun-600 stub-code">
              Flight {currentLegIndex + 1} of {search.legs.length}
            </span>
          )}
        </div>

        <DemoBanner className="mb-6" />

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <div className="hidden lg:block">
            {!loading && offers.length > 0 && (
              <FiltersSidebar filters={filters} setFilters={setFilters} maxPrice={maxPrice} />
            )}
          </div>

          <div>
            <div className="flex items-center justify-between lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(true)}
                className="btn btn-outline-navy text-sm py-2 px-4"
              >
                <SlidersHorizontal size={14} /> Filters
              </button>
            </div>

            {error ? (
              <div className="text-center py-24">
                <p className="font-display text-xl text-navy-800 mb-2">Couldn't load flights</p>
                <p className="text-sm text-navy-500 mb-6">{error}</p>
                <button onClick={() => navigate(0)} className="btn btn-navy">Try again</button>
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-navy-500 gap-3">
                <Loader2 size={26} className="animate-spin text-teal-600" />
                <p className="text-sm">Searching flights across airlines…</p>
              </div>
            ) : offers.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-display text-xl text-navy-800 mb-2">No flights found</p>
                <p className="text-sm text-navy-500 mb-6">Try a different date or route.</p>
                <button onClick={() => navigate("/flights")} className="btn btn-navy">Search again</button>
              </div>
            ) : (
              <>
                <SortBar sortBy={sortBy} setSortBy={setSortBy} resultCount={filtered.length} />
                <div className="flex flex-col gap-4">
                  {filtered.map((offer) => (
                    <FlightCard
                      key={offer.id}
                      offer={offer}
                      travellerCount={travellerCount}
                      onSelect={onSelect}
                      onViewDetails={setDetailsOffer}
                    />
                  ))}
                  {filtered.length === 0 && (
                    <p className="text-sm text-navy-500 py-10 text-center">No flights match your filters.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[86%] max-w-sm bg-mist overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-navy-800">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X size={20} className="text-navy-600" /></button>
            </div>
            <FiltersSidebar filters={filters} setFilters={setFilters} maxPrice={maxPrice} />
            <button onClick={() => setShowFilters(false)} className="btn btn-primary w-full justify-center mt-5">
              Show {filtered.length} flights
            </button>
          </div>
        </div>
      )}

      {detailsOffer && <FlightDetailsDrawer offer={detailsOffer} onClose={() => setDetailsOffer(null)} onSelect={onSelect} />}
    </div>
  );
}

function FlightDetailsDrawer({ offer, onClose, onSelect }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-navy-950/50" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[440px] bg-white overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl font-semibold text-navy-800">Flight details</h3>
          <button onClick={onClose}><X size={20} className="text-navy-600" /></button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: offer.airline.accent }}>
            {offer.airline.code}
          </div>
          <div>
            <p className="text-sm font-semibold text-navy-800">{offer.airline.name}</p>
            <p className="text-xs text-navy-500 stub-code">{offer.flightNumber} · {offer.cabinClass}</p>
          </div>
        </div>

        <div className="pass p-4 mb-6" style={{ "--pass-bg": "#FBFCFE" }}>
          <div className="flex justify-between text-sm mb-2">
            <div>
              <p className="font-display text-lg font-semibold text-navy-800">{offer.departTime}</p>
              <p className="text-xs text-navy-500">{offer.origin}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-lg font-semibold text-navy-800">{offer.arriveTime}</p>
              <p className="text-xs text-navy-500">{offer.destination}</p>
            </div>
          </div>
          <p className="text-xs text-navy-500">{offer.stops === 0 ? "Nonstop" : `${offer.stops} stop(s)`}</p>
        </div>

        <Section title="Baggage">
          <p className="text-sm text-navy-600">Checked: {offer.baggage.checked} · Cabin: {offer.baggage.cabin}</p>
        </Section>

        <Section title="Fare rules">
          <ul className="list-disc list-inside text-sm text-navy-600 space-y-1">
            {offer.fareRules.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </Section>

        <Section title="Fare">
          <p className="text-sm text-navy-600">{offer.fareType} · {offer.refundable ? "Refundable" : "Non-refundable"}</p>
        </Section>

        <button
          onClick={() => { onSelect(offer); onClose(); }}
          className="btn btn-primary w-full justify-center mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-navy-500 mb-2">{title}</h4>
      {children}
    </div>
  );
}
