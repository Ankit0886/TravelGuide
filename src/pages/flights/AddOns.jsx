import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Armchair, Luggage, UtensilsCrossed, Sparkles } from "lucide-react";
import { useFlightBooking } from "../../context/FlightBookingContext";
import { useReferenceData } from "../../context/ReferenceDataContext";
import BookingStepper from "../../components/flights/BookingStepper";
import DemoBanner from "../../components/flights/DemoBanner";
import FareSummaryCard from "../../components/flights/FareSummaryCard";
import SeatMap from "../../components/flights/SeatMap";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function AddOns() {
  const navigate = useNavigate();
  const {
    search,
    selectedFlights,
    passengers,
    seatSelections,
    setSeat,
    addons,
    toggleAddon,
    travellerCount,
    fareBreakdown,
  } = useFlightBooking();
  const { addons: addonOptions } = useReferenceData();
  const { baggage: baggageOptions, meals: mealOptions, priority: priorityOptions } = addonOptions;

  const [legIndex, setLegIndex] = useState(0);
  const [passengerIndex, setPassengerIndex] = useState(0);

  useEffect(() => {
    if (!selectedFlights.length || selectedFlights.some((f) => !f) || passengers.length === 0) {
      navigate("/flights");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!selectedFlights.length || selectedFlights.some((f) => !f) || passengers.length === 0) return null;

  const offer = selectedFlights[legIndex];
  const seatKey = `${legIndex}-${passengerIndex}`;
  const selectedSeat = seatSelections[seatKey];

  const handleSeatSelect = (seat) => {
    setSeat(legIndex, passengerIndex, seat ? { id: seat.id, price: seat.price } : null);
  };

  return (
    <div className="pt-[110px] pb-24">
      <div className="container-content">
        <div className="mb-6">
          <BookingStepper current="addons" />
        </div>
        <DemoBanner className="mb-6" />

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="flex flex-col gap-8">
            <section className="pass p-5 sm:p-6 shadow-card" style={{ "--pass-bg": "#FFFFFF" }}>
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <h2 className="font-display text-xl font-semibold text-navy-800 flex items-center gap-2">
                  <Armchair size={19} className="text-teal-600" /> Choose seats
                </h2>
                <div className="flex items-center gap-2 flex-wrap">
                  {search.legs.length > 1 && (
                    <div className="flex gap-1.5">
                      {search.legs.map((l, i) => (
                        <button
                          key={i}
                          onClick={() => setLegIndex(i)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full ${legIndex === i ? "bg-navy-800 text-white" : "bg-navy-50 text-navy-600"}`}
                        >
                          {l.from?.code} → {l.to?.code}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {passengers.length > 1 && (
                <div className="flex items-center gap-2 mb-5 flex-wrap">
                  {passengers.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setPassengerIndex(i)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full ${passengerIndex === i ? "bg-teal-600 text-white" : "bg-navy-50 text-navy-600"}`}
                    >
                      {p.firstName || `${p.type} ${i + 1}`}
                    </button>
                  ))}
                </div>
              )}

              <SeatMap
                offerId={offer.id + legIndex}
                selectedSeatId={selectedSeat?.id}
                onSelect={handleSeatSelect}
              />

              <p className="text-center text-sm text-navy-600 mt-5">
                {selectedSeat ? (
                  <>Seat <strong className="text-navy-800">{selectedSeat.id}</strong> selected{selectedSeat.price ? ` · +${inr(selectedSeat.price)}` : " · Free"}</>
                ) : (
                  "No seat selected for this passenger and flight yet."
                )}
              </p>
            </section>

            <section className="pass p-5 sm:p-6 shadow-card" style={{ "--pass-bg": "#FFFFFF" }}>
              <h2 className="font-display text-xl font-semibold text-navy-800 flex items-center gap-2 mb-5">
                <Luggage size={19} className="text-teal-600" /> Extra baggage
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {baggageOptions.map((b) => (
                  <AddonTile key={b.id} option={b} checked={addons.baggage.includes(b.id)} onToggle={() => toggleAddon("baggage", b.id)} />
                ))}
              </div>
            </section>

            <section className="pass p-5 sm:p-6 shadow-card" style={{ "--pass-bg": "#FFFFFF" }}>
              <h2 className="font-display text-xl font-semibold text-navy-800 flex items-center gap-2 mb-5">
                <UtensilsCrossed size={19} className="text-teal-600" /> Meals
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {mealOptions.map((m) => (
                  <AddonTile key={m.id} option={m} checked={addons.meals.includes(m.id)} onToggle={() => toggleAddon("meals", m.id)} />
                ))}
              </div>
            </section>

            <section className="pass p-5 sm:p-6 shadow-card" style={{ "--pass-bg": "#FFFFFF" }}>
              <h2 className="font-display text-xl font-semibold text-navy-800 flex items-center gap-2 mb-5">
                <Sparkles size={19} className="text-teal-600" /> Other add-ons
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {priorityOptions.map((p) => (
                  <AddonTile key={p.id} option={p} checked={addons.priority.includes(p.id)} onToggle={() => toggleAddon("priority", p.id)} />
                ))}
              </div>
            </section>

            <div className="flex items-center justify-between">
              <button onClick={() => navigate("/flights/passengers")} className="btn btn-outline-navy text-sm">
                <ChevronLeft size={15} /> Back
              </button>
              <button onClick={() => navigate("/flights/payment")} className="btn btn-primary text-sm">
                Continue to Payment <ChevronRight size={15} />
              </button>
            </div>
          </div>

          <div>
            <FareSummaryCard
              legs={search.legs}
              selectedFlights={selectedFlights}
              travellerCount={travellerCount}
              fareBreakdown={fareBreakdown}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AddonTile({ option, checked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`text-left rounded-xl border p-3.5 transition-colors ${
        checked ? "border-teal-500 bg-teal-50" : "border-navy-100 hover:border-navy-300"
      }`}
    >
      <p className="text-sm font-medium text-navy-800">{option.label}</p>
      <p className="text-xs text-navy-500 mt-1">+{inr(option.price)}</p>
    </button>
  );
}
