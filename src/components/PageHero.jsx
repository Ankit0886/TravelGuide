import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function PageHero({ eyebrow, title, desc, crumb, image }) {
  return (
    <section className="relative bg-navy-900 pt-[150px] pb-16 lg:pt-[170px] lg:pb-20 overflow-hidden">
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
      )}
      <div className="absolute inset-0 bg-navy-900/55" />
      <div className="container-content relative">
        <div className="flex items-center gap-1.5 text-xs text-navy-100/70 mb-5">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight size={13} />
          <span className="text-gold-light">{crumb}</span>
        </div>
        {eyebrow && <span className="eyebrow text-gold-light block mb-3">{eyebrow}</span>}
        <h1 className="font-display font-semibold text-[36px] sm:text-[48px] leading-[1.1] text-white max-w-2xl">
          {title}
        </h1>
        {desc && <p className="mt-4 text-navy-100/85 max-w-xl leading-relaxed">{desc}</p>}
      </div>
    </section>
  );
}
