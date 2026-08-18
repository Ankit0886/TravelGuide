import { Check } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import TripPlannerForm from "../components/TripPlannerForm";
import Reveal from "../components/Reveal";

const steps = [
  { title: "You tell us the shape of the trip", detail: "Destination, dates, headcount and trip type — the basics only." },
  { title: "We build a first-draft itinerary", detail: "A trip editor prices flights, stays and transfers within 24 hours." },
  { title: "You edit it with us", detail: "Swap a hotel, add a city, adjust the budget — as many rounds as it takes." },
  { title: "We lock it and book", detail: "Once you're happy, we handle tickets, visas and payments end to end." },
];

export default function PlanTrip() {
  return (
    <>
      <PageHero
        crumb="Plan Your Trip"
        eyebrow="Custom trip planner"
        title="Tell Us The Trip. We'll Edit It Into A Plan."
        desc="No fixed package fits perfectly — this is how we build one around you instead."
        image="https://picsum.photos/seed/plantrip-hero/1800/900"
      />

      <section className="py-14 lg:py-20">
        <div className="container-content grid lg:grid-cols-[0.9fr_1.1fr] gap-14">
          <div>
            <SectionHeading eyebrow="How it works" title="Four Steps To A Booked Trip" />
            <div className="flex flex-col gap-6">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06}>
                  <div className="flex gap-4">
                    <div className="h-9 w-9 rounded-full bg-navy-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-800 mb-1">{s.title}</h4>
                      <p className="text-sm text-navy-600/80 leading-relaxed">{s.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 bg-teal-50 border border-teal-100 rounded-2xl p-6">
              <h4 className="font-semibold text-navy-800 mb-2 flex items-center gap-2">
                <Check size={16} className="text-teal-600" /> No obligation to book
              </h4>
              <p className="text-sm text-navy-700/80 leading-relaxed">
                The first itinerary and quote are free. You only pay when you're ready to confirm.
              </p>
            </div>
          </div>

          <TripPlannerForm />
        </div>
      </section>
    </>
  );
}
