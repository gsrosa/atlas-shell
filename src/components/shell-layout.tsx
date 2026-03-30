import { Outlet, ScrollRestoration } from 'react-router-dom';
import { BottomNav } from './bottom-nav';
import { Footer } from './footer';
import { TopNav } from './top-nav';

export function ShellLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-neutral-50 text-neutral-700">
      <TopNav />
      <main className="flex min-h-0 flex-1 flex-col pb-[calc(60px+env(safe-area-inset-bottom,0px))] md:pb-0">
        <ScrollRestoration />
        <div className="flex min-h-0 flex-1 flex-col">
          <Outlet />
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
