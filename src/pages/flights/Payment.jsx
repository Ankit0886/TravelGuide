import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, CreditCard, Wallet, Landmark, Loader2, ShieldCheck } from "lucide-react";
import { useFlightBooking } from "../../context/FlightBookingContext";
import { api } from "../../lib/api";
import BookingStepper from "../../components/flights/BookingStepper";
import DemoBanner from "../../components/flights/DemoBanner";
import FareSummaryCard from "../../components/flights/FareSummaryCard";

const METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Wallet },
  { id: "netbanking", label: "Net Banking", icon: Landmark },
];

export default function Payment() {
  const navigate = useNavigate();
  const {
    search,
    selectedFlights,
    passengers,
    contact,
    seatSelections,
    addons,
    termsAccepted,
    setTermsAccepted,
    payment,
    setPayment,
    completeBooking,
    travellerCount,
    fareBreakdown,
  } = useFlightBooking();

  const [method, setMethod] = useState("card");
  const [processingStep, setProcessingStep] = useState(null); // null | 'paying' | 'booking' | 'failed'
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!selectedFlights.length || selectedFlights.some((f) => !f) || passengers.length === 0) {
      navigate("/flights");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!selectedFlights.length || selectedFlights.some((f) => !f) || passengers.length === 0) return null;

  const payNow = () => {
    if (!termsAccepted) return;
    setProcessingStep("paying");
    setPayment({ status: "PENDING", method });

    // Give the UI a moment on "Verifying payment…" before the real network call resolves,
    // then hand off to the backend which actually charges the payment and issues the PNR.
    setTimeout(() => {
      api
        .createBooking({
          search,
          selectedFlights,
          passengers,
          contact,
          seatSelections,
          addons,
          paymentMethod: method,
          travellerCount,
        })
        .then(({ booking }) => {
          setPayment({ status: "CAPTURED" });
          setProcessingStep("booking");
          setTimeout(() => {
            completeBooking(booking);
            navigate("/booking/success");
          }, 600);
        })
        .catch((err) => {
          setPayment({ status: "FAILED" });
          setProcessingStep("failed");
          setErrorMessage(err.status === 402 ? "" : err.message);
        });
    }, 900);
  };

  return (
    <div className="pt-[110px] pb-24">
      <div className="container-content">
        <div className="mb-6">
          <BookingStepper current="payment" />
        </div>
        <DemoBanner className="mb-6" />

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-navy-800 mb-6">Payment</h1>

            <div className="pass p-5 sm:p-6 shadow-card mb-6" style={{ "--pass-bg": "#FFFFFF" }}>
              <h2 className="text-sm font-semibold text-navy-800 mb-4">Choose payment method</h2>
              <div className="grid sm:grid-cols-3 gap-3 mb-5">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors ${
                      method === m.id ? "border-teal-500 bg-teal-50" : "border-navy-100 hover:border-navy-300"
                    }`}
                  >
                    <m.icon size={20} className={method === m.id ? "text-teal-700" : "text-navy-500"} />
                    <span className="text-xs font-medium text-navy-700">{m.label}</span>
                  </button>
                ))}
              </div>

              {method === "card" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5 sm:col-span-2">
                    <span className="text-xs font-semibold text-navy-700">Card number</span>
                    <input className="field" placeholder="4242 4242 4242 4242" maxLength={19} />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-navy-700">Expiry</span>
                    <input className="field" placeholder="MM/YY" maxLength={5} />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-navy-700">CVV</span>
                    <input className="field" placeholder="•••" maxLength={3} type="password" />
                  </label>
                </div>
              )}
              {method === "upi" && (
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-navy-700">UPI ID</span>
                  <input className="field" placeholder="yourname@upi" />
                </label>
              )}
              {method === "netbanking" && (
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-navy-700">Select bank</span>
                  <select className="field">
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                </label>
              )}

              <p className="text-[11px] text-navy-500 flex items-center gap-1.5 mt-4">
                <ShieldCheck size={13} className="text-teal-600" /> Payments are simulated in this demo — no card data is transmitted or stored.
              </p>
            </div>

            <div className="pass p-5 sm:p-6 shadow-card mb-6" style={{ "--pass-bg": "#FFFFFF" }}>
              <h2 className="text-sm font-semibold text-navy-800 mb-3">Cancellation policy &amp; fare rules</h2>
              <p className="text-sm text-navy-600 leading-relaxed mb-3">
                Refund eligibility depends on the fare type of each flight and the airline's cancellation
                rules, shown at review. Trip Edit's service fee is non-refundable.
              </p>
              <label className="flex items-start gap-2.5 text-sm text-navy-700">
                <input
                  type="checkbox"
                  className="mt-0.5 accent-teal-600"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                I have read and accept the fare rules, cancellation policy and Trip Edit's{" "}
                <a href="#" className="text-teal-700 underline">Terms &amp; Conditions</a>.
              </label>
            </div>

            {processingStep === "failed" && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3.5 mb-6 text-sm text-navy-800">
                <p className="font-semibold mb-1">Payment failed</p>
                <p className="text-navy-600">
                  {errorMessage || "No amount was deducted. Please try again or use a different payment method."}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button onClick={() => navigate("/flights/add-ons")} className="btn btn-outline-navy text-sm" disabled={!!processingStep && processingStep !== "failed"}>
                <ChevronLeft size={15} /> Back
              </button>
              <button
                onClick={payNow}
                disabled={!termsAccepted || (processingStep && processingStep !== "failed")}
                className="btn btn-primary text-sm disabled:opacity-40"
              >
                {processingStep === "paying" && <><Loader2 size={15} className="animate-spin" /> Verifying payment…</>}
                {processingStep === "booking" && <><Loader2 size={15} className="animate-spin" /> Confirming booking…</>}
                {(!processingStep || processingStep === "failed") && "Pay Now"}
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
