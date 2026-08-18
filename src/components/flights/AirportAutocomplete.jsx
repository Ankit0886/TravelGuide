import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { useReferenceData } from "../../context/ReferenceDataContext";

export default function AirportAutocomplete({ label, icon: Icon, value, onChange, placeholder }) {
  const { airports } = useReferenceData();
  const [query, setQuery] = useState(value ? `${value.city} (${value.code})` : "");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef(null);

  useEffect(() => {
    setQuery(value ? `${value.city} (${value.code})` : "");
  }, [value]);

  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const matches = airports
    .filter((a) => {
      const q = query.toLowerCase();
      return (
        !q ||
        a.city.toLowerCase().includes(q) ||
        a.code.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q)
      );
    })
    .slice(0, 6);

  const select = (airport) => {
    onChange(airport);
    setQuery(`${airport.city} (${airport.code})`);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-navy-700 flex items-center gap-1.5">
          {Icon && <Icon size={13} />} {label}
        </span>
        <input
          className="field"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlight(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setHighlight((h) => Math.min(h + 1, matches.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHighlight((h) => Math.max(h - 1, 0));
            } else if (e.key === "Enter") {
              e.preventDefault();
              if (matches[highlight]) select(matches[highlight]);
            }
          }}
          autoComplete="off"
        />
      </label>
      {open && matches.length > 0 && (
        <div className="absolute z-20 mt-1.5 w-full min-w-[260px] bg-white border border-navy-50 rounded-xl shadow-pop overflow-hidden">
          {matches.map((a, i) => (
            <button
              type="button"
              key={a.code}
              onMouseDown={() => select(a)}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left text-sm ${
                i === highlight ? "bg-navy-50" : "hover:bg-navy-50"
              }`}
            >
              <MapPin size={14} className="text-teal-600 shrink-0" />
              <span className="flex-1">
                <span className="font-medium text-navy-800">{a.city}</span>{" "}
                <span className="text-navy-500 text-xs">{a.name}</span>
              </span>
              <span className="stub-code text-xs text-navy-600">{a.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
