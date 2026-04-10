import { Plane, Sparkles } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { useSession } from '@/features/auth/use-session';
import { ROUTES } from '@/shared/constants/shell-routes';
import { STITCH_HERO_IMAGE } from '../data/stitch-assets';
import { AiChatDemo } from './ai-chat-demo';

export function HeroSection() {
  const navigate = useNavigate();
  const openLogin = useAuthUiStore((s) => s.openLogin);
  const { isAuthenticated, isLoading } = useSession();
  const [prompt, setPrompt] = useState('');

  function goPlan() {
    if (isLoading) return;
    if (!isAuthenticated) {
      openLogin();
      return;
    }
    navigate(ROUTES.ASSISTANT);
  }

  function onSearchKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') goPlan();
  }

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[min(100dvh,920px)] flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={STITCH_HERO_IMAGE}
          alt=""
          className="size-full scale-105 object-cover brightness-[0.42]"
        />
        <div className="absolute inset-0 bg-[#111317]/35" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[#111317]/80" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 pb-14 pt-24 sm:px-5 sm:pb-16 sm:pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <span className="mb-4 block font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-primary-400">
              Neural wayfinding engine
            </span>
            <h1
              id="hero-heading"
              className="m-0 mb-5 font-display text-[2rem] font-bold italic leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]"
            >
              Your journey,{' '}
              <br className="hidden sm:block" />
              <span className="font-display not-italic text-primary-300">synthesized by AI.</span>
            </h1>
            <p className="mx-auto mb-8 max-w-[480px] text-[15px] leading-relaxed text-neutral-600 sm:text-base lg:mx-0">
              Tell Atlas where instinct points you. Solo itineraries that adapt to weather, terrain, and
              the hidden rhythm of the trail — not another static PDF.
            </p>

            <div className="mx-auto mb-6 max-w-xl lg:mx-0">
              <div className="glass-panel-home flex items-center gap-1 rounded-full border border-white/10 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                <Sparkles className="size-[22px] shrink-0 text-neutral-500" aria-hidden strokeWidth={1.5} />
                <label htmlFor="hero-intent" className="sr-only">
                  Describe your trip
                </label>
                <input
                  id="hero-intent"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={onSearchKeyDown}
                  placeholder="Where does your intuition take you?"
                  className="min-w-0 flex-1 border-none bg-transparent px-2 py-3.5 text-[15px] text-neutral-700 placeholder:text-neutral-500 focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  onClick={goPlan}
                  className="shrink-0 rounded-full bg-primary-500 px-5 py-3.5 text-[13px] font-bold tracking-wide text-white sm:px-8 sm:text-sm"
                >
                  Initialize trip
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
              <button
                type="button"
                onClick={goPlan}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border-none bg-auxiliary-500 px-6 py-3 text-sm font-extrabold whitespace-nowrap text-[#00363d] shadow-[0_4px_28px_rgba(0,227,253,0.25)]"
              >
                <Plane className="size-4 shrink-0" aria-hidden /> Plan with chat
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15"
              >
                How it works ↓
              </a>
            </div>
          </div>

          <div className="hidden w-full shrink-0 lg:block lg:w-[440px]">
            <AiChatDemo />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 opacity-50">
        <span className="font-sans text-[10px] uppercase tracking-widest text-white">Scroll</span>
        <span className="text-lg text-white motion-safe:animate-bounce" aria-hidden="true">
          ↓
        </span>
      </div>

      <Link to={ROUTES.ASSISTANT} className="sr-only">
        Skip to trip planner
      </Link>
    </section>
  );
}
