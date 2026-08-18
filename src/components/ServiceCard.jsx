import * as Icons from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const dedicatedPages = ["visa-services", "flights", "hotels", "travel-insurance"];

export default function ServiceCard({ s, dark = false }) {
  const Icon = Icons[s.icon] || Icons.Compass;
  const to = dedicatedPages.includes(s.slug) ? `/${s.slug}` : `/services#${s.slug}`;
  return (
    <div
      className={`card-lift rounded-2xl p-6 flex flex-col h-full border ${
        dark
          ? "bg-navy-800 border-navy-700"
          : "bg-white border-navy-50 shadow-card"
      }`}
    >
      <div
        className={`h-11 w-11 rounded-full flex items-center justify-center mb-5 ${
          dark ? "bg-teal-600" : "bg-teal-50"
        }`}
      >
        <Icon size={20} className={dark ? "text-white" : "text-teal-600"} strokeWidth={1.8} />
      </div>
      <h3 className={`font-display text-lg font-semibold mb-1.5 ${dark ? "text-white" : "text-navy-800"}`}>
        {s.name}
      </h3>
      <p className={`text-sm leading-relaxed flex-1 ${dark ? "text-navy-100/75" : "text-navy-600/75"}`}>
        {s.blurb}
      </p>
      <Link
        to={to}
        className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${
          dark ? "text-gold-light" : "text-teal-600"
        }`}
      >
        Learn more <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}
