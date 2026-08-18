import { Router } from "express";
import {
  airports,
  airlines,
  mealOptions,
  baggageOptions,
  priorityOptions,
  generateFlightOffers,
  repriceOffer,
  generateSeatMap,
  validateSearchParams,
  FlightApiError,
} from "../data/flightData.js";

export const flightsRouter = Router();

// Reference data -------------------------------------------------------

flightsRouter.get("/airports", (req, res) => {
  res.json({ airports });
});

flightsRouter.get("/airlines", (req, res) => {
  res.json({ airlines });
});

flightsRouter.get("/addons", (req, res) => {
  res.json({ baggage: baggageOptions, meals: mealOptions, priority: priorityOptions });
});

// Search -----------------------------------------------------------------

flightsRouter.post("/flights/search", (req, res, next) => {
  try {
    const params = validateSearchParams(req.body || {});
    const offers = generateFlightOffers(params);
    res.json({ offers });
  } catch (err) {
    next(err);
  }
});

// Reprice / availability recheck -----------------------------------------

flightsRouter.post("/flights/reprice", (req, res, next) => {
  try {
    const offers = req.body?.offers;
    if (!Array.isArray(offers) || offers.length === 0) {
      throw new FlightApiError("Request body must include a non-empty `offers` array.");
    }
    const repriced = offers.map(repriceOffer);
    res.json({ offers: repriced });
  } catch (err) {
    next(err);
  }
});

// Seat map -----------------------------------------------------------------

flightsRouter.get("/flights/:offerId/seatmap", (req, res, next) => {
  try {
    const seatMap = generateSeatMap(req.params.offerId);
    res.json(seatMap);
  } catch (err) {
    next(err);
  }
});
