import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, User, Mail, Phone } from "lucide-react";
import { useFlightBooking } from "../../context/FlightBookingContext";
import BookingStepper from "../../components/flights/BookingStepper";
import FareSummaryCard from "../../components/flights/FareSummaryCard";

const TITLES = { Adult: ["Mr", "Mrs", "Ms"], Child: ["Mstr", "Miss"], Infant: ["Inf"] };
const isInternational = (legs) => legs.some((l) => l.from?.country !== l.to?.country);

function validatePassenger(p, international) {
  const errors = {};
  if (!p.firstName?.trim()) errors.firstName = "First name is required.";
  else if (!/^[A-Za-z\s]{2,}$/.test(p.firstName.trim())) errors.firstName = "Use letters only, as per ID.";
  if (!p.lastName?.trim()) errors.lastName = "Last name is required.";
  if (!p.dob) errors.dob = "Date of birth is required.";
  if (!p.gender) errors.gender = "Please select a gender.";
  if (international) {
    if (!p.passportNumber?.trim()) errors.passportNumber = "Passport number is required for international travel.";
    if (!p.passportExpiry) errors.passportExpiry = "Passport expiry is required.";
    if (!p.passportCountry?.trim()) errors.passportCountry = "Issuing country is required.";
  }
  return errors;
}

function validateContact(c) {
  const errors = {};
  if (!c.fullName?.trim()) errors.fullName = "Full name is required.";
  if (!/^\S+@\S+\.\S+$/.test(c.email || "")) errors.email = "Enter a valid email address.";
  if (!/^\d{10}$/.test(c.mobile || "")) errors.mobile = "Enter a valid 10-digit mobile number.";
  return errors;
}

export default function PassengerDetails() {
  const navigate = useNavigate();
  const {
    search,
    selectedFlights,
    passengers,
    initPassengers,
    updatePassenger,
    contact,
    setContact,
    travellerCount,
    fareBreakdown,
  } = useFlightBooking();

  const [active, setActive] = useState(0);
  const [errors, setErrors] = useState({});
  const [contactErrors, setContactErrors] = useState({});

  useEffect(() => {
    if (!selectedFlights.length || selectedFlights.some((f) => !f)) {
      navigate("/flights");
      return;
    }
    initPassengers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!selectedFlights.length || selectedFlights.some((f) => !f) || passengers.length === 0) return null;

  const international = isInternational(search.legs);
  const passenger = passengers[active];

  const goNext = () => {
    const errs = validatePassenger(passenger, international);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (active < passengers.length - 1) {
      setActive(active + 1);
      setErrors({});
    } else {
      const cErrs = validateContact(contact);
      setContactErrors(cErrs);
      if (Object.keys(cErrs).length > 0) {
        document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      navigate("/flights/add-ons");
    }
  };

  const goBack = () => {
    if (active > 0) {
      setActive(active - 1);
      setErrors({});
    } else {
      navigate("/flights/review");
    }
  };

  return (
    <div className="pt-[110px] pb-24">
      <div className="container-content">
        <div className="mb-6">
          <BookingStepper current="passengers" />
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-navy-800">Passenger details</h1>
              <span className="stub-code text-sm text-navy-500">Passenger {active + 1} of {passengers.length}</span>
            </div>

            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {passengers.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                    i === active ? "bg-navy-800 text-white" : "bg-navy-50 text-navy-600"
                  }`}
                >
                  <User size={12} /> {p.type} {i + 1}
                </button>
              ))}
            </div>

            <div className="pass p-5 sm:p-6 shadow-card" style={{ "--pass-bg": "#FFFFFF" }}>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <Field label="Title">
                  <select className="field" value={passenger.title} onChange={(e) => updatePassenger(active, { title: e.target.value })}>
                    {TITLES[passenger.type].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="First name" error={errors.firstName} className="sm:col-span-1">
                  <input className="field" value={passenger.firstName} onChange={(e) => updatePassenger(active, { firstName: e.target.value })} placeholder="As per ID" />
                </Field>
                <Field label="Last name" error={errors.lastName}>
                  <input className="field" value={passenger.lastName} onChange={(e) => updatePassenger(active, { lastName: e.target.value })} placeholder="As per ID" />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Field label="Date of birth" error={errors.dob}>
                  <input type="date" className="field" value={passenger.dob} onChange={(e) => updatePassenger(active, { dob: e.target.value })} />
                </Field>
                <Field label="Gender" error={errors.gender}>
                  <select className="field" value={passenger.gender} onChange={(e) => updatePassenger(active, { gender: e.target.value })}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
              </div>

              {international && (
                <>
                  <div className="pass-divider-h my-5" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-500 mb-4">Passport details (required for international travel)</p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <Field label="Nationality">
                      <input className="field" value={passenger.nationality} onChange={(e) => updatePassenger(active, { nationality: e.target.value })} />
                    </Field>
                    <Field label="Passport number" error={errors.passportNumber}>
                      <input className="field" value={passenger.passportNumber} onChange={(e) => updatePassenger(active, { passportNumber: e.target.value })} />
                    </Field>
                    <Field label="Passport expiry" error={errors.passportExpiry}>
                      <input type="date" className="field" value={passenger.passportExpiry} onChange={(e) => updatePassenger(active, { passportExpiry: e.target.value })} />
                    </Field>
                    <Field label="Issuing country" error={errors.passportCountry}>
                      <input className="field" value={passenger.passportCountry} onChange={(e) => updatePassenger(active, { passportCountry: e.target.value })} />
                    </Field>
                  </div>
                </>
              )}
            </div>

            {active === passengers.length - 1 && (
              <div id="contact-section" className="pass p-5 sm:p-6 shadow-card mt-6" style={{ "--pass-bg": "#FFFFFF" }}>
                <h3 className="font-display text-lg font-semibold text-navy-800 mb-4">Contact details</h3>
                <p className="text-xs text-navy-500 mb-4">We'll send your booking confirmation and e-ticket here.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full name" error={contactErrors.fullName} className="sm:col-span-2">
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
                      <input className="field pl-9" value={contact.fullName} onChange={(e) => setContact({ fullName: e.target.value })} />
                    </div>
                  </Field>
                  <Field label="Email" error={contactErrors.email}>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
                      <input type="email" className="field pl-9" value={contact.email} onChange={(e) => setContact({ email: e.target.value })} />
                    </div>
                  </Field>
                  <Field label="Mobile number" error={contactErrors.mobile}>
                    <div className="flex gap-2">
                      <input className="field w-16" value={contact.countryCode} onChange={(e) => setContact({ countryCode: e.target.value })} />
                      <div className="relative flex-1">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
                        <input className="field pl-9" value={contact.mobile} onChange={(e) => setContact({ mobile: e.target.value.replace(/\D/g, "") })} maxLength={10} />
                      </div>
                    </div>
                  </Field>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-6">
              <button onClick={goBack} className="btn btn-outline-navy text-sm"><ChevronLeft size={15} /> Back</button>
              <button onClick={goNext} className="btn btn-primary text-sm">
                {active < passengers.length - 1 ? "Next passenger" : "Continue"} <ChevronRight size={15} />
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

function Field({ label, error, children, className = "" }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold text-navy-700">{label}</span>
      {children}
      {error && <span className="text-[11px] text-sun-700 font-medium">{error}</span>}
    </label>
  );
}
