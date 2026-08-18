import { Link } from "react-router-dom";
import { ArrowUpRight, MapPinned, Users2, ShieldCheck, Sparkles } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import { whyUs, company } from "../data/site";
import * as Icons from "lucide-react";

const timeline = [
  { year: "2008", detail: "Trip Edit opens its first desk in Jaipur, focused on domestic FIT travel." },
  { year: "2013", detail: "Visa services launched — starting with Southeast Asia, expanding globally." },
  { year: "2017", detail: "Corporate MICE desk added after our first 200-delegate conference." },
  { year: "2026", detail: "12,000+ travellers served across Rajasthan, still run as one desk, one point of contact." },
];

export default function About() {
  return (
    <>
      <PageHero
        crumb="About Us"
        eyebrow="Jaipur-rooted, globally reaching"
        title="We Edit Trips The Way You'd Plan Your Own"
        desc="Trip Edit is a travel management company based in Jaipur, Rajasthan — built around one idea: a good trip is the product of good editing, not more options."
        image="https://picsum.photos/seed/about-hero/1800/900"
      />

      <section className="py-14 lg:py-20">
        <div className="container-content">
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
            <Reveal>
              <img
                src="https://picsum.photos/seed/about-office/900/700"
                alt="Trip Edit office team"
                className="rounded-3xl w-full h-[420px] object-cover"
              />
            </Reveal>
            <div>
              <SectionHeading eyebrow="Our story" title="From One Desk In Gopal Bari, To Trips Worldwide" />
              <p className="text-navy-700/85 leading-relaxed mb-4">
                Trip Edit started as a single desk on Ajmer Road, booking domestic holidays for
                Jaipur families. What travellers kept asking for was simple: fewer options,
                better-edited ones. That's still the whole model — one coordinator per trip,
                options narrowed to what actually fits your dates, budget and group.
              </p>
              <p className="text-navy-700/85 leading-relaxed">
                Today that same desk files visas for 60+ countries, runs group and MICE travel for
                companies across Rajasthan, and still answers the phone at {company.landline}.
              </p>
            </div>
          </div>

          <SectionHeading eyebrow="Milestones" title="How We Got Here" align="center" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <div className="pass p-6 h-full shadow-card" style={{ "--pass-bg": "#FBFCFE" }}>
                  <span className="font-display text-2xl font-semibold text-teal-600 block mb-2">{t.year}</span>
                  <p className="text-sm text-navy-700/80 leading-relaxed">{t.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <SectionHeading eyebrow="What we stand on" title="Why Travellers Stay With Trip Edit" align="center" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {whyUs.map((w, i) => {
              const Icon = Icons[w.icon] || Sparkles;
              return (
                <Reveal key={w.title} delay={i * 0.05}>
                  <div className="text-center flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-teal-600" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-semibold text-navy-800 mb-1.5">{w.title}</h3>
                    <p className="text-sm text-navy-600/75 leading-relaxed">{w.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="bg-teal-700 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-lg text-center lg:text-left">
              <h3 className="font-display text-2xl font-semibold text-white mb-2">Want to talk to the desk directly?</h3>
              <p className="text-teal-50/90 text-sm">
                Call, WhatsApp, or drop by our Ajmer Road office — no call centre in between.
              </p>
            </div>
            <Link to="/contact" className="btn btn-primary shrink-0">
              Get In Touch <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
