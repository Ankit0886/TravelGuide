import { Plane } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import FlightSearchForm from "../components/flights/FlightSearchForm";
import DemoBanner from "../components/flights/DemoBanner";
import { destinations } from "../data/site";

const routes = [...destinations.international.slice(0, 6), ...destinations.domestic.slice(0, 2)];

export default function Flights() {
  return (
    <>
      <PageHero
        crumb="Flights"
        eyebrow="Book Flights with Trip Edit"
        title="Search Domestic And International Flights"
        desc="Compare fares across every major airline and plan your journey with Trip Edit."
        image="https://picsum.photos/seed/flights-hero/1800/900"
      />

      <section className="py-14 lg:py-20">
        <div className="container-content">
          <div className="mb-16">
            <FlightSearchForm />
            <DemoBanner className="mt-4" />
          </div>

          <SectionHeading eyebrow="Popular routes" title="Fares Our Desk Books Often" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {routes.map((d) => (
              <div key={d.slug} className="bg-white border border-navy-50 rounded-2xl p-5 shadow-card flex flex-col gap-3">
                <span className="stub-code text-navy-800">JAI → {d.code}</span>
                <span className="text-sm text-navy-600/80">{d.name}</span>
                <span className="text-xs text-navy-500">from ~₹{Math.round(parseInt(d.from.replace(/[^\d]/g, "")) * 0.3).toLocaleString("en-IN")} one-way est.</span>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Group blocks", detail: "Reserved seat blocks for MICE groups, weddings and society tours of 10+." },
              { title: "Reissue & refunds", detail: "Plans change — we handle date changes and cancellations with the airline directly." },
              { title: "Fare alerts", detail: "Ask us to watch a route and call you the moment fares drop." },
            ].map((f) => (
              <div key={f.title} className="flex gap-3">
                <Plane size={20} className="text-teal-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-navy-800 mb-1">{f.title}</h4>
                  <p className="text-sm text-navy-600/80 leading-relaxed">{f.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
