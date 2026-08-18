import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const tripTypes = ["Family Holiday", "Group Tour", "MICE & Events", "FIT", "Honeymoon", "Luxury"];

export default function TripPlannerForm({ compact = false }) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-white rounded-2xl border border-teal-100 p-8 text-center flex flex-col items-center">
        <CheckCircle2 size={40} className="text-teal-600 mb-3" />
        <h3 className="font-display text-xl font-semibold text-navy-800 mb-1.5">Request received</h3>
        <p className="text-sm text-navy-600/80 max-w-sm">
          A Trip Edit coordinator will call you within 24 hours with a first draft itinerary.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-navy-50 shadow-card p-6 sm:p-8">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name">
          <input required type="text" placeholder="Your name" className="field" />
        </Field>
        <Field label="Phone number">
          <input required type="tel" placeholder="+91 00000 00000" className="field" />
        </Field>
        <Field label="Destination">
          <input required type="text" placeholder="Where do you want to go?" className="field" />
        </Field>
        <Field label="Trip type">
          <select required className="field" defaultValue="">
            <option value="" disabled>Select trip type</option>
            {tripTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Travel month">
          <input type="month" className="field" />
        </Field>
        <Field label="Travellers">
          <input type="number" min="1" placeholder="Number of people" className="field" />
        </Field>
      </div>
      {!compact && (
        <Field label="Anything else we should know?" className="mt-5">
          <textarea rows={3} placeholder="Budget range, must-see stops, special occasions..." className="field resize-none" />
        </Field>
      )}
      <button type="submit" className="btn btn-primary w-full sm:w-auto mt-6 justify-center">
        Get My Itinerary <Send size={15} />
      </button>
      <p className="text-xs text-navy-500 mt-3">
        No spam — just one call from a real trip editor.
      </p>
    </form>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold text-navy-700">{label}</span>
      {children}
    </label>
  );
}
