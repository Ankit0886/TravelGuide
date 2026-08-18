import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center pt-[100px] pb-20">
      <div className="text-center max-w-md px-6">
        <span className="stub-code text-teal-600 text-lg">JAI → 404</span>
        <h1 className="font-display text-3xl font-semibold text-navy-800 mt-4 mb-3">
          This page took a different route
        </h1>
        <p className="text-navy-600/80 mb-8">
          The page you're looking for doesn't exist, or its itinerary changed.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
