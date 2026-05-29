import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-black-condensed text-[clamp(96px,20vw,200px)] text-lime leading-none">404</h1>
        <p className="font-body text-lg text-muted mt-4 max-w-md mx-auto">
          This page doesn't exist or has been archived.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 pill-btn px-6 py-3 mt-8 text-sm"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
