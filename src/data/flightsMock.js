// ---------------------------------------------------------------------------
// FLIGHT DISPLAY HELPERS
// ---------------------------------------------------------------------------
// All flight search/reprice/seat-map/booking logic now lives in the backend
// (see /server). This file only keeps small, pure display helpers that are
// used directly in JSX and have nothing to do with fetching or generating
// flight data.
// ---------------------------------------------------------------------------

function pad(n) {
  return String(n).padStart(2, "0");
}

export function formatDuration(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${pad(m)}m`;
}
