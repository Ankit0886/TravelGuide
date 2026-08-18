import "dotenv/config";
import express from "express";
import cors from "cors";
import { flightsRouter } from "./routes/flights.js";
import { bookingsRouter } from "./routes/bookings.js";
import { FlightApiError } from "./data/flightData.js";

const app = express();
const PORT = process.env.PORT || 8787;
const ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: ORIGIN }));
app.use(express.json());

// Simple request log — handy in the demo, drop/replace with a real logger in production.
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api", flightsRouter);
app.use("/api", bookingsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Central error handler — FlightApiError carries its own HTTP status.
app.use((err, req, res, next) => {
  if (err instanceof FlightApiError) {
    return res.status(err.status).json({ error: err.message });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Trip Edit flights API listening on http://localhost:${PORT}`);
  console.log(`Allowing requests from ${ORIGIN}`);
});
