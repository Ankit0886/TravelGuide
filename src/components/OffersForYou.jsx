import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Copy } from "lucide-react";
import { offersForYou } from "../data/site";

const TABS = [
  { key: "holidays", label: "Holidays" },
  { key: "forex", label: "Forex" },
  { key: "flights", label: "Flights" },
];

const offerHref = (o) =>
  o.slug === "flights" || o.slug === "visa-services" ? `/${o.slug}` : `/destinations/${o.slug}`;

export default function OffersForYou() {
  const [tab, setTab] = useState("holidays");
  const trackRef = useRef(null);
  const list = offersForYou[tab] || [];

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-offer-card]");
    const step = card ? card.offsetWidth + 20 : 320;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container-content">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <h2 className="font-display font-semibold text-[32px] sm:text-[40px] leading-[1.12] text-navy-800">
            Offers For You
          </h2>

          <div className="inline-flex items-center bg-navy-50 rounded-full p-1 self-start sm:self-auto">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  tab === t.key
                    ? "bg-navy-800 text-white"
                    : "text-navy-600/70 hover:text-navy-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByCard(-1)}
            className="hidden sm:flex absolute left-0 top-[110px] -translate-x-4 z-10 w-11 h-11 rounded-full bg-white shadow-card items-center justify-center text-navy-800 hover:bg-navy-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto pb-2 -mx-1 px-1 snap-x scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {list.map((o) => (
              <Link
                key={o.destination + o.code}
                to={offerHref(o)}
                data-offer-card
                className="snap-start shrink-0 w-[280px] sm:w-[320px] rounded-2xl overflow-hidden bg-white border border-navy-50 shadow-card card-lift group"
              >
                <div className="relative h-[170px] sm:h-[190px] overflow-hidden">
                  <img
                    src={o.image}
                    alt={o.destination}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  {o.ribbon && (
                    <span className="absolute top-3 left-3 bg-sun text-navy-900 text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-md shadow-card">
                      {o.ribbon}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white/95 text-navy-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-card stub-code">
                    <Copy size={11} />
                    {o.code}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold text-teal-600">{o.destination}</span>
                    <span className="text-[11px] text-navy-500/70 text-right leading-tight">
                      Validity: {o.validity}
                      <br className="hidden sm:block" /> T&amp;C's Apply*
                    </span>
                  </div>
                  <p className="font-display text-[15px] font-semibold text-navy-800 leading-snug">
                    {o.headline}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByCard(1)}
            className="hidden sm:flex absolute right-0 top-[110px] translate-x-4 z-10 w-11 h-11 rounded-full bg-navy-800 shadow-card items-center justify-center text-white hover:bg-navy-700 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
