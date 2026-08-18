import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import DestinationCard from "../components/DestinationCard";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import { destinations } from "../data/site";

export default function Destinations() {
  const [params, setParams] = useSearchParams();
  const initialType = params.get("type") === "domestic" ? "domestic" : "all";
  const [type, setType] = useState(initialType);
  const [q, setQ] = useState(params.get("q") || "");

  const list = useMemo(() => {
    let base =
      type === "international"
        ? destinations.international
        : type === "domestic"
        ? destinations.domestic
        : [...destinations.international, ...destinations.domestic];
    if (q.trim()) {
      const s = q.toLowerCase();
      base = base.filter(
        (d) => d.name.toLowerCase().includes(s) || d.region.toLowerCase().includes(s)
      );
    }
    return base;
  }, [type, q]);

  return (
    <>
      <PageHero
        crumb="Destinations"
        eyebrow="Browse by map"
        title="Every Destination Trip Edit Sends You To"
        desc="26 destinations, international and domestic — filter by region or search by name."
        image="https://picsum.photos/seed/destinations-hero/1800/900"
      />

      <section className="py-14 lg:py-20">
        <div className="container-content">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-10">
            <div className="flex gap-2">
              {[
                { id: "all", label: "All" },
                { id: "international", label: "International" },
                { id: "domestic", label: "Domestic" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    type === t.id
                      ? "bg-navy-800 text-white border-navy-800"
                      : "bg-white text-navy-700 border-navy-100 hover:border-navy-300"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="text"
              placeholder="Search destinations..."
              className="field sm:w-64"
            />
          </div>

          {list.length === 0 ? (
            <p className="text-navy-600/70 text-sm">
              No destinations match "{q}" — try a different region or name.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((d, i) => (
                <Reveal key={d.slug} delay={(i % 6) * 0.04}>
                  <div className="mx-auto w-full flex justify-center">
                    <DestinationCard d={d} />
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
