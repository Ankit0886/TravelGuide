import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import { services } from "../data/site";

export default function Services() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="Beyond the itinerary"
        title="Every Service A Trip Needs"
        desc="Visas, flights, transport, sightseeing, insurance, passports and forex — one desk, one point of contact."
        image="https://picsum.photos/seed/services-hero/1800/900"
      />

      <section className="py-14 lg:py-20">
        <div className="container-content">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 6) * 0.05}>
                <div id={s.slug} className="scroll-mt-28 h-full">
                  <ServiceCard s={s} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-14 lg:pb-20">
        <div className="container-content">
          <SectionHeading eyebrow="In detail" title="What Each Service Covers" />
          <div className="flex flex-col divide-y divide-navy-50 border-t border-b border-navy-50">
            {services.map((s) => (
              <div key={s.slug} id={`${s.slug}-detail`} className="py-6 grid sm:grid-cols-[220px_1fr] gap-2 sm:gap-8">
                <h3 className="font-display font-semibold text-navy-800">{s.name}</h3>
                <p className="text-sm text-navy-600/80 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
