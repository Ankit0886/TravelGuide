import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { api } from "../../lib/api";

const STATE_STYLES = {
  available: "bg-white border-navy-200 text-navy-700 hover:border-teal-500 cursor-pointer",
  occupied: "bg-navy-100 border-navy-100 text-navy-300 cursor-not-allowed",
  blocked: "bg-navy-100 border-navy-100 text-navy-300 cursor-not-allowed",
  selected: "bg-teal-600 border-teal-600 text-white cursor-pointer",
};

export default function SeatMap({ offerId, selectedSeatId, onSelect }) {
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setMap(null);
    setError(null);
    if (!offerId) return;
    api
      .getSeatMap(offerId)
      .then((data) => {
        if (!cancelled) setMap(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [offerId]);

  if (error) {
    return <p className="text-sm text-red-600 text-center py-10">Couldn't load the seat map: {error}</p>;
  }

  if (!map) {
    return (
      <div className="flex items-center justify-center gap-2 text-navy-500 py-10 text-sm">
        <Loader2 size={16} className="animate-spin text-teal-600" /> Loading seat map…
      </div>
    );
  }

  const rowsList = [];
  for (let r = 1; r <= map.rows; r++) rowsList.push(r);

  return (
    <div>
      <div className="flex items-center gap-4 flex-wrap mb-5 text-xs text-navy-600">
        <Legend swatch="bg-white border border-navy-200" label="Available" />
        <Legend swatch="bg-teal-600" label="Selected" />
        <Legend swatch="bg-navy-100" label="Occupied / blocked" />
        <Legend swatch="bg-sun-100 border border-sun-300" label="Premium / extra legroom" />
      </div>

      <div className="max-w-xs mx-auto">
        {rowsList.map((r) => {
          const rowSeats = map.seats.filter((s) => s.row === r);
          return (
            <div key={r} className="flex items-center gap-1.5 mb-1.5">
              <span className="w-5 text-[10px] text-navy-400 stub-code">{r}</span>
              {rowSeats.map((seat) => {
                const isSelected = selectedSeatId === seat.id;
                const disabled = seat.state !== "available" && !isSelected;
                const styleKey = isSelected ? "selected" : seat.state;
                const isPremiumLook = (seat.type === "premium" || seat.type === "legroom") && seat.state === "available" && !isSelected;
                return (
                  <div key={seat.id} className="flex items-center">
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => onSelect(isSelected ? null : seat)}
                      title={`${seat.id}${seat.price ? ` · ₹${seat.price}` : ""}`}
                      className={`h-7 w-7 rounded-md border text-[10px] font-semibold flex items-center justify-center transition-colors ${
                        isPremiumLook ? "bg-sun-50 border-sun-300 text-sun-700 hover:border-teal-500" : STATE_STYLES[styleKey]
                      }`}
                    >
                      {seat.col}
                    </button>
                    {seat.aisle && <span className="w-3" />}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Legend({ swatch, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-3 w-3 rounded ${swatch}`} />
      {label}
    </span>
  );
}
