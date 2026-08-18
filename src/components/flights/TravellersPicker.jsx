import { useEffect, useRef, useState } from "react";
import { Users, ChevronDown, Minus, Plus } from "lucide-react";

const CABINS = [
  { id: "economy", label: "Economy" },
  { id: "premiumEconomy", label: "Premium Economy" },
  { id: "business", label: "Business" },
  { id: "first", label: "First" },
];

function Counter({ label, sub, value, min, max, onChange }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium text-navy-800">{label}</p>
        {sub && <p className="text-xs text-navy-500">{sub}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="h-7 w-7 rounded-full border border-navy-100 flex items-center justify-center text-navy-700 disabled:opacity-30"
        >
          <Minus size={13} />
        </button>
        <span className="w-4 text-center text-sm font-semibold text-navy-800">{value}</span>
        <button
          type="button"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="h-7 w-7 rounded-full border border-navy-100 flex items-center justify-center text-navy-700 disabled:opacity-30"
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}

export default function TravellersPicker({ adults, children, infants, cabinClass, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const total = adults + children + infants;
  const cabinLabel = CABINS.find((c) => c.id === cabinClass)?.label;

  return (
    <div ref={ref} className="relative">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-navy-700 flex items-center gap-1.5">
          <Users size={13} /> Travellers &amp; Cabin
        </span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="field flex items-center justify-between text-left"
        >
          <span>
            {total} {total === 1 ? "Traveller" : "Travellers"} · {cabinLabel}
          </span>
          <ChevronDown size={15} className="text-navy-400 shrink-0" />
        </button>
      </label>

      {open && (
        <div className="absolute z-20 mt-1.5 w-[300px] right-0 bg-white border border-navy-50 rounded-xl shadow-pop p-4">
          <Counter
            label="Adults"
            sub="12 yrs and above"
            value={adults}
            min={1}
            max={9}
            onChange={(v) => onChange({ adults: v, children, infants, cabinClass })}
          />
          <Counter
            label="Children"
            sub="2 – 11 yrs"
            value={children}
            min={0}
            max={9}
            onChange={(v) => onChange({ adults, children: v, infants, cabinClass })}
          />
          <Counter
            label="Infants"
            sub="Under 2 yrs"
            value={infants}
            min={0}
            max={adults}
            onChange={(v) => onChange({ adults, children, infants: v, cabinClass })}
          />
          <div className="pass-divider-h my-3" />
          <p className="text-xs font-semibold text-navy-700 mb-2">Cabin class</p>
          <div className="grid grid-cols-2 gap-2">
            {CABINS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onChange({ adults, children, infants, cabinClass: c.id })}
                className={`text-xs font-medium rounded-lg px-2.5 py-2 border transition-colors ${
                  cabinClass === c.id
                    ? "bg-navy-800 text-white border-navy-800"
                    : "border-navy-100 text-navy-700 hover:border-navy-300"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="btn btn-navy w-full justify-center mt-4 text-sm"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
