import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/shell-routes';
import { HOME_DESTINATIONS } from '../data/destinations';
import { FadeUp } from './fade-up';

export function DestinationsSection() {
  return (
    <section
      aria-labelledby="dest-heading"
      className="bg-neutral-100 py-16 pl-4 sm:py-20 sm:pl-5 md:py-28 md:pl-10 overflow-x-clip overflow-y-visible"
    >
      <div className="mx-auto mb-10 flex max-w-[1200px] flex-col gap-4 pr-4 sm:pr-5 md:mb-12 md:pr-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary-400 sm:text-[11px]">
            Active syntheses
          </span>
          <h2
            id="dest-heading"
            className="m-0 font-display text-2xl italic tracking-tight text-neutral-700 sm:text-3xl md:text-4xl"
          >
            Where will you go first?
          </h2>
          <p className="m-0 mt-2 max-w-lg text-sm leading-relaxed text-neutral-600">
            Every destination has a starter path you can personalize in one conversation.
          </p>
        </div>
        <div className="flex shrink-0 gap-2 text-neutral-700" aria-hidden="true">
          <span className="flex size-11 items-center justify-center rounded-full border border-white/10">
            <ChevronLeft className="size-5 opacity-60" strokeWidth={2} />
          </span>
          <span className="flex size-11 items-center justify-center rounded-full border border-white/10">
            <ChevronRight className="size-5 opacity-60" strokeWidth={2} />
          </span>
        </div>
      </div>

      <div
        role="list"
        aria-label="Destination journeys"
        className="destinations-horizontal-scroll no-scrollbar flex gap-4 overflow-x-auto pb-6 pr-4 snap-x snap-mandatory sm:gap-5 sm:pr-5 md:gap-6 md:pr-10"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {HOME_DESTINATIONS.map((d, i) => (
          <FadeUp key={d.name} delay={i * 50} className="snap-start shrink-0">
            <article
              role="listitem"
              className="group relative h-[min(62dvh,440px)] w-[min(88vw,400px)] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:h-[min(58dvh,500px)] md:h-[min(56dvh,520px)]"
            >
              {d.imageUrl ? (
                <>
                  <img
                    src={d.imageUrl}
                    alt=""
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#111317]/45" />
                  <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[#111317]/90" />
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl"
                    style={{ backgroundColor: d.color }}
                    aria-hidden="true"
                  >
                    {d.emoji}
                  </div>
                  <div className="absolute inset-0 bg-[#111317]/35" />
                  <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[#111317]/88" />
                </>
              )}
              <div className="absolute bottom-0 left-0 right-0 z-[1] p-6 sm:p-8 md:p-10">
                {d.badges && d.badges.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
                    {d.badges.map((b) => (
                      <span
                        key={b}
                        className="rounded-full bg-white/15 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-white backdrop-blur-md"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
                {!d.badges && (
                  <span className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-white backdrop-blur-md sm:mb-4">
                    {d.tag}
                  </span>
                )}
                <h3 className="m-0 mb-2 font-display text-xl italic text-white sm:text-2xl md:text-3xl">
                  {d.name}
                </h3>
                <p className="m-0 mb-1 text-sm font-medium text-white/70">{d.country}</p>
                <p className="m-0 mb-5 line-clamp-2 text-sm leading-relaxed text-white/80 sm:mb-6">
                  {d.hook}
                </p>
                <Link
                  to={ROUTES.ASSISTANT}
                  className="block w-full rounded-full border border-primary-400/60 bg-primary-500 py-3.5 text-center text-[11px] font-bold uppercase tracking-widest text-white no-underline transition-colors hover:bg-primary-600 hover:text-white"
                >
                  Initialize trip
                </Link>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
