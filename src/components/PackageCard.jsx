import { Link } from "react-router-dom";
import { Clock3, ArrowUpRight, Check } from "lucide-react";

export default function PackageCard({ p }) {
  return (
    <div className="pass shadow-card card-lift overflow-hidden flex flex-col sm:flex-row h-full">
      <div className="relative sm:w-[42%] h-[210px] sm:h-auto shrink-0 overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
        <span className="absolute top-3 left-3 bg-navy-800 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
          {p.category}
        </span>
      </div>

      <div className="flex-1 flex flex-col p-5 sm:p-6 relative">
        <div className="hidden sm:block absolute left-0 top-0 bottom-0 pass-divider" />
        <div className="flex items-center justify-between mb-2">
          <span className="stub-code text-teal-600 text-xs">{p.code}</span>
          <span className="flex items-center gap-1 stub-label"><Clock3 size={12} /> {p.days}</span>
        </div>
        <h3 className="font-display text-xl font-semibold text-navy-800 mb-2 leading-snug">
          {p.name}
        </h3>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4">
          {p.highlights.slice(0, 4).map((h) => (
            <li key={h} className="flex items-center gap-1.5 text-[13px] text-navy-600/80">
              <Check size={13} className="text-teal-500 shrink-0" />
              <span className="truncate">{h}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between pt-3 pass-divider-h">
          <div>
            <span className="stub-label block">Starting from</span>
            <span className="font-display text-2xl font-semibold text-navy-800">{p.price}</span>
            <span className="text-xs text-navy-500"> /person</span>
          </div>
          <Link to={`/packages/${p.slug}`} className="btn btn-navy text-sm px-4 py-2.5">
            View Package <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
