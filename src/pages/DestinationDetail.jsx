import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowUpRight, Clock3, MapPin, Check } from "lucide-react";
import { allDestinations, packages } from "../data/site";
import PageHero from "../components/PageHero";
import PackageCard from "../components/PackageCard";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";

const inclusionsBase = [
  "Return flights from Jaipur (or nearest hub)",
  "Hotel stay as per selected category",
  "Daily breakfast",
  "Airport & sightseeing transfers",
  "Visa assistance where applicable",
  "24×7 on-trip support",
];

export default function DestinationDetail() {
  const { slug } = useParams();
  const d = allDestinations.find((x) => x.slug === slug);
  if (!d) return <Navigate to="/destinations" replace />;

  const related = packages.filter((p) => p.destination === d.name).slice(0, 2);
  const morePackages = related.length ? related : packages.slice(0, 2);

  return (
    <>
      <PageHero
        crumb={d.name}
        eyebrow={d.region}
        title={d.name}
        desc={d.blurb}
        image={d.image}
      />

      <section className="py-14 lg:py-20">
        <div className="container-content grid lg:grid-cols-[1.3fr_0.9fr] gap-14">
          <div>
            <img src={d.image} alt={d.name} className="rounded-3xl w-full h-[360px] object-cover mb-10" />
            <h2 className="font-display text-2xl font-semibold text-navy-800 mb-4">
              Why travellers pick {d.name}
            </h2>
            <p className="text-navy-700/85 leading-relaxed mb-6">
              {d.blurb} Trip Edit runs {d.name} as a {d.days} circuit by default, but every stop
              is swappable — extend a city, drop a day, or turn it into a fully private FIT
              itinerary. Flights route as <span className="stub-code">{"JAI → " + d.code}</span>,
              with connections arranged around your preferred timings.
            </p>
            <h3 className="font-display text-lg font-semibold text-navy-800 mb-3">What's typically included</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {inclusionsBase.map((i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-navy-700/85">
                  <Check size={16} className="text-teal-600 shrink-0 mt-0.5" />
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="pass shadow-card p-6" style={{ "--pass-bg": "#FBFCFE" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="stub-code text-navy-800 text-base">JAI → {d.code}</span>
                <span className="stub-label flex items-center gap-1"><Clock3 size={12} /> {d.days}</span>
              </div>
              <div className="border-t-2 border-dashed border-navy-100 mb-4" />
              <span className="stub-label block mb-1">Starting from</span>
              <span className="font-display text-3xl font-semibold text-navy-800">{d.from}</span>
              <span className="text-sm text-navy-500"> /person</span>
              <div className="mt-3 flex items-center gap-1.5 text-sm text-navy-600">
                <MapPin size={14} className="text-teal-600" /> {d.region}
              </div>
              <Link to="/plan-your-trip" className="btn btn-primary w-full justify-center mt-6">
                Enquire Now <ArrowUpRight size={16} />
              </Link>
              <Link to="/visa-services" className="btn btn-outline-navy w-full justify-center mt-3">
                Check Visa Requirements
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-mist">
        <div className="container-content">
          <SectionHeading eyebrow="Related" title={`Packages Featuring ${d.name}`} />
          <div className="grid md:grid-cols-2 gap-6">
            {morePackages.map((p) => (
              <Reveal key={p.slug}>
                <PackageCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
