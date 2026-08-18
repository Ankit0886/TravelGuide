import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { blog } from "../data/site";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blog.find((b) => b.slug === slug);
  if (!post) return <Navigate to="/#travel-guide" replace />;

  const others = blog.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero crumb={post.title} eyebrow={`${post.tag} · ${post.read}`} title={post.title} image={post.image} />

      <section className="py-14 lg:py-20">
        <div className="container-content grid lg:grid-cols-[1.3fr_0.9fr] gap-14">
          <article>
            <img src={post.image} alt={post.title} className="rounded-3xl w-full h-[360px] object-cover mb-10" />
            <p className="text-navy-700/90 leading-relaxed mb-5">{post.excerpt}</p>
            <p className="text-navy-700/85 leading-relaxed mb-5">
              Our trip editors update this guide every season based on what travellers actually
              ask on calls — visa turnaround times, the stretch of the itinerary that always runs
              long, and the one booking mistake worth avoiding. If you're planning this route
              yourself, use this as your working checklist; if you'd rather hand it off, this is
              exactly the kind of trip we plan every week.
            </p>
            <p className="text-navy-700/85 leading-relaxed mb-8">
              Have a specific date or budget in mind? Send it to us and we'll turn this general
              guide into a priced, bookable itinerary within a day.
            </p>
            <Link to="/#travel-guide" className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600">
              <ArrowLeft size={15} /> Back to the Journal
            </Link>
          </article>

          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="pass shadow-card p-6" style={{ "--pass-bg": "#FBFCFE" }}>
              <span className="eyebrow text-sun-600">Want this planned for you?</span>
              <h3 className="font-display text-xl font-semibold text-navy-800 mt-2 mb-4">
                Turn this guide into a trip
              </h3>
              <p className="text-sm text-navy-600/80 mb-5">
                Tell us your dates and headcount — we'll price this exact route for you.
              </p>
              <Link to="/plan-your-trip" className="btn btn-primary w-full justify-center">
                Plan My Trip <ArrowUpRight size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="pb-14 lg:pb-20">
        <div className="container-content">
          <SectionHeading eyebrow="Keep reading" title="More From The Journal" />
          <div className="grid sm:grid-cols-3 gap-6">
            {others.map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.06}>
                <Link to={`/travel-guide/${b.slug}`} className="group block">
                  <div className="rounded-2xl overflow-hidden h-[170px] mb-3">
                    <img src={b.image} alt={b.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h4 className="font-semibold text-navy-800 text-sm leading-snug group-hover:text-teal-600 transition-colors">
                    {b.title}
                  </h4>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
