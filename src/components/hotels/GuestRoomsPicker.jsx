import { useEffect, useRef, useState } from "react";
import { Users, ChevronDown, Minus, Plus } from "lucide-react";

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

export default function GuestsRoomsPicker({ rooms, adults, children, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const guests = adults + children;

  return (
    <div ref={ref} className="relative">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-navy-700 flex items-center gap-1.5">
          <Users size={13} /> Rooms &amp; Guests
        </span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="field flex items-center justify-between text-left"
        >
          <span>
            {rooms} {rooms === 1 ? "Room" : "Rooms"} · {guests} {guests === 1 ? "Guest" : "Guests"}
          </span>
          <ChevronDown size={15} className="text-navy-400 shrink-0" />
        </button>
      </label>

      {open && (
        <div className="absolute z-20 mt-1.5 w-[280px] right-0 bg-white border border-navy-50 rounded-xl shadow-pop p-4">
          <Counter
            label="Rooms"
            value={rooms}
            min={1}
            max={8}
            onChange={(v) => onChange({ rooms: v, adults, children })}
          />
          <Counter
            label="Adults"
            sub="12 yrs and above"
            value={adults}
            min={1}
            max={16}
            onChange={(v) => onChange({ rooms, adults: v, children })}
          />
          <Counter
            label="Children"
            sub="2 – 11 yrs"
            value={children}
            min={0}
            max={10}
            onChange={(v) => onChange({ rooms, adults, children: v })}
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="btn btn-navy w-full justify-center mt-3 text-sm"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
