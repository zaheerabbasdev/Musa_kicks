import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faTruck, faRotateLeft, faCreditCard, faShoePrints } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Musa Kicks",
  description: "Find answers about orders, delivery, sizing, returns, and WhatsApp ordering at Musa Kicks.",
};

const FAQS = [
  {
    category: "Ordering & WhatsApp",
    icon: faShoePrints,
    items: [
      {
        q: "How do I order via WhatsApp?",
        a: "Simply click the 'Order on WhatsApp' button on any product page or in your shopping cart. It prepares a pre-formatted message with your selected shoes, sizes, colors, and order totals. Our team confirms availability and your shipping address immediately.",
      },
      {
        q: "Can I place an order directly on the website?",
        a: "Yes! You can add items to your cart, proceed to checkout, provide your delivery address, and choose Cash on Delivery or bank transfer.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    icon: faTruck,
    items: [
      {
        q: "How long does delivery take?",
        a: "Orders in major cities (Lahore, Karachi, Islamabad, Rawalpindi) typically arrive within 2–3 business days. Other cities and regions take 3–5 business days.",
      },
      {
        q: "What are the delivery charges?",
        a: "Standard shipping is Rs. 250 nationwide. Orders above Rs. 10,000 qualify for FREE delivery.",
      },
    ],
  },
  {
    category: "Sizing & Authenticity",
    icon: faShoePrints,
    items: [
      {
        q: "Are the sizes in EU or US?",
        a: "All our footwear sizes are listed in standard EU sizing (EU 39 to EU 45). Each product page also contains a size selector guide with corresponding US and CM measurements.",
      },
      {
        q: "Are your shoes 100% authentic and genuine quality?",
        a: "Every pair sold at Musa Kicks undergoes strict multi-point physical inspections for build quality, sole cushion, and upper materials before dispatch.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    icon: faRotateLeft,
    items: [
      {
        q: "Can I exchange for a different size?",
        a: "Yes, we offer an easy 7-day exchange window. As long as the pair is unworn with original packaging and tags attached, message us on WhatsApp and we will dispatch your replacement.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="badge badge-accent uppercase tracking-widest text-xs mb-3">
          Help Center
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-text-muted mt-4 text-base sm:text-lg">
          Everything you need to know about purchasing, delivery, and sizing at Musa Kicks.
        </p>
      </div>

      <div className="space-y-12">
        {FAQS.map((section, idx) => (
          <div key={idx} className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <FontAwesomeIcon icon={section.icon} className="text-accent text-lg" />
              <h2 className="text-xl font-bold uppercase tracking-wider">{section.category}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, i) => (
                <div key={i} className="card p-6 space-y-2">
                  <h3 className="font-bold text-base text-text-primary flex items-start gap-2">
                    <span className="text-accent font-black">Q:</span>
                    <span>{item.q}</span>
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed pl-6">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card p-8 mt-16 text-center border-accent/20 bg-surface-2/40">
        <h3 className="text-xl font-bold">Still have questions?</h3>
        <p className="text-text-muted text-sm mt-2 max-w-md mx-auto">
          Can't find what you're looking for? Reach out directly to our support specialists.
        </p>
        <Link href="/contact" className="btn btn-primary btn-md mt-6 inline-flex">
          Contact Support
        </Link>
      </div>
    </div>
  );
}
