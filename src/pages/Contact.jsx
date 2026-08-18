import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { company } from "../data/site";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        crumb="Contact Us"
        eyebrow="Talk to a trip editor"
        title="We're Easiest To Reach Directly"
        desc="Call, WhatsApp, or send a message — a real coordinator replies, not a chatbot queue."
        image="https://picsum.photos/seed/contact-hero/1800/900"
      />

      <section className="py-14 lg:py-20">
        <div className="container-content grid lg:grid-cols-[0.9fr_1.1fr] gap-14">
          <div>
            <SectionHeading eyebrow="Reach us" title="Contact Details" />
            <ul className="space-y-5 mb-10">
              <li className="flex gap-3">
                <MapPin size={19} className="text-teal-600 shrink-0 mt-0.5" />
                <span className="text-sm text-navy-700/85 leading-relaxed">{company.address}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-teal-600 shrink-0" />
                <span className="text-sm text-navy-700/85">
                  {company.phones.join(" · ")} (mobile) · {company.landline} (landline)
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-teal-600 shrink-0" />
                <span className="text-sm text-navy-700/85">{company.email}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Clock size={18} className="text-teal-600 shrink-0" />
                <span className="text-sm text-navy-700/85">{company.hours}</span>
              </li>
            </ul>
            <div className="rounded-2xl overflow-hidden h-[280px] border border-navy-50">
              <iframe
                title="Trip Edit office location"
                src="https://maps.google.com/maps?q=Ajmer%20Road%2C%20Gopal%20Bari%2C%20Jaipur&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-navy-50 shadow-card p-6 sm:p-8">
            {sent ? (
              <div className="text-center py-10 flex flex-col items-center">
                <CheckCircle2 size={40} className="text-teal-600 mb-3" />
                <h3 className="font-display text-xl font-semibold text-navy-800 mb-1.5">Message sent</h3>
                <p className="text-sm text-navy-600/80">We'll get back to you within a few hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <SectionHeading eyebrow="Send a message" title="Get In Touch" />
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-navy-700">Full name</span>
                    <input required className="field" placeholder="Your name" />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-navy-700">Phone number</span>
                    <input required type="tel" className="field" placeholder="+91 00000 00000" />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5 mb-5">
                  <span className="text-xs font-semibold text-navy-700">Email</span>
                  <input type="email" className="field" placeholder="you@example.com" />
                </label>
                <label className="flex flex-col gap-1.5 mb-6">
                  <span className="text-xs font-semibold text-navy-700">Message</span>
                  <textarea required rows={4} className="field resize-none" placeholder="Tell us what you're planning..." />
                </label>
                <button type="submit" className="btn btn-primary w-full sm:w-auto justify-center">
                  Send Message <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
