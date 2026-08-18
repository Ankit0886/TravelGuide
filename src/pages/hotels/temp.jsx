import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, MapPin, Loader2, CalendarDays, Users } from "lucide-react";
import HotelSearchForm from "../../components/hotels/HotelSearchForm";
import HotelCard from "../../components/hotels/HotelCard";
import { generateHotels, nightsBetween } from "../../lib/hotelData";

const STAR_OPTIONS = [5, 4, 3];

function FiltersSidebar({ filters, setFilters, maxPrice }) {
  const toggleStar = (s) => {
    setFilters((f) => ({
      ...f,
      stars: f.stars.includes(s) ? f.stars.filter((x) => x !== s) : [...f.stars, s],
    }));
  };

  return (
    <div className="bg-white border border-navy-50 rounded-2xl p-5 shadow-card flex flex-col gap-6 sticky top-[100px]">
      <div>
        <h4 className="text-sm font-semibold text-navy-800 mb-3">Star rating</h4>
        <div className="flex flex-col gap-2">
          {STAR_OPTIONS.map((s) => (
            <label key={s} className="flex items-center gap-2.5 text-sm text-navy-700">
              <input
                type="checkbox"
                className="accent-teal-600"
                checked={filters.stars.includes(s)}
                onChange={() => toggleStar(s)}
              />
              {s} star{s > 1 ? "s" : ""}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-navy-800 mb-3">Max price / night</h4>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={500}
          value={filters.maxPrice ?? maxPrice}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
          className="w-full accent-teal-600"
        />
        <p className="text-xs text-navy-500 mt-1">Up to ₹{(filters.maxPrice ?? maxPrice).toLocaleString("en-IN")}</p>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-navy-800 mb-3">Booking</h4>
        <label className="flex items-center gap-2.5 text-sm text-navy-700">
          <input
            type="checkbox"
            className="accent-teal-600"
            checked={filters.refundableOnly}
            onChange={() => setFilters((f) => ({ ...f, refundableOnly: !f.refundableOnly }))}
          />
          Free cancellation only
        </label>
      </div>
    </div>
  );
}

function SortBar({ sortBy, setSortBy, resultCount }) {
  const options = [
    { id: "recommended", label: "Recommended" },
    { id: "cheapest", label: "Price: Low to High" },
    { id: "rating", label: "Top rated" },
    { id: "stars", label: "Most stars" },
  ];
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
      <p className="text-sm text-navy-600">
        <strong className="text-navy-800 font-semibold">{resultCount}</strong> hotels found
      </p>
      <div className="flex items-center gap-1.5 flex-wrap">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => setSortBy(o.id)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
              sortBy === o.id ? "bg-navy-800 text-white" : "bg-navy-50 text-navy-600 hover:bg-navy-100"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HotelResults() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const destination = params.get("destination") || "";
  const checkIn = params.get("checkIn") || "";
  const checkOut = params.get("checkOut") || "";
  const rooms = Number(params.get("rooms") || 1);
  const adults = Number(params.get("adults") || 2);
  const children = Number(params.get("children") || 0);
  const nights = nightsBetween(checkIn, checkOut);

  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [filters, setFilters] = useState({ stars: [], refundableOnly: false, maxPrice: undefined });

  useEffect(() => {
    if (!destination) {
      navigate("/hotels");
      return;
    }
    setLoading(true);
    setFilters({ stars: [], refundableOnly: false, maxPrice: undefined });
    // Simulate a brief search so results feel "fetched" — the destination
    // string itself is never validated against a fixed list, so any place
    // the traveller types resolves to a results page.
    const t = setTimeout(() => {
      setHotels(generateHotels(destination));
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, [destination, navigate]);

  const maxPrice = useMemo(() => hotels.reduce((m, h) => Math.max(m, h.pricePerNight), 0), [hotels]);

  const filtered = useMemo(() => {
    let list = hotels.filter((h) => {
      if (filters.stars.length && !filters.stars.includes(h.stars)) return false;
      if (filters.refundableOnly && !h.refundable) return false;
      if (filters.maxPrice !== undefined && h.pricePerNight > filters.maxPrice) return false;
      return true;
    });
    if (sortBy === "cheapest") list = [...list].sort((a, b) => a.pricePerNight - b.pricePerNight);
    else if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === "stars") list = [...list].sort((a, b) => b.stars - a.stars);
    else list = [...list].sort((a, b) => b.rating - a.rating - (a.pricePerNight - b.pricePerNight) / 100000);
    return list;
  }, [hotels, filters, sortBy]);

  if (!destination) return null;

  return (
    <div className="pt-[110px] pb-20">
      <div className="container-content">
        <div className="pass p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6" style={{ "--pass-bg": "#FBFCFE" }}>
          <div className="flex items-center gap-2.5">
            <MapPin size={16} className="text-teal-600" />
            <span className="font-display text-lg font-semibold text-navy-800">{destination}</span>
          </div>
          {checkIn && checkOut && (
            <span className="text-sm text-navy-500 flex items-center gap-1.5">
              <CalendarDays size={14} />
              {new Date(checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} –{" "}
              {new Date(checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · {nights} night{nights > 1 ? "s" : ""}
            </span>
          )}
          <span className="text-sm text-navy-500 flex items-center gap-1.5">
            <Users size={14} />
            {rooms} room{rooms > 1 ? "s" : ""} · {adults + children} guest{adults + children > 1 ? "s" : ""}
          </span>
          <button
            onClick={() => setShowSearch((v) => !v)}
            className="sm:ml-auto text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            {showSearch ? "Hide search" : "Edit search"}
          </button>
        </div>

        {showSearch && (
          <div className="mb-6">
            <HotelSearchForm
              compact
              initial={{ destination, checkIn, checkOut, rooms, adults, children }}
            />
          </div>
        )}

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <div className="hidden lg:block">
            {!loading && hotels.length > 0 && (
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

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-navy-500 gap-3">
                <Loader2 size={26} className="animate-spin text-teal-600" />
                <p className="text-sm">Searching stays in {destination}…</p>
              </div>
            ) : hotels.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-display text-xl text-navy-800 mb-2">No hotels found</p>
                <p className="text-sm text-navy-500 mb-6">Try a different destination or dates.</p>
                <button onClick={() => navigate("/hotels")} className="btn btn-navy">Search again</button>
              </div>
            ) : (
              <>
                <SortBar sortBy={sortBy} setSortBy={setSortBy} resultCount={filtered.length} />
                <div className="flex flex-col gap-4">
                  {filtered.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} nights={nights} />
                  ))}
                  {filtered.length === 0 && (
                    <p className="text-sm text-navy-500 py-10 text-center">No hotels match your filters.</p>
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
              Show {filtered.length} hotels
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
