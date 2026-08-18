# Trip Edit — Website

A premium, responsive React + Vite + Tailwind site for Trip Edit (Travel Management Company, Jaipur).

## Stack
- React 19 + Vite 5 (stable Rollup-based build — not the experimental rolldown bundler)
- Tailwind CSS (solid brand colors only, no gradients — see `tailwind.config.js`)
- React Router (client-side routing across all pages)
- Framer Motion (scroll-reveal animation)
- lucide-react (icons)

## Brand tokens
Colors sampled directly from the Trip Edit logo:
- `navy` #123A73 — deep royal blue
- `teal` #0E6F82 — teal/turquoise
- `sun` #F2883C / `gold` #F5A83C — orange & yellow accents
- Fonts: Fraunces (display/serif headlines), Plus Jakarta Sans (body), Space Mono (the "boarding-pass" ticket-stub motif on destination & package cards — ties back to the plane + flight-path + pin in the logo)

## Run locally
```
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build
```

## Flights backend
The `/flights` booking flow (search, seat maps, repricing, payment + PNR
issuance, and "manage booking" lookups) is served by a small Express API in
`server/`. Nothing flight-related is generated in the browser — the frontend
only renders what this API returns.

```
cd server
npm install
cp .env.example .env
npm run dev        # http://localhost:8787
```

With both running (`npm run dev` in the project root, `npm run dev` in
`server/`), copy `.env.example` to `.env` in the project root too if you need
to point the frontend at a different API URL (defaults to
`http://localhost:8787/api`).

Bookings are persisted to `server/data/bookings.json` (created on first
booking) rather than the browser's sessionStorage, so a booking made once
can be looked up on `/manage-booking` even after a restart — as long as it's
against the same backend. See `server/README.md` for the full API surface.

## Structure
- `src/data/site.js` — all destinations, packages, services, testimonials, FAQs, blog content. Edit this file to change site content without touching components.
- `src/components/` — shared UI (Navbar, Footer, cards, forms, CTA, FAQ accordion, etc.)
- `src/pages/` — one file per route (Home, Destinations, Packages, Services, Visa, Flights, Insurance, MICE, Blog, About, Contact, PlanTrip, plus detail-page templates for destinations/packages/blog posts)

## Before launch — things to swap
- **Images**: every photo currently uses Picsum placeholder URLs (deterministic by seed, so layout is stable) — replace with real destination/office photography.
- **Contact form / Trip Planner form**: currently front-end only (shows a success state on submit). Wire to your email/CRM endpoint or a form service (Formspree, etc.) before launch.
- **Google Map embed** on the Contact page uses a generic Ajmer Road/Jaipur query — swap in your exact office coordinates.
- **Prices** in `site.js` are illustrative — update with real current fares.
