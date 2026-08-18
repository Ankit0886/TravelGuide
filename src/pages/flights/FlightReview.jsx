import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlaneTakeoff, Loader2, ShieldCheck, Luggage, AlertTriangle, RefreshCw } from "lucide-react";
import { useFlightBooking } from "../../context/FlightBookingContext";
import { formatDuration } from "../../data/flightsMock";
import { api } from "../../lib/api";
import BookingStepper from "../../components/flights/BookingStepper";
import DemoBanner from "../../components/flights/DemoBanner";
import FareSummaryCard from "../../components/flights/FareSummaryCard";

const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function FlightReview() {
  const navigate = useNavigate();
  const { search, selectedFlights, applyRepriceResults, travellerCount, fareBreakdown } = useFlightBooking();

  const [status, setStatus] = useState("checking"); // checking | ok | changed | unavailable | error
  const [priceDelta, setPriceDelta] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!selectedFlights.length || selectedFlights.some((f) => !f)) {
      navigate("/flights");
      return;
    }
    revalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const revalidate = () => {
    setStatus("checking");
    api
      .repriceFlights(selectedFlights)
      .then(({ offers: repriced }) => {
        if (repriced.some((f) => f.available === false)) {
          setStatus("unavailable");
          applyRepriceResults(repriced);
          return;
        }
        const delta = repriced.reduce((sum, f, i) => sum + (f.priceChanged ? f.price - selectedFlights[i].price : 0), 0);
        applyRepriceResults(repriced);
        if (delta !== 0) {
          setPriceDelta(delta);
          setStatus("changed");
        } else {
          setStatus("ok");
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setStatus("error");
      });
  };

  if (!selectedFlights.length || selectedFlights.some((f) => !f)) return null;

  return (
    <div className="pt-[110px] pb-24">
      <div className="container-content">
        <div className="mb-6">
          <BookingStepper current="review" />
        </div>

        <DemoBanner className="mb-6" />

        {status === "checking" && (
          <div className="flex items-center gap-3 text-navy-600 bg-navy-50 rounded-xl px-4 py-3 mb-6 text-sm">
            <Loader2 size={16} className="animate-spin text-teal-600" />
            Revalidating fare and availability with the airline before you continue…
          </div>
        )}

        {status === "changed" && (
          <div className="flex items-start gap-3 bg-sun-50 border border-sun-200 rounded-xl px-4 py-3.5 mb-6 text-sm text-navy-800">
            <AlertTriangle size={17} className="text-sun-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">The flight price has changed. Please review the updated fare before continuing.</p>
              <p className="text-navy-600">
                {priceDelta > 0 ? "Fare increased by " : "Fare decreased by "}
                <strong>{inr(Math.abs(priceDelta))}</strong> per traveller since you searched.
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5 mb-6 text-sm text-navy-800">
            <AlertTriangle size={17} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Couldn't revalidate this fare.</p>
              <p className="text-navy-600 mb-2">{errorMessage}</p>
              <button onClick={revalidate} className="btn btn-navy text-sm">Try again</button>
            </div>
          </div>
        )}

        {status === "unavailable" && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5 mb-6 text-sm text-navy-800">
            <AlertTriangle size={17} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-2">This flight is no longer available. Please search again.</p>
              <button onClick={() => navigate("/flights")} className="btn btn-navy text-sm">Search again</button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-navy-800 mb-6">Review your trip</h1>

            <div className="flex flex-col gap-5">
              {search.legs.map((leg, i) => {
                const offer = selectedFlights[i];
                return (
                  <div key={i} className="pass p-5 shadow-card" style={{ "--pass-bg": "#FFFFFF" }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="eyebrow text-sun-600">
                        {search.tripType === "roundTrip" ? (i === 0 ? "Outbound" : "Return") : `Flight ${i + 1}`}
                      </span>
                      {offer.priceChanged && (
                        <span className="text-[11px] font-semibold text-sun-700 bg-sun-50 px-2 py-1 rounded-full">Price updated</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: offer.airline.accent }}>
                        {offer.airline.code}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-800">{offer.airline.name} · {offer.flightNumber}</p>
                        <p className="text-xs text-navy-500">{leg.date && new Date(leg.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="font-display text-lg font-semibold text-navy-800">{offer.departTime}</p>
                        <p className="text-xs text-navy-500">{offer.origin}</p>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <span className="text-[11px] text-navy-500 mb-1">{formatDuration(offer.durationMinutes)}</span>
                        <div className="w-full flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                          <svg className="flex-1 h-[8px]" viewBox="0 0 100 8" preserveAspectRatio="none">
                            <line x1="0" y1="4" x2="100" y2="4" className="flight-path" />
                          </svg>
                          <PlaneTakeoff size={12} className="text-teal-600" />
                        </div>
                        <span className="text-[11px] text-navy-500 mt-1">{offer.stops === 0 ? "Nonstop" : `${offer.stops} stop(s)`}</span>
                      </div>
                      <div className="text-center">
                        <p className="font-display text-lg font-semibold text-navy-800">{offer.arriveTime}</p>
                        <p className="text-xs text-navy-500">{offer.destination}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-navy-50 text-navy-700 rounded-full px-2.5 py-1">
                        <Luggage size={11} /> {offer.baggage.checked} checked
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-medium rounded-full px-2.5 py-1 ${offer.refundable ? "bg-teal-50 text-teal-700" : "bg-navy-50 text-navy-500"}`}>
                        <ShieldCheck size={11} /> {offer.refundable ? "Refundable" : "Non-refundable"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button onClick={revalidate} className="text-sm font-semibold text-teal-700 flex items-center gap-1.5 hover:text-teal-800">
                <RefreshCw size={14} /> Re-check price
              </button>
            </div>
          </div>

          <div>
            <FareSummaryCard
              legs={search.legs}
              selectedFlights={selectedFlights}
              travellerCount={travellerCount}
              fareBreakdown={fareBreakdown}
              ctaLabel="Continue to Passenger Details"
              ctaDisabled={status === "checking" || status === "unavailable" || status === "error"}
              onCta={() => navigate("/flights/passengers")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
