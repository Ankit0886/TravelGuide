import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowUpRight, Check, X, Clock3 } from "lucide-react";
import { packages } from "../data/site";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";

const exclusions = [
  "International/domestic airfare taxes if fare class changes",
  "Personal expenses & shopping",
  "Anything not explicitly listed as included",
  "Travel insurance (available as an add-on)",
];

function buildItinerary(p) {
  const nights = parseInt(p.days) || 5;
  const days = nights + 1;
  return Array.from({ length: days }).map((_, i) => {
    if (i === 0) return { title: "Arrival & Check-in", detail: `Land at ${p.code.split("–")[1] || p.code}, transfer to hotel, evening at leisure.` };
    if (i === days - 1) return { title: "Departure", detail: "Breakfast, last-minute shopping, transfer to airport for the return flight." };
    const h = p.highlights[(i - 1) % p.highlights.length];
    return { title: `Day ${i + 1}: ${h}`, detail: `Full day covering ${h.toLowerCase()}, with guided sightseeing and free time in the evening.` };
  });
}

export default function PackageDetail() {
  const { slug } = useParams();
  const p = packages.find((x) => x.slug === slug);
  if (!p) return <Navigate to="/#packages" replace />;

  const itinerary = buildItinerary(p);

  return (
    <>
      <PageHero crumb={p.name} eyebrow={p.category} title={p.name} desc={`${p.days} · ${p.destination}`} image={p.image} />

      <section className="py-14 lg:py-20">
        <div className="container-content grid lg:grid-cols-[1.3fr_0.9fr] gap-14">
          <div>
            <img src={p.image} alt={p.name} className="rounded-3xl w-full h-[360px] object-cover mb-10" />

            <SectionHeading eyebrow="Day by day" title="Itinerary" />
            <div className="flex flex-col gap-4 mb-14">
              {itinerary.map((day, i) => (
                <Reveal key={i} delay={i * 0.03}>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="h-9 w-9 rounded-full bg-navy-800 text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </div>
                      {i < itinerary.length - 1 && <div className="w-px flex-1 bg-navy-100 mt-1" />}
                    </div>
                    <div className="pb-6">
                      <h4 className="font-semibold text-navy-800 mb-1">{day.title}</h4>
                      <p className="text-sm text-navy-600/80 leading-relaxed">{day.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-10">
              <div>
                <h3 className="font-display text-lg font-semibold text-navy-800 mb-3">Inclusions</h3>
                <ul className="space-y-2.5">
                  {[...p.highlights, "Return flights", "Daily breakfast", "Airport transfers"].map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-navy-700/85">
                      <Check size={15} className="text-teal-600 shrink-0 mt-0.5" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-navy-800 mb-3">Exclusions</h3>
                <ul className="space-y-2.5">
                  {exclusions.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-navy-700/85">
                      <X size={15} className="text-sun-600 shrink-0 mt-0.5" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="pass shadow-card p-6" style={{ "--pass-bg": "#FBFCFE" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="stub-code text-navy-800 text-base">{p.code}</span>
                <span className="stub-label flex items-center gap-1"><Clock3 size={12} /> {p.days}</span>
              </div>
              <div className="border-t-2 border-dashed border-navy-100 mb-4" />
              <span className="stub-label block mb-1">Package price</span>
              <span className="font-display text-3xl font-semibold text-navy-800">{p.price}</span>
              <span className="text-sm text-navy-500"> /person</span>
              <p className="text-xs text-navy-500 mt-2">Twin-sharing, subject to seasonal surcharge.</p>
              <Link to="/plan-your-trip" className="btn btn-primary w-full justify-center mt-6">
                Enquire Now <ArrowUpRight size={16} />
              </Link>
              <a href="tel:+919772208007" className="btn btn-outline-navy w-full justify-center mt-3">
                Call a Trip Editor
              </a>
            </div>
          </aside>
        </div>
      </section>

      <CTASection />
    </>
  );
}
