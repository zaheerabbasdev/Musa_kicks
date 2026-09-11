import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface-2 border border-border flex items-center justify-center text-accent text-3xl">
          <FontAwesomeIcon icon={faBoxOpen} />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-accent">
          404 Error
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase mt-2 mb-4 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-8">
          The product or page you're searching for might be unavailable, moved, or no longer exists.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/shop" className="btn btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2">
            <span>Browse Catalog</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
          <Link href="/" className="btn btn-secondary w-full sm:w-auto">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
