import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
      {/* Loyalty Banner Strip */}
      <div
        className="py-4 text-center text-sm font-medium tracking-wide"
        style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
      >
        🎁 Shop 4 times and get a Special Gift — Our loyalty reward for you!
      </div>

      {/* Main Footer */}
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="text-2xl font-display font-bold tracking-tight">MUSA</span>
              <span
                className="text-2xl font-display font-bold tracking-tight"
                style={{ color: "var(--soft-beige, #D8C3A5)" }}
              >
                {" "}KICKS
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 opacity-75 max-w-[200px]">
              {siteConfig.description.substring(0, 100)}...
            </p>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.social.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 opacity-60">
              Shop
            </h3>
            <ul className="flex flex-col gap-2.5">
              {siteConfig.footer.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-75 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 opacity-60">
              Help
            </h3>
            <ul className="flex flex-col gap-2.5">
              {siteConfig.footer.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-75 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 opacity-60">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5 mb-6">
              {siteConfig.footer.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-75 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-sm opacity-75 flex flex-col gap-1">
              <p>{siteConfig.brand.address}</p>
              <a
                href={`mailto:${siteConfig.brand.email}`}
                className="hover:opacity-100 transition-opacity"
              >
                {siteConfig.brand.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-4"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-2 text-sm opacity-60">
          <p>© {year} Musa Kicks. All rights reserved.</p>
          <p>Premium footwear, delivered with care.</p>
        </div>
      </div>
    </footer>
  );
}
