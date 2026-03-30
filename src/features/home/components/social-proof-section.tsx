import { HOME_STATS } from '../data/stats';
import { HOME_TESTIMONIALS } from '../data/testimonials';
import { AnimatedCounter } from './animated-counter';
import { FadeUp } from './fade-up';

export function SocialProofSection() {
  return (
    <section aria-labelledby="proof-heading" className="bg-neutral-50 px-4 py-16 sm:px-5 sm:py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <FadeUp>
          <div
            role="note"
            className="mb-10 rounded-2xl border border-primary-400/20 bg-neutral-100 px-5 py-6 text-center sm:mb-14 md:px-8 md:py-8"
          >
            <p className="mb-2 text-[11px] font-bold tracking-wide text-primary-400">
              🌿 Atlas is in private beta
            </p>
            <p className="m-0 text-sm leading-relaxed text-neutral-600 md:text-base">
              1,200 solo travelers have already planned trips to 47 countries.
              <br />
              We&apos;re opening early access in waves.
            </p>
          </div>
        </FadeUp>

        <h2 id="proof-heading" className="sr-only">
          By the numbers
        </h2>

        <div className="mb-10 grid grid-cols-3 gap-2 sm:mb-14 md:gap-5">
          {HOME_STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 100}>
              <div
                className="rounded-2xl border border-white/[0.06] bg-neutral-100 px-2 py-5 text-center md:px-4 md:py-7"
                style={{ boxShadow: '0 16px 40px rgba(0,0,0,0.28)' }}
              >
                <span className="block text-2xl font-black leading-none tracking-tight text-primary-400 md:text-4xl">
                  <AnimatedCounter to={s.to} suffix={s.suffix} />
                </span>
                <span className="mt-2 block text-[10px] font-medium text-neutral-600 md:text-xs">
                  {s.label}
                </span>
              </div>
            </FadeUp>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {HOME_TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 130}>
              <figure
                className="m-0 rounded-2xl border border-white/[0.06] bg-neutral-100 px-5 py-6 md:px-7 md:py-7"
                style={{ boxShadow: '0 16px 40px rgba(0,0,0,0.28)' }}
              >
                <blockquote className="m-0 mb-4 text-sm italic leading-relaxed text-neutral-600 md:text-[15px]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-extrabold text-white md:size-10"
                    aria-hidden="true"
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-700">{t.name}</div>
                    <div className="text-[11px] text-neutral-500">{t.city}</div>
                  </div>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
