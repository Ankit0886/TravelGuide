import { useState } from "react";
import { Plus } from "lucide-react";

export default function FAQAccordion({ items }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((f, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={f.q}
            className={`rounded-2xl border transition-colors ${
              isOpen ? "border-teal-200 bg-teal-50/40" : "border-navy-50 bg-white"
            }`}
          >
            <button
              onClick={() => setOpenIdx(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-navy-800 text-[15px] sm:text-base">{f.q}</span>
              <span
                className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                  isOpen ? "bg-teal-600 rotate-45" : "bg-navy-50"
                }`}
              >
                <Plus size={16} className={isOpen ? "text-white" : "text-navy-700"} />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 sm:px-6 pb-5 text-sm text-navy-600/85 leading-relaxed">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
