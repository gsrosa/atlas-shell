import { STITCH_MAP_UI } from '../data/stitch-assets';
import { FadeUp } from './fade-up';

export function PrecisionSection() {
  return (
    <section
      aria-labelledby="precision-heading"
      className="overflow-x-clip bg-neutral-50 px-4 py-16 sm:px-5 sm:py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <FadeUp>
          <div className="order-2 space-y-8 lg:order-1">
            <div>
              <span className="mb-3 block font-sans text-xs tracking-widest text-auxiliary-400 uppercase">
                02 / Technical layer
              </span>
              <h2
                id="precision-heading"
                className="m-0 font-display text-2xl leading-tight text-neutral-700 italic sm:text-3xl md:text-4xl lg:text-5xl"
              >
                Hyper-precision
                <br />
                environment mapping
              </h2>
            </div>
            <ul className="m-0 list-none space-y-8 p-0">
              {[
                {
                  t: 'Topo-aware routing',
                  d: 'Terrain, season, and pacing inform every segment — not just drive times between pins.',
                },
                {
                  t: 'Solo-first safety context',
                  d: 'Neighborhood and activity signals tuned for traveling alone, without the noise of generic tips.',
                },
                {
                  t: 'Living itinerary sync',
                  d: 'Change one day and the rest reshuffles. Your plan stays a single coherent story.',
                },
              ].map((item) => (
                <li key={item.t} className="flex items-start gap-5">
                  <div
                    className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-400"
                    aria-hidden="true"
                  >
                    <span className="text-lg font-bold text-auxiliary-400">◇</span>
                  </div>
                  <div>
                    <h3 className="m-0 mb-1.5 text-base font-bold text-neutral-700">{item.t}</h3>
                    <p className="m-0 text-sm font-light leading-relaxed text-neutral-600">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>

        <FadeUp delay={120}>
          <div className="relative order-1 lg:order-2">
            <div
              className="pointer-events-none absolute -inset-8 rounded-full bg-auxiliary-500/10 blur-[80px]"
              aria-hidden="true"
            />
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-white/[0.06] bg-neutral-300 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.4)] lg:aspect-[4/3]">
              <div className="absolute inset-0 opacity-45 mix-blend-screen">
                <img
                  src={STITCH_MAP_UI}
                  alt=""
                  className="size-full object-cover contrast-125 grayscale brightness-125"
                />
              </div>
              <div className="absolute right-5 top-5 z-[1]">
                <div className="glass-panel-home flex items-center gap-2.5 rounded-xl border border-white/10 px-3 py-2.5">
                  <div className="size-2 rounded-full bg-green-400 motion-safe:animate-pulse" />
                  <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-700">
                    Planner active
                  </span>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 right-5 z-[1]">
                <div className="glass-panel-home flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 p-5 sm:flex-nowrap">
                  <div>
                    <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                      Confidence
                    </div>
                    <div className="font-display text-2xl text-neutral-700">High</div>
                  </div>
                  <div className="hidden h-10 w-px shrink-0 bg-white/10 sm:block" aria-hidden="true" />
                  <div className="min-w-[140px] flex-1">
                    <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                      Route synthesis
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[72%] rounded-full bg-primary-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
