import { PlaneTakeoff } from "lucide-react";

const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function FareSummaryCard({ legs, selectedFlights, travellerCount, fareBreakdown, ctaLabel, onCta, ctaDisabled }) {
  return (
    <div className="pass shadow-pop p-5 sm:p-6 sticky top-[100px]" style={{ "--pass-bg": "#FBFCFE" }}>
      <span className="eyebrow text-sun-600">Trip summary</span>
      <div className="flex flex-col gap-3 mt-3 mb-5">
        {legs.map((leg, i) => {
          const offer = selectedFlights[i];
          return (
            <div key={i} className="flex items-center gap-2 text-sm">
              <PlaneTakeoff size={14} className="text-teal-600 shrink-0" />
              <span className="font-medium text-navy-800">
                {leg.from?.code} → {leg.to?.code}
              </span>
              {offer && <span className="text-navy-500 text-xs ml-auto">{offer.departTime}</span>}
            </div>
          );
        })}
      </div>

      <div className="pass-divider-h my-4" />

      <div className="flex flex-col gap-2 text-sm">
        <Row label={`Base fare (${travellerCount} pax)`} value={fareBreakdown.baseFare} />
        <Row label="Taxes & fees" value={fareBreakdown.taxesAndFees} />
        {fareBreakdown.seatTotal > 0 && <Row label="Seats" value={fareBreakdown.seatTotal} />}
        {fareBreakdown.addonsTotal > 0 && <Row label="Baggage, meals & add-ons" value={fareBreakdown.addonsTotal} />}
        <Row label="Trip Edit service fee" value={fareBreakdown.serviceFee} />
      </div>

      <div className="pass-divider-h my-4" />

      <div className="flex items-center justify-between mb-5">
        <span className="font-semibold text-navy-800">Total</span>
        <span className="font-display text-2xl font-semibold text-navy-800">{inr(fareBreakdown.total)}</span>
      </div>

      {ctaLabel && (
        <button onClick={onCta} disabled={ctaDisabled} className="btn btn-primary w-full justify-center disabled:opacity-40">
          {ctaLabel}
        </button>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-navy-600">
      <span>{label}</span>
      <span className="font-medium text-navy-800">{inr(value)}</span>
    </div>
  );
}
