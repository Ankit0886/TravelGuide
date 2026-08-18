# Trip Edit — Flights API

Backend for the Trip Edit flights booking flow. Simulates a flight-provider
(GDS/NDC) integration end to end — search, seat maps, repricing, payment
authorization, PNR issuance, and booking lookups — so the frontend never has
to generate flight data itself. Swap the internals of `src/data/flightData.js`
for real provider calls when you're ready to go live; the routes and response
shapes are designed to stay the same.

## Run

```
npm install
cp .env.example .env
npm run dev     # http://localhost:8787, restarts on file changes
# or
npm start
```

Set `CORS_ORIGIN` in `.env` to match wherever the frontend is running
(defaults to `http://localhost:5173`, the Vite dev server).

## Persistence

Bookings are stored in `data/bookings.json` (created automatically on first
booking). This is demo-grade file storage — swap `src/store/bookingsStore.js`
for a real database when you're ready; nothing else needs to change.

## API

All routes are mounted under `/api`.

| Method | Path                          | Description |
|---|---|---|
| GET  | `/health`                       | Liveness check |
| GET  | `/airports`                     | List of airports |
| GET  | `/airlines`                     | List of airlines |
| GET  | `/addons`                       | Baggage / meal / priority add-on catalog |
| POST | `/flights/search`               | Body: `{ origin, destination, date, cabinClass, count? }` → `{ offers }` |
| POST | `/flights/reprice`               | Body: `{ offers: [...] }` → `{ offers }` (revalidated fare/availability) |
| GET  | `/flights/:offerId/seatmap`      | → seat map for that offer |
| POST | `/bookings`                      | Body: `{ search, selectedFlights, passengers, contact, seatSelections, addons, paymentMethod, travellerCount }`. Charges payment (simulated, ~6% decline rate) and, if captured, issues a PNR and persists the booking. Returns `201` with `{ payment, booking }`, or `402` with `{ payment: { status: "FAILED" } }` if the charge is declined. |
| GET  | `/bookings/lookup?ref=&contact=` | Look up a booking by PNR/booking ref + the email or mobile used at booking |
| POST | `/bookings/:ref/cancel`          | Marks a booking `CANCELLED` |

Validation errors return `400` with `{ error: "..." }`. Unhandled errors
return `500`.

## Notes

- Fare totals are **recomputed server-side** at booking time from the
  priced offers, traveller count, seat selections and addon ids — the
  frontend's fare summary is a preview only, this is the number that's
  actually charged.
- `POST /bookings` is intentionally the single place payment is "charged" —
  never trust a client-reported payment success.
