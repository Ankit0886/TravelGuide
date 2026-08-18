import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import * as Icons from "lucide-react";
import SearchBar from "../components/SearchBar";
import SectionHeading from "../components/SectionHeading";
import TrendingDestinations from "../components/TrendingDestinations";
import TripEditSpecials from "../components/TripEditSpecials";
import PopularTourPackages from "../components/PopularTourPackages";
import OffersForYou from "../components/OffersForYou";
import PackageCard from "../components/PackageCard";
import CategoryCard from "../components/CategoryCard";
import ServiceCard from "../components/ServiceCard";
import Testimonials from "../components/Testimonials";
import FAQAccordion from "../components/FAQAccordion";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import {
  packages,
  categories,
  services,
  whyUs,
  faqs,
  blog,
} from "../data/site";

const stats = [
  { value: "18+", label: "Years planning trips" },
  { value: "12,000+", label: "Travellers edited an itinerary for" },
  { value: "60+", label: "Countries on visa file" },
  { value: "4.8/5", label: "Average trip rating" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy-900 pt-[150px] pb-24 lg:pt-[190px] lg:pb-32 overflow-hidden">
        <img
          src="https://picsum.photos/seed/tripedit-hero-mountain/1800/1100"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-navy-900/60" />
        <svg className="absolute right-[-60px] top-24 hidden lg:block opacity-40" width="420" height="200" viewBox="0 0 420 200">
          <path d="M10 150 C 120 20, 300 20, 410 60" className="flight-path" stroke="white" />
          <circle cx="410" cy="60" r="4" fill="#F2883C" />
        </svg>

        <div className="container-content relative">
          <Reveal>
            <span className="eyebrow text-gold-light block mb-5">Jaipur → Everywhere</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-display font-semibold text-[40px] sm:text-[58px] lg:text-[66px] leading-[1.06] text-white max-w-3xl">
              Every trip, thoughtfully <span className="italic text-gold-light">edited.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-navy-100/85 text-base sm:text-lg max-w-xl leading-relaxed">
              Family holidays, group tours, honeymoons and offsites — planned end to end by
              Trip Edit, Jaipur's travel management company.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-9">
            <SearchBar />
          </Reveal>

          <Reveal delay={0.28} className="mt-8 flex flex-wrap gap-3">
            <a href="#packages" className="btn btn-primary">
              Explore Packages <ArrowUpRight size={16} />
            </a>
            <Link to="/plan-your-trip" className="btn btn-outline">
              Plan My Trip
            </Link>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.3 + i * 0.05}>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-semibold text-white">{s.value}</div>
                  <div className="text-xs text-navy-100/70 mt-1">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRIP EDIT SPECIALS (bento grid) */}
      <TripEditSpecials />

      {/* TRENDING DESTINATIONS (pill carousel) */}
      <TrendingDestinations />

      

      {/* HOLIDAY PACKAGES */}
      <PackagesSection />

      {/* CATEGORIES */}
      <section className="py-16 lg:py-24">
        <div className="container-content">
          <SectionHeading
            eyebrow="Travel your way"
            title="A Category For Every Kind Of Trip"
            desc="Same trip editor, different itinerary shape — pick the one that matches how you actually travel."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.04}>
                <CategoryCard c={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 lg:py-24 bg-navy-900">
        <div className="container-content">
          <SectionHeading
            eyebrow="Beyond the itinerary"
            title="Everything A Trip Needs, One Desk"
            desc="Visas, tickets, transport and insurance — handled by the same team that built your itinerary."
            light
            action={
              <Link to="/services" className="btn btn-outline text-sm">
                All Services <ArrowUpRight size={15} />
              </Link>
            }
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.slice(0, 4).map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <ServiceCard s={s} dark />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS FOR YOU */}
      <OffersForYou />

      {/* WHY TRIP EDIT */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container-content grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative">
              <img
                src="https://picsum.photos/seed/tripedit-whyus/900/700"
                alt="Trip Edit coordinator planning an itinerary"
                className="rounded-3xl w-full h-[420px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-pop p-5 flex items-center gap-3 pass" style={{"--pass-bg":"#F1F5FA"}}>
                <div className="h-11 w-11 rounded-full bg-teal-600 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-display font-semibold text-navy-800 text-sm">IATA-aligned</div>
                  <div className="text-xs text-navy-500">booking standards</div>
                </div>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Why Trip Edit" title="Planning Handled Like It's Our Own Trip" />
            <div className="grid sm:grid-cols-2 gap-6">
              {whyUs.map((w, i) => {
                const Icon = Icons[w.icon] || Icons.Sparkles;
                return (
                  <Reveal key={w.title} delay={i * 0.05}>
                    <div>
                      <Icon size={22} className="text-teal-600 mb-3" strokeWidth={1.8} />
                      <h3 className="font-display font-semibold text-navy-800 mb-1.5">{w.title}</h3>
                      <p className="text-sm text-navy-600/75 leading-relaxed">{w.detail}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TRIP PLANNER teaser */}
      <section className="py-16 lg:py-24">
        <div className="container-content grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Built around you"
              title="Skip The Fixed Itinerary — Build Your Own"
              desc="Tell us your dates, headcount and the kind of trip you want. A trip editor turns it into a real, bookable itinerary within a day."
            />
            <ul className="space-y-3">
              {["Private or group, your call", "Every hotel and city swappable", "One quote, no hidden lines"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-navy-700">
                  <span className="h-6 w-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div id="plan" className="pt-1">
            <PlannerTeaser />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container-content">
          <SectionHeading eyebrow="Traveller notes" title="What Trip Edit Travellers Say" align="center" />
          <Testimonials />
        </div>
      </section>

      {/* TRAVEL GUIDE */}
      <TravelGuideSection />

      {/* VISA CTA BANNER */}
      <section className="py-16 lg:py-24">
        <div className="container-content">
          <div className="bg-teal-700 rounded-3xl p-8 lg:p-14 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center overflow-hidden relative">
            <div className="relative z-10">
              <span className="eyebrow text-teal-50/80 block mb-3">Visa Services</span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-3 max-w-md">
                Travelling Abroad? Get Your Visa Filed Without The Guesswork
              </h3>
              <p className="text-teal-50/90 text-sm max-w-md leading-relaxed">
                60+ countries on file, checklists matched to embassy rules, and one desk tracking
                your application until your passport is back in hand.
              </p>
            </div>
            <div className="relative z-10 flex lg:justify-end">
              <Link to="/visa-services" className="btn btn-primary shrink-0">
                Check My Visa Requirement <ArrowUpRight size={16} />
              </Link>
            </div>
            <svg className="absolute -right-10 -bottom-10 opacity-10 hidden lg:block" width="280" height="280" viewBox="0 0 280 280" fill="none">
              <circle cx="140" cy="140" r="140" fill="white" />
            </svg>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container-content grid lg:grid-cols-[0.8fr_1.2fr] gap-14">
          <div>
            <SectionHeading eyebrow="Questions, answered" title="Frequently Asked" />
            <Link to="/contact" className="btn btn-navy text-sm">
              Still have questions? <ArrowUpRight size={15} />
            </Link>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* POPULAR TOUR PACKAGES DIRECTORY */}
      <PopularTourPackages />

      <CTASection />
    </>
  );
}

function PlannerTeaser() {
  return (
    <div className="bg-white rounded-2xl border border-navy-50 shadow-pop p-6 sm:p-8">
      <span className="eyebrow text-sun-600">Custom Trip Planner</span>
      <h3 className="font-display text-2xl font-semibold text-navy-800 mt-2 mb-5">
        Start with three details
      </h3>
      <div className="grid gap-4 mb-6">
        <div className="field flex items-center text-navy-400">Destination or region</div>
        <div className="field flex items-center text-navy-400">Approx. travel month</div>
        <div className="field flex items-center text-navy-400">Number of travellers</div>
      </div>
      <Link to="/plan-your-trip" className="btn btn-primary w-full justify-center">
        Continue to Full Planner <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}

function PackagesSection() {
  const [params] = useSearchParams();
  const preset = categories.find((c) => c.slug === params.get("category"))?.name;
  const [cat, setCat] = useState(preset || "All");

  const filters = ["All", ...categories.map((c) => c.name)];
  const list = useMemo(
    () => (cat === "All" ? packages : packages.filter((p) => p.category === cat)),
    [cat]
  );

  return (
    <section id="packages" className="py-16 lg:py-24 bg-mist scroll-mt-24">
      <div className="container-content">
        <SectionHeading
          eyebrow="Ready-made itineraries"
          title="Holiday Packages, Ready To Book"
          desc="Fixed price, fixed inclusions, zero guesswork — or hand us a package and we'll edit it around you."
        />

        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setCat(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                cat === f
                  ? "bg-navy-800 text-white border-navy-800"
                  : "bg-white text-navy-700 border-navy-100 hover:border-navy-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="text-navy-600/70 text-sm">No packages under this category yet — ask us to build one.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 0.05}>
                <PackageCard p={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function TravelGuideSection() {
  return (
    <section id="travel-guide" className="py-16 lg:py-24 scroll-mt-24">
      <div className="container-content">
        <SectionHeading
          eyebrow="Travel inspiration"
          title="From The Trip Edit Journal"
          desc="Guides, checklists and comparisons written by the same desk that books your trip."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blog.map((b, i) => (
            <Reveal key={b.slug} delay={(i % 3) * 0.06}>
              <Link to={`/travel-guide/${b.slug}`} className="group block h-full">
                <div className="rounded-2xl overflow-hidden h-[210px] mb-4">
                  <img src={b.image} alt={b.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <span className="stub-label">{b.tag} · {b.date} · {b.read}</span>
                <h3 className="font-display text-lg font-semibold text-navy-800 mt-1.5 mb-2 leading-snug group-hover:text-teal-600 transition-colors">
                  {b.title}
                </h3>
                <p className="text-sm text-navy-600/75 leading-relaxed">{b.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
