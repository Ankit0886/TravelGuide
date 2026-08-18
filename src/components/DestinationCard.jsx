import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function DestinationCard({ d, originCode = "JAI" }) {
  return (
    <Link
      to={`/destinations/${d.slug}`}
      className="pass card-lift shadow-card flex flex-col overflow-hidden shrink-0 w-[280px] sm:w-[300px] group"
      style={{ "--pass-bg": "#FBFCFE" }}
    >
      <div className="relative h-[190px] overflow-hidden">
        <img
          src={d.image}
          alt={d.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        <span className="absolute top-3 left-3 bg-white/95 text-navy-800 text-xs font-semibold px-3 py-1 rounded-full">
          {d.days}
        </span>

        <div className="absolute bottom-4 left-5 text-white">
          <p className="text-[10px] font-medium uppercase tracking-wider opacity-85">Starting at</p>
          <p className="text-xl font-bold leading-tight">{d.from}</p>
        </div>

        {/* half-circle CTA — clipped by the image wrapper's overflow-hidden so only the top half shows, like a boarding-pass punch */}
        <div className="absolute -bottom-6 right-5 w-12 h-12 rounded-full bg-sun flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
          <ArrowUpRight size={18} className="text-navy-900" />
        </div>
      </div>

      <div className="relative flex items-center px-5 py-3">
        <div className="pass-notch left" />
        <div className="pass-notch right" />
        <div className="flex-1 pass-divider-h" style={{ borderTop: "none" }} />
      </div>
      <div className="px-5 -mt-3 mb-1">
        <div className="border-t-2 border-dashed border-navy-100" />
      </div>

      <div className="px-5 pb-5 pt-2 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <span className="stub-code text-navy-800 text-sm">{originCode} → {d.code}</span>
          <span className="stub-label">{d.region}</span>
        </div>
        <h3 className="font-display text-lg font-semibold text-navy-800 mb-1.5">{d.name}</h3>
        <p className="text-sm text-navy-600/75 leading-snug flex-1">{d.blurb}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600">
          Explore Destination <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  );
}
