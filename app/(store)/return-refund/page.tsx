import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSettings } from "@/lib/services/settings.service";
import { faArrowLeft, faBoxOpen, faCircleCheck, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description: "Learn about returns, exchanges, refunds, and eligibility requirements.",
};

const POLICY_SECTIONS = [
  {
    title: "7-Day Return Window",
    icon: faRotateLeft,
    content:
      "Contact us within 7 calendar days of delivery if your order is damaged, incorrect, or you need to request an eligible return or size exchange.",
  },
  {
    title: "Item Condition",
    icon: faBoxOpen,
    content:
      "Items must be unused and returned with the original packaging, tags, and accessories. Products that show wear or damage cannot be accepted.",
  },
  {
    title: "How to Request a Return",
    icon: faCircleCheck,
    content:
      "Contact our support team through WhatsApp or email with your order number, a short description of the issue, and clear photos when reporting damage or an incorrect item.",
  },
];

export default async function ReturnRefundPage() {
  const settings = await getSettings();
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-accent transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" />
          Back to shopping
        </Link>

        <div className="text-center mt-10 mb-12">
          <span className="badge badge-accent uppercase tracking-widest text-xs mb-3">
            Customer Care
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
            Returns & Refunds
          </h1>
          <p className="text-text-muted mt-4 text-base sm:text-lg leading-relaxed">
            We want you to feel confident in every purchase. Here is everything you need to know
            about returns, exchanges, and refunds at {settings.brandName}.
          </p>
        </div>

        <div className="space-y-4">
          {POLICY_SECTIONS.map((section) => (
            <section key={section.title} className="card p-6 sm:p-8 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={section.icon} className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{section.title}</h2>
                <p className="text-text-muted mt-2 leading-relaxed">{section.content}</p>
              </div>
            </section>
          ))}
        </div>

        <section className="card p-6 sm:p-8 mt-4">
          <h2 className="text-xl font-bold mb-4">Refunds & Shipping Costs</h2>
          <div className="space-y-3 text-text-muted leading-relaxed">
            <p>
              Once your return is inspected and approved, we will confirm the refund amount and
              processing method. Refunds are issued to the original payment method where possible.
            </p>
            <p>
              For change-of-mind returns or size exchanges, return shipping charges may apply.
              If we sent an incorrect or damaged item, {settings.brandName} will arrange the appropriate
              replacement or resolution.
            </p>
            <p>
              Refund processing times can vary by bank or payment provider after approval.
            </p>
          </div>
        </section>

        <section className="card p-8 mt-8 text-center bg-surface-2/40 border-accent/20">
          <h2 className="text-xl font-bold">Need help with a return?</h2>
          <p className="text-text-muted text-sm mt-2">
            Keep your order number ready and our support team will guide you through the next step.
          </p>
          <Link href="/contact" className="btn btn-primary btn-md mt-6 inline-flex">
            Contact Support
          </Link>
        </section>
      </div>
    </div>
  );
}
