import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import GuestsRoomsPicker from "./GuestRoomsPicker";

const today = new Date().toISOString().slice(0, 10);
const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

export default function HotelSearchForm({ compact = false, initial = {} }) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState(initial.destination || "");
  const [checkIn, setCheckIn] = useState(initial.checkIn || today);
  const [checkOut, setCheckOut] = useState(initial.checkOut || tomorrow);
  const [rooms, setRooms] = useState(initial.rooms || 1);
  const [adults, setAdults] = useState(initial.adults || 2);
  const [children, setChildren] = useState(initial.children || 0);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (!destination.trim()) {
      setError("Tell us where you're headed — any city, region or country works.");
      return;
    }
    if (!checkIn || !checkOut) {
      setError("Please choose check-in and check-out dates.");
      return;
    }
    if (checkOut <= checkIn) {
      setError("Check-out date must be after check-in.");
      return;
    }

    const params = new URLSearchParams({
      destination: destination.trim(),
      checkIn,
      checkOut,
      rooms: String(rooms),
      adults: String(adults),
      children: String(children),
    });
    navigate(`/hotels/results?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className={`pass shadow-pop ${compact ? "p-4 sm:p-5" : "p-6 sm:p-8"}`}
      style={{ "--pass-bg": "#FBFCFE" }}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] gap-4 items-end">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-navy-700 flex items-center gap-1.5">
            <MapPin size={13} /> Destination
          </span>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Any city, region or country — try 'Udaipur' or 'Vietnam'"
            className="field"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-navy-700">Check-in</span>
          <input
            type="date"
            className="field"
            min={today}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut <= e.target.value) {
                const next = new Date(e.target.value);
                next.setDate(next.getDate() + 1);
                setCheckOut(next.toISOString().slice(0, 10));
              }
            }}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-navy-700">Check-out</span>
          <input
            type="date"
            className="field"
            min={checkIn ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().slice(0, 10) : tomorrow}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>

        <GuestsRoomsPicker
          rooms={rooms}
          adults={adults}
          children={children}
          onChange={({ rooms, adults, children }) => {
            setRooms(rooms);
            setAdults(adults);
            setChildren(children);
          }}
        />

        <button type="submit" className="btn btn-primary justify-center h-[46px]">
          Search Hotels <ArrowUpRight size={16} />
        </button>
      </div>

      {error && <p className="text-sm text-sun-700 mt-4 font-medium">{error}</p>}
    </form>
  );
}
