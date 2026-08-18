import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { nav, company } from "../data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
  }, [location.pathname]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white shadow-card" : "bg-transparent"
      }`}
    >
      <div className="container-content flex items-center justify-between h-[76px]">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="Trip Edit" className="h-12 w-12 object-contain" />
          <span
            className={`font-display text-xl font-semibold tracking-tight ${
              solid ? "text-navy-800" : "text-white"
            }`}
          >
            Trip Edit
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setSvcOpen(true)}
                onMouseLeave={() => setSvcOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 text-[15px] font-medium link-underline ${
                    solid ? "text-navy-800" : "text-white"
                  }`}
                >
                  {item.label}
                  <ChevronDown size={15} />
                </button>
                {svcOpen && (
                  <div className="absolute top-full left-0 pt-3 w-64">
                    <div className="bg-white rounded-xl shadow-pop border border-navy-50 py-2 overflow-hidden">
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="block px-4 py-2.5 text-sm text-navy-800 hover:bg-mist hover:text-teal-600 transition-colors"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[15px] font-medium link-underline ${
                    solid ? "text-navy-800" : "text-white"
                  } ${isActive ? "opacity-100" : "opacity-90 hover:opacity-100"}`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${company.phones[0].replace(/\s/g, "")}`}
            className={`flex items-center gap-1.5 text-sm font-semibold ${
              solid ? "text-navy-700" : "text-white"
            }`}
          >
            <Phone size={16} />
            {company.phones[0]}
          </a>
          <Link to="/plan-your-trip" className="btn btn-primary text-sm">
            Plan My Trip
          </Link>
        </div>

        <button
          className={`lg:hidden p-2 ${solid ? "text-navy-800" : "text-white"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-navy-50 max-h-[calc(100vh-76px)] overflow-y-auto">
          <div className="container-content py-4 flex flex-col gap-1">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label} className="py-1">
                  <button
                    className="w-full flex items-center justify-between py-2.5 text-navy-800 font-medium"
                    onClick={() => setSvcOpen((v) => !v)}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${svcOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {svcOpen && (
                    <div className="pl-4 flex flex-col gap-1 pb-1">
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="py-2 text-sm text-navy-600"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="py-2.5 text-navy-800 font-medium border-b border-navy-50/70 last:border-0"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link to="/plan-your-trip" className="btn btn-primary justify-center mt-3">
              Plan My Trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
