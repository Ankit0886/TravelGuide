import { Link } from "react-router-dom";
import { BedDouble, ShieldCheck, Wallet, HeadphonesIcon } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import HotelSearchForm from "../components/hotels/HotelSearchForm";
import { destinations } from "../data/site";

const popular = [...destinations.international.slice(0, 4), ...destinations.domestic.slice(0, 4)];

export default function Hotels() {
  return (
    <>
      <PageHero
        crumb="Hotels"
        eyebrow="Stays anywhere in the world"
        title="Search Hotels In Any City, Region Or Country"
        desc="Type any destination — a city, a region, or an entire country — and see stays our desk can book for you, compared and ready to enquire."
        image="https://picsum.photos/seed/hotels-hero/1800/900"
      />

      <section className="py-14 lg:py-20">
        <div className="container-content">
          <div className="mb-16">
            <HotelSearchForm />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              { icon: BedDouble, label: "Stays in every destination we send you to" },
              { icon: Wallet, label: "No hidden convenience fees" },
              { icon: ShieldCheck, label: "Vetted properties, real cancellation terms" },
              { icon: HeadphonesIcon, label: "One coordinator handles date changes" },
            ].map((f) => (
              <div key={f.label} className="bg-white border border-navy-50 rounded-2xl p-5 flex items-center gap-3 shadow-card">
                <f.icon size={22} className="text-teal-600 shrink-0" />
                <span className="text-sm font-semibold text-navy-800">{f.label}</span>
              </div>
            ))}
          </div>

          <SectionHeading eyebrow="Frequently searched" title="Popular Hotel Destinations" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {popular.map((d) => (
              <Link
                key={d.slug}
                to={`/hotels/results?destination=${encodeURIComponent(d.name)}`}
                className="bg-white border border-navy-50 rounded-2xl overflow-hidden shadow-card card-lift group"
              >
                <div className="h-28 overflow-hidden">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-navy-800">{d.name}</h3>
                  <p className="text-xs text-navy-500">{d.region}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-sm text-navy-500 mb-14">Don't see your destination — search it above, we book stays anywhere.</p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
