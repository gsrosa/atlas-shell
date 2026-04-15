import { Button } from "@gsrosa/atlas-ui";
import { MapPinOffIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-6">
        {/* Icon */}
        <div className="flex size-16 items-center justify-center rounded-2xl border border-primary-500/20 bg-primary-500/10 text-primary-400">
          <MapPinOffIcon className="size-7" strokeWidth={1.5} aria-hidden />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-400">
            404 — Not Found
          </p>
          <h1 className="text-2xl font-bold text-neutral-700">
            This page doesn't exist
          </h1>
          <p className="text-sm text-neutral-500">
            <span className="font-mono text-xs text-neutral-400">{pathname}</span>
            {" "}couldn't be found. It may have moved or the link might be broken.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild variant="primary" size="md">
            <Link to="/">Back to home</Link>
          </Button>
          <Button asChild variant="ghost" size="md">
            <Link to="/assistant">Plan a trip</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
