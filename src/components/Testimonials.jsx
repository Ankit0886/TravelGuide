import { Quote, Star } from "lucide-react";
import { testimonials } from "../data/site";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {testimonials.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.06}>
          <div className="bg-white rounded-2xl border border-navy-50 shadow-card p-6 h-full flex flex-col">
            <Quote size={28} className="text-teal-200 mb-3" />
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={14} className="text-sun fill-sun" />
              ))}
            </div>
            <p className="text-[15px] text-navy-700/90 leading-relaxed flex-1">"{t.quote}"</p>
            <div className="mt-5 pt-4 pass-divider-h flex items-center justify-between">
              <span className="font-semibold text-navy-800 text-sm">{t.name}</span>
              <span className="stub-label">{t.trip}</span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
