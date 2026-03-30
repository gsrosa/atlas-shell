import { HOME_FEATURE_ITEMS } from '../data/feature-items';
import { FadeUp } from './fade-up';
import { FeatureIcon } from './home-icons';

export function FeaturesSection() {
  return (
    <section
      aria-labelledby="features-heading"
      className="relative z-[1] bg-neutral-50 px-4 pb-20 pt-16 sm:px-5 sm:pb-24 sm:pt-20 md:px-10 md:pb-32 md:pt-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <FadeUp>
          <div className="mb-12 flex flex-col gap-8 md:mb-20 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2
                id="features-heading"
                className="m-0 mb-4 font-display text-2xl leading-tight text-neutral-700 italic sm:text-3xl md:text-4xl lg:text-[2.75rem]"
              >
                Cognitive exploration,
                <br />
                not just coordination.
              </h2>
              <p className="m-0 max-w-md text-base font-light leading-relaxed text-neutral-600 md:text-lg">
                We move beyond static lists to living plans. Atlas learns your pace, then adapts when the
                weather — or your curiosity — shifts.
              </p>
            </div>
            <div className="shrink-0 font-sans text-xs tracking-widest text-auxiliary-400 uppercase">
              01 / The advantage
            </div>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          {HOME_FEATURE_ITEMS.map((f, i) => (
            <FadeUp key={f.title} delay={i * 80}>
              <article className="group flex h-full flex-col rounded-xl border border-transparent bg-neutral-100 p-6 sm:p-8 md:p-10 hover:border-white/[0.06] hover:bg-neutral-200">
                <div className="mb-6 flex h-12 w-12 items-center justify-center text-primary-400">
                  <span className="scale-125">
                    <FeatureIcon index={i} />
                  </span>
                </div>
                <h3 className="m-0 mb-3 font-display text-lg text-neutral-700 md:text-2xl">
                  {f.title}
                </h3>
                <p className="m-0 mb-4 flex-1 font-sans text-sm leading-relaxed text-neutral-600">{f.body}</p>
                <div className="font-sans text-[10px] tracking-widest text-neutral-500 uppercase opacity-0 group-hover:opacity-100">
                  Atlas intelligence
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
