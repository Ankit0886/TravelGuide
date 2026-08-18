import { useState } from "react";
import { Search, PlaneTakeoff, ShieldAlert, XCircle, Loader2 } from "lucide-react";
import PageHero from "../components/PageHero";
import DemoBanner from "../components/flights/DemoBanner";
import { api } from "../lib/api";

const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function ManageBooking() {
  const [pnr, setPnr] = useState("");
  const [contact, setContact] = useState("");
  const [result, setResult] = useState(undefined); // undefined = not searched, null = not found
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const search = (e) => {
    e.preventDefault();
    setSearching(true);
    setSearchError("");
    api
      .lookupBooking(pnr, contact)
      .then(({ booking }) => {
        setResult(booking || null);
        setCancelled(false);
      })
      .catch((err) => {
        setResult(null);
        setSearchError(err.message);
      })
      .finally(() => setSearching(false));
  };

  const cancel = () => {
    if (!result) return;
    setCancelling(true);
    api
      .cancelBooking(result.pnr)
      .then(() => setCancelled(true))
      .catch((err) => setSearchError(err.message))
      .finally(() => setCancelling(false));
  };

  return (
    <>
      <PageHero
        crumb="Manage Booking"
        eyebrow="Already booked?"
        title="Manage Your Booking"
        desc="Look up your PNR to view, download or cancel an existing Trip Edit flight booking."
        image="https://picsum.photos/seed/manage-booking/1800/900"
      />

      <section className="py-14 lg:py-20">
        <div className="container-content max-w-2xl">
          <DemoBanner className="mb-8" />

          <form onSubmit={search} className="pass shadow-pop p-6 sm:p-8 mb-8" style={{ "--pass-bg": "#FBFCFE" }}>
            <h2 className="font-display text-xl font-semibold text-navy-800 mb-5">Find your booking</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-navy-700">PNR / Booking reference</span>
                <input className="field" value={pnr} onChange={(e) => setPnr(e.target.value)} placeholder="e.g. TE4X8QK2" required />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-navy-700">Email or mobile used at booking</span>
                <input className="field" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="you@example.com" required />
              </label>
            </div>
            <button type="submit" className="btn btn-primary" disabled={searching}>
              {searching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              {searching ? "Searching…" : "Find Booking"}
            </button>
          </form>

          {searchError && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5 mb-8 text-sm text-navy-800">
              <ShieldAlert size={17} className="text-red-500 shrink-0 mt-0.5" />
              <p>{searchError}</p>
            </div>
          )}

          {result === null && (
            <div className="flex items-start gap-3 bg-sun-50 border border-sun-200 rounded-xl px-4 py-3.5 text-sm text-navy-800">
              <ShieldAlert size={17} className="text-sun-600 shrink-0 mt-0.5" />
              <p>
                We couldn't find a booking matching that reference and contact detail. Since this is a
                demo, lookups only work for bookings made in this browser session.
              </p>
            </div>
          )}

          {result && (
            <div className="pass shadow-card p-6 sm:p-8" style={{ "--pass-bg": "#FFFFFF" }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="eyebrow text-sun-600">PNR</span>
                  <p className="stub-code text-xl font-bold text-navy-800">{result.pnr}</p>
                </div>
                <span className="text-xs font-semibold bg-teal-50 text-teal-700 rounded-full px-3 py-1">
                  {cancelled ? "CANCELLED" : result.status}
                </span>
              </div>

              <div className="flex flex-col gap-3 mb-5">
                {result.legs.map((leg, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm">
                    <PlaneTakeoff size={14} className="text-teal-600 shrink-0" />
                    <span className="text-navy-800 font-medium">
                      {leg.from?.city} ({leg.from?.code}) → {leg.to?.city} ({leg.to?.code})
                    </span>
                    <span className="text-navy-500 text-xs ml-auto">{leg.date}</span>
                  </div>
                ))}
              </div>

              <div className="pass-divider-h my-4" />

              <p className="text-sm text-navy-600 mb-1">
                {result.passengers?.length} passenger{result.passengers?.length > 1 ? "s" : ""} · Total paid {inr(result.fareBreakdown?.total || result.total || 0)}
              </p>

              {!cancelled ? (
                <button
                  onClick={cancel}
                  disabled={cancelling}
                  className="btn btn-outline-navy text-sm mt-4 disabled:opacity-50"
                >
                  <XCircle size={15} /> {cancelling ? "Cancelling…" : "Cancel booking"}
                </button>
              ) : (
                <p className="text-sm text-teal-700 font-medium mt-4">
                  Booking cancelled. Refund eligibility is being checked against the fare rules; you'll
                  receive an email once it's processed.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
