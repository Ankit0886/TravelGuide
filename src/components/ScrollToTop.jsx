import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Give the target page a tick to render before we try to scroll to the anchor.
      const id = window.setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "instant" in window ? "instant" : "auto" });
          return;
        }
        window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
      }, 0);
      return () => window.clearTimeout(id);
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname, hash]);

  return null;
}
