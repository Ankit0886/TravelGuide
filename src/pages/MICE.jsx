import { Link } from "react-router-dom";
import { ArrowUpRight, Presentation, Users, Award, CalendarClock, Check } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";

const offerings = [
  { icon: Presentation, title: "Conferences", detail: "Venue sourcing, delegate travel, AV and on-ground coordination." },
  { icon: Award, title: "Incentive Trips", detail: "Reward travel for top performers — from domestic offsites to international escapes." },
  { icon: Users, title: "Corporate Offsites", detail: "Team travel with breakout schedules built around your agenda, not around ours." },
  { icon: CalendarClock, title: "Society & Group Events", detail: "Large group departures for RWAs, alumni batches and community trips." },
];

const timeline = [
  { week: "Week 12", detail: "Scope confirmed — headcount, destination shortlist, budget band." },
  { week: "Week 8", detail: "Venue and hotel blocks locked, flight group fares held." },
  { week: "Week 4", detail: "Final delegate list, dietary and room-sharing preferences collected." },
  { week: "Week 1", detail: "Coordinator briefing, on-ground contact shared with every traveller." },
];

export default function MICE() {
  return (
    <>
      <PageHero
        crumb="MICE & Events"
        eyebrow="Meetings · Incentives · Conferences · Events"
        title="Group Travel That Runs Itself"
        desc="One event coordinator handles venue, travel, accommodation and on-ground logistics for groups of any size."
        image="https://picsum.photos/seed/mice-hero/1800/900"
      />

      <section className="py-14 lg:py-20">
        <div className="container-content">
          <SectionHeading eyebrow="What we run" title="MICE Services We Offer" />
          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {offerings.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.05}>
                <div className="bg-white border border-navy-50 rounded-2xl shadow-card p-6 flex gap-4">
                  <div className="h-11 w-11 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                    <o.icon size={20} className="text-teal-600" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-800 mb-1">{o.title}</h3>
                    <p className="text-sm text-navy-600/80 leading-relaxed">{o.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <SectionHeading eyebrow="Planning window" title="A Typical 12-Week Countdown" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {timeline.map((t, i) => (
              <Reveal key={t.week} delay={i * 0.06}>
                <div className="pass p-6 h-full shadow-card" style={{ "--pass-bg": "#FBFCFE" }}>
                  <span className="stub-code text-teal-600 block mb-2">{t.week}</span>
                  <p className="text-sm text-navy-700/85 leading-relaxed">{t.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center bg-navy-900 rounded-3xl p-8 lg:p-12">
            <div>
              <h3 className="font-display text-2xl font-semibold text-white mb-3">
                What your coordinator handles
              </h3>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {[
                  "Venue shortlisting & site visits",
                  "Group flight & bus blocks",
                  "Room allocation & rooming lists",
                  "On-ground event support staff",
                  "AV, branding & signage vendors",
                  "Post-event billing reconciliation",
                ].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy-100/85">
                    <Check size={15} className="text-gold-light shrink-0 mt-0.5" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-navy-100/80 text-sm mb-4">
                Tell us your headcount and dates — we'll send a proposal within 48 hours.
              </p>
              <Link to="/plan-your-trip" className="btn btn-primary">
                Request MICE Proposal <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
