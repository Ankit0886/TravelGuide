import { Info } from "lucide-react";

export default function DemoBanner({ className = "" }) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-xl border border-sun-200 bg-sun-50 px-4 py-3 text-[13px] leading-relaxed text-navy-800 ${className}`}
    >
      <Info size={16} className="text-sun-600 shrink-0 mt-0.5" />
      <p>
        <strong className="font-semibold">Demo mode.</strong> Fares, seat maps and PNRs on this
        page are sample data for demonstrating the booking flow — no real airline inventory or
        payment is involved.
      </p>
    </div>
  );
}
