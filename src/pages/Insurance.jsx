import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, HeartPulse, Luggage, PlaneTakeoff, Check } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";

const plans = [
  {
    name: "Essential",
    price: "₹399",
    unit: "/ trip, up to 7 days",
    cover: ["Medical emergency up to $50,000", "Trip cancellation", "Baggage delay"],
  },
  {
    name: "Standard",
    price: "₹899",
    unit: "/ trip, up to 15 days",
    cover: ["Medical emergency up to $100,000", "Trip cancellation & interruption", "Baggage loss & delay", "Missed connection"],
    featured: true,
  },
  {
    name: "Family Cover",
    price: "₹1,499",
    unit: "/ trip, family of 4",
    cover: ["Medical emergency up to $100,000/person", "Trip cancellation & interruption", "Baggage loss & delay", "Adventure sports add-on"],
  },
];

export default function Insurance() {
  return (
    <>
      <PageHero
        crumb="Travel Insurance"
        eyebrow="Cover, compared honestly"
        title="Travel Insurance Matched To Your Trip"
        desc="Medical, baggage and cancellation cover — we compare 2–3 insurers against your itinerary and let you pick."
        image="https://picsum.photos/seed/insurance-hero/1800/900"
      />

      <section className="py-14 lg:py-20">
        <div className="container-content">
          <div className="grid sm:grid-cols-3 gap-5 mb-16">
            {[
              { icon: HeartPulse, label: "Medical emergencies abroad" },
              { icon: Luggage, label: "Lost or delayed baggage" },
              { icon: PlaneTakeoff, label: "Trip cancellation & delay" },
            ].map((f) => (
              <div key={f.label} className="bg-white border border-navy-50 rounded-2xl p-6 shadow-card flex items-center gap-3">
                <f.icon size={22} className="text-teal-600 shrink-0" />
                <span className="text-sm font-semibold text-navy-800">{f.label}</span>
              </div>
            ))}
          </div>

          <SectionHeading eyebrow="Plans" title="Pick The Cover Level" desc="Indicative pricing — exact premium depends on destination, age and trip length." />
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <div className={`rounded-2xl p-7 h-full flex flex-col border ${p.featured ? "bg-navy-800 border-navy-800 text-white" : "bg-white border-navy-50 shadow-card"}`}>
                  {p.featured && <span className="eyebrow text-gold-light mb-2">Most chosen</span>}
                  <h3 className={`font-display text-xl font-semibold mb-1 ${p.featured ? "text-white" : "text-navy-800"}`}>{p.name}</h3>
                  <div className="mb-5">
                    <span className="font-display text-3xl font-semibold">{p.price}</span>
                    <span className={`text-xs ml-1 ${p.featured ? "text-navy-100/70" : "text-navy-500"}`}>{p.unit}</span>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {p.cover.map((c) => (
                      <li key={c} className={`flex items-start gap-2 text-sm ${p.featured ? "text-navy-100/85" : "text-navy-700/85"}`}>
                        <Check size={15} className={p.featured ? "text-gold-light shrink-0 mt-0.5" : "text-teal-600 shrink-0 mt-0.5"} />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <Link to="/plan-your-trip" className={`btn justify-center ${p.featured ? "btn-primary" : "btn-outline-navy"}`}>
                    Get This Cover
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-7 flex items-start gap-4">
            <ShieldCheck size={26} className="text-teal-600 shrink-0" />
            <div>
              <h4 className="font-semibold text-navy-800 mb-1">Mandatory for most Schengen visas</h4>
              <p className="text-sm text-navy-700/80 leading-relaxed">
                If you're applying for a Schengen visa, insurance with €30,000 medical cover is a
                filing requirement, not an option. We issue a compliant certificate the same day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
