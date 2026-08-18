import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

const ReferenceDataContext = createContext(null);

const EMPTY = {
  airports: [],
  airlines: [],
  addons: { baggage: [], meals: [], priority: [] },
  loading: true,
  error: null,
};

export function ReferenceDataProvider({ children }) {
  const [state, setState] = useState(EMPTY);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [{ airports }, { airlines }, addons] = await Promise.all([
          api.getAirports(),
          api.getAirlines(),
          api.getAddons(),
        ]);
        if (!cancelled) setState({ airports, airlines, addons, loading: false, error: null });
      } catch (err) {
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: err.message }));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return <ReferenceDataContext.Provider value={state}>{children}</ReferenceDataContext.Provider>;
}

export function useReferenceData() {
  const ctx = useContext(ReferenceDataContext);
  if (!ctx) throw new Error("useReferenceData must be used within ReferenceDataProvider");
  return ctx;
}
