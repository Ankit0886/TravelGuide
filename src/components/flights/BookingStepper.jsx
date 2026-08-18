import { Check } from "lucide-react";

const STEPS = [
  { id: "results", label: "Select Flight" },
  { id: "review", label: "Review" },
  { id: "passengers", label: "Passengers" },
  { id: "addons", label: "Seats & Baggage" },
  { id: "payment", label: "Payment" },
];

export default function BookingStepper({ current }) {
  const currentIndex = STEPS.findIndex((s) => s.id === current);
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1">
      {STEPS.map((step, i) => {
        const state = i < currentIndex ? "done" : i === currentIndex ? "active" : "todo";
        return (
          <div key={step.id} className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div
              className={`flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1.5 text-xs font-semibold ${
                state === "active"
                  ? "bg-navy-800 text-white"
                  : state === "done"
                  ? "bg-teal-50 text-teal-700"
                  : "bg-navy-50 text-navy-400"
              }`}
            >
              {state === "done" ? (
                <Check size={12} />
              ) : (
                <span className="stub-code">{i + 1}</span>
              )}
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {i < STEPS.length - 1 && <span className="h-px w-4 sm:w-6 bg-navy-100" />}
          </div>
        );
      })}
    </div>
  );
}
