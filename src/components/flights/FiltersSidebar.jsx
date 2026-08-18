import { useReferenceData } from "../../context/ReferenceDataContext";

const STOP_OPTIONS = [
  { id: 0, label: "Nonstop" },
  { id: 1, label: "1 stop" },
  { id: 2, label: "2+ stops" },
];

export default function FiltersSidebar({ filters, setFilters, maxPrice }) {
  const { airlines } = useReferenceData();
  const toggleAirline = (code) => {
    setFilters((f) => ({
      ...f,
      airlines: f.airlines.includes(code) ? f.airlines.filter((a) => a !== code) : [...f.airlines, code],
    }));
  };

  const toggleStop = (id) => {
    setFilters((f) => ({
      ...f,
      stops: f.stops.includes(id) ? f.stops.filter((s) => s !== id) : [...f.stops, id],
    }));
  };

  return (
    <div className="bg-white border border-navy-50 rounded-2xl p-5 shadow-card flex flex-col gap-6 sticky top-[100px]">
      <div>
        <h4 className="text-sm font-semibold text-navy-800 mb-3">Stops</h4>
        <div className="flex flex-col gap-2">
          {STOP_OPTIONS.map((s) => (
            <label key={s.id} className="flex items-center gap-2.5 text-sm text-navy-700">
              <input
                type="checkbox"
                className="accent-teal-600"
                checked={filters.stops.includes(s.id)}
                onChange={() => toggleStop(s.id)}
              />
              {s.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-navy-800 mb-3">Airlines</h4>
        <div className="flex flex-col gap-2">
          {airlines.map((a) => (
            <label key={a.code} className="flex items-center gap-2.5 text-sm text-navy-700">
              <input
                type="checkbox"
                className="accent-teal-600"
                checked={filters.airlines.includes(a.code)}
                onChange={() => toggleAirline(a.code)}
              />
              {a.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-navy-800 mb-3">Max price</h4>
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
        <h4 className="text-sm font-semibold text-navy-800 mb-3">Fare</h4>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 text-sm text-navy-700">
            <input
              type="checkbox"
              className="accent-teal-600"
              checked={filters.refundableOnly}
              onChange={() => setFilters((f) => ({ ...f, refundableOnly: !f.refundableOnly }))}
            />
            Refundable only
          </label>
        </div>
      </div>
    </div>
  );
}

export function SortBar({ sortBy, setSortBy, resultCount }) {
  const options = [
    { id: "recommended", label: "Recommended" },
    { id: "cheapest", label: "Cheapest" },
    { id: "fastest", label: "Fastest" },
    { id: "earliest", label: "Earliest departure" },
  ];
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
      <p className="text-sm text-navy-600">
        <strong className="text-navy-800 font-semibold">{resultCount}</strong> flights found
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
