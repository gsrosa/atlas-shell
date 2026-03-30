import { Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/shell-routes';
import { STITCH_CTA_NIGHT } from '../data/stitch-assets';
import { FadeUp } from './fade-up';

export function FinalCtaSection() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative flex min-h-[380px] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center sm:min-h-[420px] sm:px-5 sm:py-24 md:min-h-[520px] md:px-10 md:py-36"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={STITCH_CTA_NIGHT}
          alt=""
          className="size-full object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-[#111317]/65" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <FadeUp>
          <div className="mb-4 text-3xl text-primary-400 md:text-5xl" aria-hidden="true">
            ✦
          </div>
          <h2
            id="final-cta-heading"
            className="m-0 mb-4 font-display text-3xl italic leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Redefine wandering.
          </h2>
          <p className="mx-auto mb-8 mt-0 max-w-xl text-base font-light leading-relaxed text-neutral-600 md:mb-10 md:text-lg">
            Step into travel planning that respects both the machine and the explorer. One message is enough
            to start.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to={ROUTES.ASSISTANT}
              className="inline-flex items-center gap-2.5 rounded-full border-none bg-primary-500 px-10 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-white no-underline md:px-14"
            >
              <Plane className="size-4 shrink-0" aria-hidden /> Initialize Atlas
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-10 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white no-underline hover:bg-white/10 md:px-12"
            >
              How it works
            </a>
          </div>
          <span className="mt-6 block text-[11px] text-neutral-500 md:text-xs">
            Beta access · No credit card · Cancel anytime
          </span>
        </FadeUp>
      </div>
    </section>
  );
}
