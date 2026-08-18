import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { company } from "../data/site";

const socials = [
  {
    label: "Facebook",
    path: "M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46H16.5V4.35C16.24 4.32 15.36 4.24 14.34 4.24c-2.13 0-3.59 1.3-3.59 3.68v2.05H8.25v3h2.5V21h2.75z",
  },
  {
    label: "Instagram",
    path: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm5.4-1.9a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3zM12 4.5c-2.06 0-2.32.01-3.13.05-.8.04-1.35.16-1.83.35-.5.2-.92.46-1.34.88-.42.42-.68.85-.88 1.34-.19.48-.31 1.03-.35 1.83-.04.81-.05 1.07-.05 3.13s.01 2.32.05 3.13c.04.8.16 1.35.35 1.83.2.5.46.92.88 1.34.42.42.85.68 1.34.88.48.19 1.03.31 1.83.35.81.04 1.07.05 3.13.05s2.32-.01 3.13-.05c.8-.04 1.35-.16 1.83-.35.5-.2.92-.46 1.34-.88.42-.42.68-.85.88-1.34.19-.48.31-1.03.35-1.83.04-.81.05-1.07.05-3.13s-.01-2.32-.05-3.13c-.04-.8-.16-1.35-.35-1.83a3.6 3.6 0 0 0-.88-1.34 3.6 3.6 0 0 0-1.34-.88c-.48-.19-1.03-.31-1.83-.35-.81-.04-1.07-.05-3.13-.05z",
  },
  {
    label: "YouTube",
    path: "M21.8 8.2s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C16 5 12 5 12 5h0s-4 0-6.9.3c-.4 0-1.3.1-2.1.9-.6.6-.8 2-.8 2S2 9.8 2 11.4v1.2C2 14.2 2.2 15.8 2.2 15.8s.2 1.4.8 2c.8.8 1.8.8 2.3.9C7 19 12 19 12 19s4 0 6.9-.3c.4 0 1.3-.1 2.1-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.2c0-1.6-.2-3.2-.2-3.2zM9.9 14.6V9.4l5.3 2.6-5.3 2.6z",
  },
  {
    label: "LinkedIn",
    path: "M6.94 8.5H4.06V20h2.88V8.5zM5.5 4a1.68 1.68 0 1 0 0 3.36 1.68 1.68 0 0 0 0-3.36zM20 20v-6.4c0-3.1-1.66-4.54-3.87-4.54-1.79 0-2.59.98-3.03 1.67V8.5H10.2c.04.86 0 11.5 0 11.5h2.9v-6.42c0-.34.02-.68.13-.93.27-.68.9-1.38 1.94-1.38 1.37 0 1.92 1.04 1.92 2.57V20H20z",
  },
];

const columns = [
  {
    heading: "Explore",
    links: [
      { label: "Destinations", to: "/destinations" },
      { label: "Holiday Packages", to: "/#packages" },
      { label: "Travel Guide", to: "/#travel-guide" },
      { label: "Plan Your Trip", to: "/plan-your-trip" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Visa Services", to: "/visa-services" },
      { label: "Flights", to: "/flights" },
      { label: "Hotels", to: "/hotels" },
      { label: "Travel Insurance", to: "/travel-insurance" },
      { label: "MICE & Events", to: "/mice-events" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact Us", to: "/contact" },
      { label: "All Services", to: "/services" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-content pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 lg:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Trip Edit" className="h-11 w-11 object-contain" />
              <span className="font-display text-lg font-semibold">Trip Edit</span>
            </div>
            <p className="text-navy-100/80 text-sm leading-relaxed max-w-xs mb-5">
              {company.legalLine}. Family holidays, group tours, MICE, FIT, visas, flights,
              transport and forex — planned by one editor, start to finish.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-sun hover:border-sun transition-colors group"
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" className="fill-white group-hover:fill-navy-900">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="eyebrow text-gold-light mb-4">{col.heading}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-navy-100/85 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="eyebrow text-gold-light mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-navy-100/85">
              <li className="flex gap-2.5">
                <MapPin size={17} className="shrink-0 mt-0.5 text-teal-300" />
                <span>{company.address}</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone size={16} className="shrink-0 text-teal-300" />
                <span>{company.phones.join(" · ")}</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail size={16} className="shrink-0 text-teal-300" />
                <span>{company.email}</span>
              </li>
            </ul>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex items-center bg-white/10 rounded-full p-1 pl-4 border border-white/15"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="bg-transparent text-sm placeholder:text-navy-200 flex-1 outline-none py-2 min-w-0"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="h-9 w-9 rounded-full bg-sun text-navy-900 flex items-center justify-center shrink-0"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>

        <div className="pass-divider-h mt-12 pt-6 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs text-navy-200/70">
          <p>© {new Date().getFullYear()} Trip Edit. All rights reserved.</p>
          <div className="flex gap-5">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
