// ---------------------------------------------------------------------------
// Simple file-backed booking store.
// ---------------------------------------------------------------------------
// Demo-grade persistence: bookings survive server restarts (unlike the old
// sessionStorage approach, which only survived within one browser tab).
// Swap this module for a real database (Postgres, etc.) in production —
// callers only depend on the exported functions below, not the storage
// mechanism.
// ---------------------------------------------------------------------------

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "..", "data");
const DB_FILE = path.join(DATA_DIR, "bookings.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "[]", "utf8");
}

function readAll() {
  ensureStore();
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

function writeAll(list) {
  ensureStore();
  // Write to a temp file then rename, so a crash mid-write can't corrupt the store.
  const tmp = `${DB_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(list, null, 2), "utf8");
  fs.renameSync(tmp, DB_FILE);
}

export function saveBooking(booking) {
  const list = readAll();
  list.push(booking);
  writeAll(list);
  return booking;
}

export function findBooking(pnrOrRef, emailOrMobile) {
  const list = readAll();
  const idQuery = String(pnrOrRef || "").trim().toLowerCase();
  const contactQuery = String(emailOrMobile || "").trim().toLowerCase();
  return (
    list.find((b) => {
      const idMatch =
        b.pnr?.toLowerCase() === idQuery || b.bookingRef?.toLowerCase() === idQuery;
      const contactMatch =
        b.contact?.email?.toLowerCase() === contactQuery ||
        b.contact?.mobile?.toLowerCase() === contactQuery;
      return idMatch && contactMatch;
    }) || null
  );
}

export function updateBookingStatus(pnrOrRef, status) {
  const list = readAll();
  const idQuery = String(pnrOrRef || "").trim().toLowerCase();
  const idx = list.findIndex(
    (b) => b.pnr?.toLowerCase() === idQuery || b.bookingRef?.toLowerCase() === idQuery
  );
  if (idx === -1) return null;
  list[idx] = { ...list[idx], status };
  writeAll(list);
  return list[idx];
}
