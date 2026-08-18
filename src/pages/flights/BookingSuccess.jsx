import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Printer, Mail, ClipboardList, PlaneTakeoff } from "lucide-react";
import { useFlightBooking } from "../../context/FlightBookingContext";
import DemoBanner from "../../components/flights/DemoBanner";

const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function BookingSuccess() {
  const navigate = useNavigate();
  const { booking, search, selectedFlights, passengers, contact, fareBreakdown, resetBooking } = useFlightBooking();

  useEffect(() => {
    if (!booking) navigate("/flights");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!booking) return null;

  return (
    <div className="pt-[110px] pb-24 bg-mist min-h-screen print:pt-6 print:bg-white">
      <div className="container-content max-w-3xl">
        <div className="text-center mb-8 print:hidden">
          <CheckCircle2 size={46} className="text-teal-600 mx-auto mb-4" />
          <h1 className="font-display text-3xl font-semibold text-navy-800 mb-2">Booking Confirmed</h1>
          <p className="text-navy-600">A confirmation email is on its way to {contact.email}.</p>
        </div>

        <DemoBanner className="mb-6 print:hidden" />

        <div className="pass shadow-pop p-6 sm:p-8" style={{ "--pass-bg": "#FFFFFF" }} id="eticket">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="eyebrow text-sun-600">Trip Edit Booking Reference</span>
              <p className="stub-code text-2xl font-bold text-navy-800">{booking.bookingRef}</p>
            </div>
            <div className="sm:text-right">
              <span className="eyebrow text-sun-600">PNR</span>
              <p className="stub-code text-2xl font-bold text-navy-800">{booking.pnr}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-semibold bg-teal-50 text-teal-700 rounded-full px-3 py-1">Ticket Status: {booking.status}</span>
            <span className="text-xs font-semibold bg-navy-50 text-navy-700 rounded-full px-3 py-1">Payment: Captured</span>
          </div>

          <div className="pass-divider-h my-5" />

          <h3 className="text-xs font-semibold uppercase tracking-wide text-navy-500 mb-3">Flight details</h3>
          <div className="flex flex-col gap-4 mb-6">
            {search.legs.map((leg, i) => {
              const offer = selectedFlights[i];
              return (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <PlaneTakeoff size={15} className="text-teal-600 shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-navy-800">
                      {offer.airline.name} {offer.flightNumber} · {leg.from?.city} ({offer.origin}) → {leg.to?.city} ({offer.destination})
                    </p>
                    <p className="text-xs text-navy-500">
                      {leg.date && new Date(leg.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })} · {offer.departTime} – {offer.arriveTime}
                    </p>
                  </div>
                  <span className="stub-code text-xs text-navy-500">Ticket {booking.ticketNumbers[0]}</span>
                </div>
              );
            })}
          </div>

          <div className="pass-divider-h my-5" />

          <h3 className="text-xs font-semibold uppercase tracking-wide text-navy-500 mb-3">Passenger details</h3>
          <div className="flex flex-col gap-2 mb-6">
            {passengers.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-navy-800 font-medium">{p.title} {p.firstName} {p.lastName}</span>
                <span className="stub-code text-xs text-navy-500">{booking.ticketNumbers[i] || booking.ticketNumbers[0]}</span>
              </div>
            ))}
          </div>

          <div className="pass-divider-h my-5" />

          <h3 className="text-xs font-semibold uppercase tracking-wide text-navy-500 mb-3">Payment summary</h3>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-navy-600">Total paid</span>
            <span className="font-semibold text-navy-800">{inr(fareBreakdown.total)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-navy-600">Method</span>
            <span className="text-navy-800 capitalize">{booking.paymentMethod}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 print:hidden">
          <button onClick={() => window.print()} className="btn btn-navy justify-center flex-1">
            <Printer size={16} /> Download E-Ticket
          </button>
          <button className="btn btn-outline-navy justify-center flex-1">
            <Mail size={16} /> Email Ticket
          </button>
          <Link to="/manage-booking" className="btn btn-outline-navy justify-center flex-1">
            <ClipboardList size={16} /> Manage Booking
          </Link>
        </div>

        <div className="text-center mt-8 print:hidden">
          <button
            onClick={() => { resetBooking(); navigate("/flights"); }}
            className="text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            Book another flight
          </button>
        </div>
      </div>
    </div>
  );
}
