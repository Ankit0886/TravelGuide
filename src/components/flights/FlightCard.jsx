import { PlaneTakeoff, ShieldCheck, Luggage, ChevronRight } from "lucide-react";
import { formatDuration } from "../../data/flightsMock";

const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function FlightCard({ offer, travellerCount = 1, onSelect, onViewDetails }) {
  const totalPrice = offer.price * travellerCount;

  return (
    <div className="pass p-5 sm:p-6 shadow-card card-lift" style={{ "--pass-bg": "#FFFFFF" }}>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5">
        <div className="flex items-center gap-3 lg:w-[190px] shrink-0">
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: offer.airline.accent }}
          >
            {offer.airline.code}
          </div>
          <div>
            <p className="text-sm font-semibold text-navy-800">{offer.airline.name}</p>
            <p className="text-xs text-navy-500 stub-code">{offer.flightNumber}</p>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-4">
          <div className="text-center">
            <p className="font-display text-xl font-semibold text-navy-800">{offer.departTime}</p>
            <p className="text-xs text-navy-500">{offer.origin}</p>
          </div>

          <div className="flex-1 flex flex-col items-center px-2">
            <span className="text-[11px] text-navy-500 mb-1">{formatDuration(offer.durationMinutes)}</span>
            <div className="relative w-full flex items-center">
              <span className="h-2 w-2 rounded-full bg-teal-600" />
              <svg className="flex-1 h-[10px]" viewBox="0 0 100 10" preserveAspectRatio="none">
                <line x1="0" y1="5" x2="100" y2="5" className="flight-path" />
              </svg>
              <PlaneTakeoff size={13} className="text-teal-600 shrink-0 -rotate-0" />
            </div>
            <span className="text-[11px] text-navy-500 mt-1">
              {offer.stops === 0 ? "Nonstop" : `${offer.stops} stop${offer.stops > 1 ? "s" : ""}`}
            </span>
          </div>

          <div className="text-center">
            <p className="font-display text-xl font-semibold text-navy-800">
              {offer.arriveTime}
              {offer.nextDay && <sup className="text-[10px] text-sun-600 ml-0.5">+1</sup>}
            </p>
            <p className="text-xs text-navy-500">{offer.destination}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:w-[220px]">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-navy-50 text-navy-700 rounded-full px-2.5 py-1">
            <Luggage size={11} /> {offer.baggage.checked}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-medium rounded-full px-2.5 py-1 ${
              offer.refundable ? "bg-teal-50 text-teal-700" : "bg-navy-50 text-navy-500"
            }`}
          >
            <ShieldCheck size={11} /> {offer.refundable ? "Refundable" : "Non-refundable"}
          </span>
          <span className="text-[11px] font-medium bg-sun-50 text-sun-700 rounded-full px-2.5 py-1">
            {offer.fareType}
          </span>
        </div>

        <div className="flex lg:flex-col items-center lg:items-end justify-between lg:w-[170px] gap-3 lg:gap-2 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-navy-50">
          <div className="text-right">
            <p className="font-display text-2xl font-semibold text-navy-800">{inr(totalPrice)}</p>
            <p className="text-xs text-navy-500">
              {inr(offer.price)} x {travellerCount} {travellerCount > 1 ? "travellers" : "traveller"}
            </p>
          </div>
          <button onClick={() => onSelect(offer)} className="btn btn-primary text-sm justify-center w-full lg:w-auto">
            Select
          </button>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(offer)}
        className="mt-4 flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800"
      >
        Flight details &amp; fare rules <ChevronRight size={13} />
      </button>
    </div>
  );
}
