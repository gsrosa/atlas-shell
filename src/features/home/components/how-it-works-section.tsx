import { Map, Plane, Sparkles } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/how-it-works-steps';
import type { HowItWorksIconKey } from '../types';
import { FadeUp } from './fade-up';

const STEP_ICONS: Record<HowItWorksIconKey, typeof Map> = {
  map: Map,
  sparkles: Sparkles,
  plane: Plane,
};

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="hiw-heading"
      className="border-y border-white/[0.04] bg-neutral-100 px-4 py-16 sm:px-5 sm:py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <FadeUp>
          <div className="mb-10 text-center sm:mb-12 md:mb-16">
            <span className="mb-3 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary-400 sm:text-[11px]">
              How it works
            </span>
            <h2
              id="hiw-heading"
              className="m-0 font-display text-2xl italic leading-[1.15] tracking-tight text-neutral-700 sm:text-3xl md:text-4xl"
            >
              From idea to itinerary
              <br />
              in one conversation
            </h2>
          </div>
        </FadeUp>

        <div className="relative grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-8">
          <div
            className="pointer-events-none absolute left-[18%] right-[18%] top-10 z-0 hidden h-px border-t border-dashed border-primary-400/25 lg:block"
            aria-hidden="true"
          />
          {HOW_IT_WORKS_STEPS.map((s, i) => {
            const Icon = STEP_ICONS[s.iconKey];
            return (
              <FadeUp key={s.num} delay={i * 120}>
                <article className="relative z-[1] h-full rounded-2xl border border-white/[0.06] bg-neutral-200 p-5 sm:p-6 md:p-7">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex size-12 shrink-0 items-center justify-center rounded-[14px] border border-primary-400/30 bg-primary-500/15 sm:size-14"
                      aria-hidden="true"
                    >
                      <Icon className="size-6 text-primary-400 sm:size-7" strokeWidth={1.75} />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary-400">
                      Step {s.num}
                    </span>
                  </div>
                  <h3 className="m-0 mb-2 font-display text-lg font-extrabold tracking-tight text-neutral-700 sm:text-xl">
                    {s.title}
                  </h3>
                  <p className="m-0 text-sm leading-relaxed text-neutral-600">{s.body}</p>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
