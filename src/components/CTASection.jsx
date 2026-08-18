import { Link } from "react-router-dom";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import { company } from "../data/site";

export default function CTASection() {
  return (
    <section className="bg-teal-700 relative overflow-hidden">
      <svg
        className="absolute -right-10 -top-10 opacity-15"
        width="360" height="360" viewBox="0 0 360 360"
      >
        <circle cx="180" cy="180" r="150" className="flight-path" stroke="white" />
        <circle cx="180" cy="180" r="110" className="flight-path" stroke="white" />
      </svg>
      <div className="container-content py-16 lg:py-20 relative flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-xl text-center lg:text-left">
          <span className="eyebrow text-gold-light block mb-3">Ready when you are</span>
          <h2 className="font-display font-semibold text-[30px] sm:text-[36px] text-white leading-tight">
            Your next trip is one conversation away.
          </h2>
          <p className="mt-3 text-teal-50/90 text-[15px]">
            Tell us where, when and with whom — we'll edit it into an itinerary within 24 hours.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link to="/plan-your-trip" className="btn btn-primary">
            Plan My Trip <ArrowUpRight size={16} />
          </Link>
          <a href={`tel:${company.phones[0].replace(/\s/g, "")}`} className="btn btn-outline">
            <PhoneCall size={16} /> {company.phones[0]}
          </a>
        </div>
      </div>
    </section>
  );
}
