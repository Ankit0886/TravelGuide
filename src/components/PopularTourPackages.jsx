import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { destinations, packages } from "../data/site";

function buildGroups() {
  const byCategory = (cat) =>
    packages
      .filter((p) => p.category === cat)
      .map((p) => ({ name: `${p.destination} Tour Packages`, to: `/packages/${p.slug}` }));

  return [
    {
      key: "international",
      label: "Trending International Tour Packages",
      items: destinations.international.map((d) => ({
        name: `${d.name} Tour Packages`,
        to: `/destinations/${d.slug}`,
      })),
    },
    {
      key: "india",
      label: "Trending India Tour Packages",
      items: destinations.domestic.map((d) => ({
        name: `${d.name} Tour Packages`,
        to: `/destinations/${d.slug}`,
      })),
    },
    { key: "family", label: "Family Holiday Packages", items: byCategory("Family") },
    { key: "group", label: "Group Tour Packages", items: byCategory("Group") },
    { key: "honeymoon", label: "Honeymoon Tour Packages", items: byCategory("Honeymoon") },
    { key: "luxury", label: "Luxury Tour Packages", items: byCategory("Luxury") },
    { key: "fit", label: "Independent Travel Packages", items: byCategory("FIT") },
  ].filter((g) => g.items.length > 0);
}

export default function PopularTourPackages() {
  const groups = useMemo(buildGroups, []);
  const [active, setActive] = useState(groups[0]?.key);
  const activeGroup = groups.find((g) => g.key === active) || groups[0];

  if (!activeGroup) return null;

  return (
    <section className="py-16 lg:py-24">
      <div className="container-content">
        <div className="max-w-2xl mb-10">
          <span className="eyebrow text-sun-600 block mb-3">Popular searches</span>
          <h2 className="font-display font-semibold text-[32px] sm:text-[40px] leading-[1.12] text-navy-800">
            Tour Packages, Browsed By Destination
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-navy-600/80">
            Jump straight to a destination or trip style — every link opens the itinerary our
            desk currently has on file.
          </p>
        </div>

        {/* mobile tab strip */}
        <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {groups.map((g) => (
            <button
              key={g.key}
              onClick={() => setActive(g.key)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                active === g.key
                  ? "bg-navy-800 text-white border-navy-800"
                  : "bg-white text-navy-700 border-navy-100"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-10">
          {/* sidebar */}
          <div className="hidden lg:block border-l border-navy-100">
            {groups.map((g) => (
              <button
                key={g.key}
                onClick={() => setActive(g.key)}
                className={`block w-full text-left pl-5 pr-4 py-3 -ml-px border-l-2 text-sm transition-colors ${
                  active === g.key
                    ? "border-teal-600 text-navy-800 font-semibold bg-white"
                    : "border-transparent text-navy-600/75 hover:text-navy-800"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* pill grid */}
          <div className="flex flex-wrap gap-3 content-start">
            {activeGroup.items.map((item) => (
              <Link
                key={item.to + item.name}
                to={item.to}
                className="group inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-navy-100 bg-white text-sm font-semibold text-navy-700 hover:border-teal-600 hover:text-teal-700 transition-colors"
              >
                {item.name}
                <ArrowUpRight
                  size={14}
                  className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
