import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, FileCheck2, Clock3, Globe2, ShieldCheck, Send, CheckCircle2 } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";

const visaTypes = [
  { name: "Tourist Visa", detail: "Leisure travel, short stays, single or multiple entry." },
  { name: "Business Visa", detail: "Conferences, client visits, factory audits." },
  { name: "Transit Visa", detail: "Layovers that require a stopover clearance." },
  { name: "Student & Work Visa Guidance", detail: "Documentation support ahead of your embassy interview." },
];

const process = [
  { step: "Document check", detail: "We review your passport, photos and supporting papers against the exact embassy checklist." },
  { step: "Application filing", detail: "Forms filled, appointment booked, fees paid — we handle the paperwork end to end." },
  { step: "Biometrics & interview", detail: "Slot booking assistance and a briefing on what to expect, where required." },
  { step: "Tracking & delivery", detail: "Status tracked until your passport is stamped and couriered back to you." },
];

const countries = ["Singapore", "Thailand", "UAE", "Vietnam", "Schengen (EU)", "USA", "UK", "Australia", "Canada", "Malaysia", "China", "New Zealand"];

export default function Visa() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        crumb="Visa Services"
        eyebrow="For the entire globe"
        title="Visa Filing, Done Without The Guesswork"
        desc="From Schengen to Southeast Asia — document checklists, appointments and tracking, handled by our visa desk."
        image="https://picsum.photos/seed/visa-hero/1800/900"
      />

      <section className="py-14 lg:py-20">
        <div className="container-content">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              { icon: Globe2, label: "60+ countries filed" },
              { icon: Clock3, label: "Processing time tracked for you" },
              { icon: FileCheck2, label: "Checklist matched to embassy rules" },
              { icon: ShieldCheck, label: "No hidden filing charges" },
            ].map((f) => (
              <div key={f.label} className="bg-white border border-navy-50 rounded-2xl p-5 flex items-center gap-3 shadow-card">
                <f.icon size={22} className="text-teal-600 shrink-0" />
                <span className="text-sm font-semibold text-navy-800">{f.label}</span>
              </div>
            ))}
          </div>

          <SectionHeading eyebrow="Choose your type" title="Visa Categories We File" />
          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {visaTypes.map((v) => (
              <div key={v.name} className="pass p-6 shadow-card" style={{ "--pass-bg": "#FBFCFE" }}>
                <h3 className="font-display font-semibold text-navy-800 mb-1.5">{v.name}</h3>
                <p className="text-sm text-navy-600/80">{v.detail}</p>
              </div>
            ))}
          </div>

          <SectionHeading eyebrow="How it works" title="Our Visa Filing Process" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06}>
                <div className="relative bg-white rounded-2xl border border-navy-50 shadow-card p-6 h-full">
                  <span className="font-display text-3xl font-semibold text-navy-100 absolute top-4 right-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-semibold text-navy-800 mb-1.5 pr-8">{p.step}</h3>
                  <p className="text-sm text-navy-600/80 leading-relaxed">{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <SectionHeading eyebrow="Frequently filed" title="Popular Visa Destinations" />
          <div className="flex flex-wrap gap-3 mb-4">
            {countries.map((c) => (
              <span key={c} className="px-4 py-2 rounded-full bg-mist text-navy-700 text-sm font-medium border border-navy-50">
                {c}
              </span>
            ))}
          </div>
          <p className="text-sm text-navy-500 mb-14">Don't see your destination — ask us, we file for the entire globe.</p>

          <div className="bg-navy-900 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 mb-16">
            <div className="max-w-lg">
              <h3 className="font-display text-2xl font-semibold text-white mb-2">Not sure which visa you need?</h3>
              <p className="text-navy-100/80 text-sm">
                Send us your destination and travel dates — we'll tell you the visa type, documents and timeline, free of charge.
              </p>
            </div>
            <a href="#visa-form" className="btn btn-primary shrink-0">
              Check My Visa Requirement <ArrowUpRight size={16} />
            </a>
          </div>

          <div id="visa-form" className="scroll-mt-28">
            <SectionHeading eyebrow="Get started" title="Start Your Visa Formalities" align="center" />
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-navy-50 shadow-card p-6 sm:p-10">
              {sent ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <CheckCircle2 size={40} className="text-teal-600 mb-3" />
                  <h3 className="font-display text-xl font-semibold text-navy-800 mb-1.5">Request received</h3>
                  <p className="text-sm text-navy-600/80">
                    Our visa desk will call you within a few hours with the exact checklist for your destination.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-navy-700">Full name</span>
                      <input required className="field" placeholder="As per passport" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-navy-700">Phone number</span>
                      <input required type="tel" className="field" placeholder="+91 00000 00000" />
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-navy-700">Email</span>
                      <input required type="email" className="field" placeholder="you@example.com" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-navy-700">Destination country</span>
                      <input required className="field" placeholder="e.g. Singapore" />
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-navy-700">Visa type</span>
                      <select required defaultValue="" className="field">
                        <option value="" disabled>Select visa type</option>
                        {visaTypes.map((v) => (
                          <option key={v.name} value={v.name}>{v.name}</option>
                        ))}
                        <option value="Not sure">Not sure — help me choose</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-navy-700">Intended travel date</span>
                      <input type="date" className="field" />
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-navy-700">Number of travellers</span>
                      <input type="number" min="1" defaultValue="1" className="field" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-navy-700">Passport number (optional)</span>
                      <input className="field" placeholder="A1234567" />
                    </label>
                  </div>

                  <label className="flex flex-col gap-1.5 mb-6">
                    <span className="text-xs font-semibold text-navy-700">Anything else we should know?</span>
                    <textarea rows={4} className="field resize-none" placeholder="Prior visa refusals, existing appointment dates, group travel, etc." />
                  </label>

                  <button type="submit" className="btn btn-primary w-full sm:w-auto justify-center">
                    Submit Visa Request <Send size={15} />
                  </button>
                  <p className="text-xs text-navy-500 mt-4">
                    No filing charges to submit a request — a trip editor confirms the exact fee before any paperwork starts.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
