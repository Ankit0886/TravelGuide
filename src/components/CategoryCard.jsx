import * as Icons from "lucide-react";
import { Link } from "react-router-dom";

export default function CategoryCard({ c }) {
  const Icon = Icons[c.icon] || Icons.Compass;
  return (
    <Link
      to="/destinations"
      className="card-lift group bg-white rounded-2xl border border-navy-50 shadow-card p-6 flex flex-col h-full"
    >
      <div className="h-12 w-12 rounded-xl bg-navy-700 flex items-center justify-center mb-5 group-hover:bg-sun transition-colors">
        <Icon size={22} className="text-white group-hover:text-navy-900" strokeWidth={1.8} />
      </div>
      <h3 className="font-display text-lg font-semibold text-navy-800 mb-1.5">{c.name}</h3>
      <p className="text-sm text-navy-600/75 leading-relaxed">{c.blurb}</p>
    </Link>
  );
}
