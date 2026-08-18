import { Router } from "express";
import { issuePnr, simulatePaymentCharge, computeFareBreakdown, FlightApiError } from "../data/flightData.js";
import { saveBooking, findBooking, updateBookingStatus } from "../store/bookingsStore.js";

export const bookingsRouter = Router();

// Create a booking: charges payment, then (if captured) issues a PNR and
// persists the booking. Mirrors a real flow where you never trust a
// client-reported "payment succeeded" — the charge happens here.
bookingsRouter.post("/bookings", (req, res, next) => {
  try {
    const {
      search,
      selectedFlights,
      passengers,
      contact,
      seatSelections,
      addons,
      paymentMethod,
      travellerCount,
    } = req.body || {};

    if (!Array.isArray(selectedFlights) || selectedFlights.some((f) => !f)) {
      throw new FlightApiError("selectedFlights must be a fully-populated array of offers.");
    }
    if (!Array.isArray(passengers) || passengers.length === 0) {
      throw new FlightApiError("At least one passenger is required.");
    }
    if (!contact?.email && !contact?.mobile) {
      throw new FlightApiError("Contact email or mobile is required.");
    }
    if (!search?.legs) {
      throw new FlightApiError("search.legs is required.");
    }

    const fareBreakdown = computeFareBreakdown({
      selectedFlights,
      travellerCount: travellerCount || passengers.length,
      seatSelections,
      addons,
    });

    const charge = simulatePaymentCharge();
    if (charge.status === "FAILED") {
      return res.status(402).json({ payment: charge });
    }

    const issued = issuePnr({ legs: search.legs, passengers });
    const booking = {
      ...issued,
      selectedFlights,
      paymentMethod: paymentMethod || null,
      contact,
      passengers,
      seatSelections: seatSelections || {},
      addons: addons || { baggage: [], meals: [], priority: [] },
      fareBreakdown,
      total: fareBreakdown.total,
    };

    saveBooking(booking);
    res.status(201).json({ payment: charge, booking });
  } catch (err) {
    next(err);
  }
});

// Look up an existing booking by PNR/booking ref + the email or mobile used at booking.
bookingsRouter.get("/bookings/lookup", (req, res, next) => {
  try {
    const { ref, contact } = req.query;
    if (!ref || !contact) {
      throw new FlightApiError("Query params `ref` and `contact` are both required.");
    }
    const booking = findBooking(ref, contact);
    if (!booking) return res.status(404).json({ booking: null });
    res.json({ booking });
  } catch (err) {
    next(err);
  }
});

// Cancel a booking by PNR/booking ref.
bookingsRouter.post("/bookings/:ref/cancel", (req, res, next) => {
  try {
    const updated = updateBookingStatus(req.params.ref, "CANCELLED");
    if (!updated) return res.status(404).json({ booking: null });
    res.json({ booking: updated });
  } catch (err) {
    next(err);
  }
});
