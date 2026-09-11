import type { Metadata } from "next";
import { getSettings } from "@/lib/services/settings.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot, faClock } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";

export const metadata: Metadata = {
  title: "Contact Us — Musa Kicks",
  description: "Get in touch with Musa Kicks for inquiries, sizing advice, and orders.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const whatsappNumber = settings.whatsappNumber ?? "+92300000000";
  const storeAddress = settings.brandAddress ?? "Islamabad, Pakistan";

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="badge badge-accent uppercase tracking-widest text-xs mb-3">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
          We're Here to Help
        </h1>
        <p className="text-text-muted mt-4 text-base sm:text-lg">
          Have a question about sizes, tracking an order, or need a recommendation? Connect with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="card p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-xl shrink-0">
              <FontAwesomeIcon icon={faWhatsapp} />
            </div>
            <div>
              <h3 className="font-bold text-base">WhatsApp Concierge</h3>
              <p className="text-text-muted text-sm mt-1">Instant support and direct ordering</p>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-semibold text-sm hover:underline mt-2 inline-block"
              >
                Chat on WhatsApp →
              </a>
            </div>
          </div>

          <div className="card p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-surface-2 text-text-primary flex items-center justify-center text-xl shrink-0">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div>
              <h3 className="font-bold text-base">Email Support</h3>
              <p className="text-text-muted text-sm mt-1">For general inquiries and press</p>
              <a
                href="mailto:support@musakicks.com"
                className="text-accent font-semibold text-sm hover:underline mt-2 inline-block"
              >
                support@musakicks.com
              </a>
            </div>
          </div>

          <div className="card p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-surface-2 text-text-primary flex items-center justify-center text-xl shrink-0">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <div>
              <h3 className="font-bold text-base">Store Location</h3>
              <p className="text-text-muted text-sm mt-1">{storeAddress}</p>
            </div>
          </div>

          <div className="card p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-surface-2 text-text-primary flex items-center justify-center text-xl shrink-0">
              <FontAwesomeIcon icon={faClock} />
            </div>
            <div>
              <h3 className="font-bold text-base">Working Hours</h3>
              <p className="text-text-muted text-sm mt-1">
                Mon – Sat: 10:00 AM – 9:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Bilal Khan"
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="bilal@example.com"
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="Inquiry regarding Air Max Pulse"
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Write your message here..."
                className="input w-full py-2.5 resize-none"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full py-3">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
