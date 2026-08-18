import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight, PlaneTakeoff, PlaneLanding, ArrowUpRight, Plus, X } from "lucide-react";
import AirportAutocomplete from "./AirportAutocomplete";
import TravellersPicker from "./TravellersPicker";
import { useFlightBooking } from "../../context/FlightBookingContext";

const TABS = [
  { id: "oneWay", label: "One Way" },
  { id: "roundTrip", label: "Round Trip" },
  { id: "multiCity", label: "Multi City" },
];

const today = new Date().toISOString().slice(0, 10);

export default function FlightSearchForm({ compact = false }) {
  const navigate = useNavigate();
  const { search, setSearch } = useFlightBooking();

  const [tripType, setTripType] = useState(search.tripType || "roundTrip");
  const [legs, setLegs] = useState(() => {
    if (search.legs?.length && search.legs.some((l) => l.from || l.to)) return search.legs;
    return [
      { from: null, to: null, date: "" },
      { from: null, to: null, date: "" },
    ];
  });
  const [travellers, setTravellers] = useState({
    adults: search.adults || 1,
    children: search.children || 0,
    infants: search.infants || 0,
    cabinClass: search.cabinClass || "economy",
  });
  const [error, setError] = useState("");

  const updateLeg = (index, patch) => {
    setLegs((prev) => prev.map((l, i) => (i === index ? { ...l, ...patch } : l)));
  };

  const swap = (index) => {
    updateLeg(index, { from: legs[index].to, to: legs[index].from });
  };

  const addLeg = () => {
    const last = legs[legs.length - 1];
    setLegs((prev) => [...prev, { from: last?.to || null, to: null, date: "" }]);
  };

  const removeLeg = (index) => {
    setLegs((prev) => prev.filter((_, i) => i !== index));
  };

  const activeLegs = tripType === "oneWay" ? [legs[0]] : tripType === "roundTrip" ? legs.slice(0, 2) : legs;

  const submit = (e) => {
    e.preventDefault();
    setError("");

    for (const leg of activeLegs) {
      if (!leg.from || !leg.to) {
        setError("Please select origin and destination for every flight.");
        return;
      }
      if (leg.from.code === leg.to.code) {
        setError("Origin and destination cannot be the same.");
        return;
      }
      if (!leg.date) {
        setError("Please choose a travel date for every flight.");
        return;
      }
    }
    if (tripType === "roundTrip" && activeLegs[1]?.date < activeLegs[0]?.date) {
      setError("Return date cannot be before the departure date.");
      return;
    }

    const finalLegs =
      tripType === "roundTrip"
        ? [
            { from: activeLegs[0].from, to: activeLegs[0].to, date: activeLegs[0].date },
            { from: activeLegs[0].to, to: activeLegs[0].from, date: activeLegs[1].date },
          ]
        : activeLegs.map((l) => ({ from: l.from, to: l.to, date: l.date }));

    setSearch({
      tripType,
      legs: finalLegs,
      adults: travellers.adults,
      children: travellers.children,
      infants: travellers.infants,
      cabinClass: travellers.cabinClass,
    });
    navigate("/flights/results");
  };

  return (
    <form
      onSubmit={submit}
      className={`pass shadow-pop ${compact ? "p-4 sm:p-5" : "p-6 sm:p-8"}`}
      style={{ "--pass-bg": "#FBFCFE" }}
    >
      <div className="flex items-center gap-1.5 mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTripType(t.id)}
            className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
              tripType === t.id ? "bg-navy-800 text-white" : "text-navy-600 hover:bg-navy-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {activeLegs.map((leg, i) => (
          <div key={i} className="grid sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto] gap-4 items-start">
            <AirportAutocomplete
              label={tripType === "multiCity" ? `Leg ${i + 1} · From` : "From"}
              icon={PlaneTakeoff}
              placeholder="Jaipur (JAI)"
              value={leg.from}
              onChange={(a) => updateLeg(i, { from: a })}
            />

            <button
              type="button"
              onClick={() => swap(i)}
              className="hidden lg:flex items-center justify-center h-[46px] w-10 mt-6 rounded-full border border-navy-100 text-navy-500 hover:text-teal-600 hover:border-teal-300 transition-colors self-end"
              aria-label="Swap origin and destination"
            >
              <ArrowLeftRight size={15} />
            </button>

            <AirportAutocomplete
              label="To"
              icon={PlaneLanding}
              placeholder="Where to?"
              value={leg.to}
              onChange={(a) => updateLeg(i, { to: a })}
            />

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-navy-700">
                {tripType === "roundTrip" ? (i === 0 ? "Depart" : "Return") : "Depart"}
              </span>
              <input
                type="date"
                className="field"
                min={i === 0 ? today : legs[0]?.date || today}
                value={leg.date}
                onChange={(e) => updateLeg(i, { date: e.target.value })}
              />
            </label>

            {tripType === "multiCity" && legs.length > 2 && (
              <button
                type="button"
                onClick={() => removeLeg(i)}
                className="lg:col-span-4 justify-self-start text-xs font-medium text-navy-500 hover:text-sun-600 flex items-center gap-1"
              >
                <X size={13} /> Remove this flight
              </button>
            )}
          </div>
        ))}

        {tripType === "multiCity" && legs.length < 5 && (
          <button
            type="button"
            onClick={addLeg}
            className="self-start text-sm font-semibold text-teal-700 flex items-center gap-1.5 hover:text-teal-800"
          >
            <Plus size={15} /> Add another flight
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-[1fr_auto] gap-4 items-end mt-4">
        <TravellersPicker {...travellers} onChange={setTravellers} />
        <button type="submit" className="btn btn-primary justify-center h-[46px]">
          Search Flights <ArrowUpRight size={16} />
        </button>
      </div>

      {error && <p className="text-sm text-sun-700 mt-4 font-medium">{error}</p>}
    </form>
  );
}
