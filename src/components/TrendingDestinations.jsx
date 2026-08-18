import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { destinations } from "../data/site";

const TABS = [
  { key: "international", label: "International" },
  { key: "domestic", label: "India & Around" },
];

export default function TrendingDestinations() {
  const [tab, setTab] = useState("international");
  const trackRef = useRef(null);

  const list = (destinations[tab] || []).slice(0, 8);

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]");
    const step = card ? card.offsetWidth + 20 : 260;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container-content">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <h2 className="font-display font-semibold text-[32px] sm:text-[40px] leading-[1.12] text-navy-800">
            Trending Holiday Destinations
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
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-11 h-11 rounded-full bg-white shadow-card items-center justify-center text-navy-800 hover:bg-navy-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto pb-2 -mx-1 px-1 snap-x scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {list.map((d, i) => (
              <Link
                key={d.slug}
                to={`/destinations/${d.slug}`}
                data-card
                className={`snap-start shrink-0 relative w-[230px] sm:w-[260px] h-[380px] sm:h-[420px] overflow-hidden shadow-card card-lift group ${
                  i % 2 === 0
                    ? "rounded-[999px]"
                    : "rounded-t-[130px] sm:rounded-t-[150px] rounded-b-2xl"
                }`}
              >
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />

                <span className="absolute top-8 inset-x-0 text-center font-display text-2xl font-semibold text-white px-4">
                  {d.name}
                </span>

                <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center text-white">
                  <p className="text-[11px] uppercase tracking-wider opacity-85">Starting at</p>
                  <p className="text-lg font-bold mb-3">{d.from}</p>
                  <span className="w-9 h-9 rounded-full bg-sun flex items-center justify-center text-navy-900 transition-transform duration-300 group-hover:scale-110">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByCard(1)}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-11 h-11 rounded-full bg-navy-800 shadow-card items-center justify-center text-white hover:bg-navy-700 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/destinations" className="btn btn-primary">
            Explore Now <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
