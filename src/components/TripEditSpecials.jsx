import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { img } from "../data/site";

const heroSlides = [
  {
    name: "Australia",
    tagline: "Wonder Without Limits",
    from: "₹1,58,900",
    image: img("specials-australia-sydney", 1400, 900),
    to: "/destinations/australia",
  },
  {
    name: "Switzerland",
    tagline: "Alpine Escapes, Edited For You",
    from: "₹1,42,900",
    image: img("specials-switzerland-alps", 1400, 900),
    to: "/destinations/switzerland",
  },
];

const rowTwo = [
  {
    title: "Escorted Group Departures",
    tagline: "Fixed coaches, fixed dates, better per-head pricing",
    image: img("specials-group-departure", 900, 700),
    to: "/?category=group#packages",
    cta: "pill",
  },
  {
    title: "Build Your Own Itinerary!",
    tagline: "Customise flights, hotels & sightseeing in minutes",
    image: img("specials-plan-trip-couple", 900, 700),
    to: "/plan-your-trip",
    cta: "arrow",
  },
  {
    title: "Zero-Fee Forex Cards",
    tagline: "Order online, delivered home within 24 hours",
    image: img("specials-forex-card", 900, 700),
    to: "/services#forex",
    cta: "arrow",
  },
];

const rowThree = [
  {
    title: "Looking For Flights?",
    tagline: "Fly more, pay less — book your flight now ✈️",
    image: img("specials-flight-clouds", 900, 700),
    to: "/flights",
    cta: "pill",
  },
  {
    title: "Order Forex Online",
    tagline: "Delivered home with zero convenience fee",
    image: img("specials-forex-online", 900, 700),
    to: "/services#forex",
    cta: "buy",
  },
  {
    title: "Vietnam",
    tagline: "Where culture breathes into landscape",
    from: "₹35,500",
    image: img("specials-vietnam-halongbay", 900, 700),
    to: "/destinations/vietnam",
    cta: "pill",
  },
];

function TileButton({ cta = "pill", label }) {
  if (cta === "arrow" || cta === "buy-arrow") {
    return (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-navy-800 text-white group-hover:bg-teal-600 transition-colors">
        <ArrowUpRight size={16} />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-white text-navy-900 text-sm font-semibold px-4 py-2 rounded-full">
      {label || "View More"} <ArrowUpRight size={14} />
    </span>
  );
}

function GridTile({ t }) {
  return (
    <Link
      to={t.to}
      className="group relative rounded-3xl overflow-hidden shadow-card card-lift h-[260px] sm:h-[280px] block"
    >
      <img
        src={t.image}
        alt={t.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10" />
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-xl font-semibold text-white leading-snug max-w-[220px]">
            {t.title}
          </h3>
          <p className="text-sm text-white/85 mt-1.5 max-w-[220px]">{t.tagline}</p>
          {t.from && (
            <p className="text-xs text-white/70 mt-2">
              Starting at <span className="font-semibold text-white">{t.from}</span>
            </p>
          )}
        </div>
        <div>
          <TileButton cta={t.cta} label={t.cta === "buy" ? "Buy Now" : undefined} />
        </div>
      </div>
    </Link>
  );
}

function SpiritualTile() {
  return (
    <Link
      to="/packages/bali-honeymoon"
      className="group relative rounded-3xl overflow-hidden shadow-card card-lift h-[300px] lg:h-full block"
    >
      <img
        src={img("specials-chardham-himalaya", 900, 1200)}
        alt="Char Dham pilgrimage"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
      <div className="absolute inset-0 p-7 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-2xl font-semibold text-white leading-tight max-w-[240px]">
            Begin Your Himalayan Pilgrimage
          </h3>
          <p className="text-sm text-white/85 mt-2 max-w-[220px]">
            Char Dham, planned start to finish
          </p>
          <p className="text-xs text-white/70 mt-3">
            Starting at <span className="font-semibold text-white">₹31,900</span>
          </p>
        </div>
        <div>
          <TileButton cta="pill" />
        </div>
      </div>
    </Link>
  );
}

function HeroCarouselTile() {
  const [i, setI] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setI((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer.current);
  }, []);

  const slide = heroSlides[i];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-card h-[300px] lg:h-full">
      {heroSlides.map((s, idx) => (
        <Link
          to={s.to}
          key={s.name}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === i ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={s.image}
            alt={s.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/5" />
          <div className="absolute inset-0 p-7 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl font-semibold text-white">{s.name}</h3>
              <p className="text-sm text-white/85 mt-1.5">{s.tagline}</p>
              <p className="text-xs text-white/70 mt-2">
                Starting at <span className="font-semibold text-white">{s.from}</span>
              </p>
            </div>
            <div>
              <TileButton cta="pill" />
            </div>
          </div>
        </Link>
      ))}

      <div className="absolute bottom-6 right-7 z-20 flex items-center gap-1.5">
        {heroSlides.map((s, idx) => (
          <button
            key={s.name}
            type="button"
            aria-label={`Show ${s.name}`}
            onClick={(e) => {
              e.preventDefault();
              setI(idx);
            }}
            className={`h-2 rounded-full transition-all ${
              idx === i ? "w-6 bg-sun" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function TripEditSpecials() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-content">
        <div className="mb-10">
          <span className="eyebrow text-sun-600 block mb-3">Handpicked for you</span>
          <h2 className="font-display font-semibold text-[32px] sm:text-[40px] leading-[1.12] text-navy-800">
            Trip Edit Specials
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="lg:col-span-2">
              <SpiritualTile />
            </div>
            <div className="lg:col-span-3">
              <HeroCarouselTile />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {rowTwo.map((t) => (
              <GridTile key={t.title} t={t} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {rowThree.map((t) => (
              <GridTile key={t.title} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
