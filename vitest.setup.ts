import { cleanup } from '@testing-library/react';
import { afterEach,  expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';

import '@/lib/i18n';
import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';

expect.extend(matchers);
class IntersectionObserverStub implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  disconnect() {}

  observe(target: Element) {
    queueMicrotask(() => {
      const rect = target.getBoundingClientRect();
      this.callback(
        [
          {
            boundingClientRect: rect,
            intersectionRatio: 1,
            intersectionRect: rect,
            isIntersecting: true,
            rootBounds: null,
            target,
            time: Date.now(),
          } satisfies IntersectionObserverEntry,
        ],
        this,
      );
    });
  }

  takeRecords() {
    return [];
  }

  unobserve() {}
}

globalThis.IntersectionObserver =
  IntersectionObserverStub as unknown as typeof IntersectionObserver;

window.scrollTo = () => {};

afterEach(() => {
  cleanup();
});
