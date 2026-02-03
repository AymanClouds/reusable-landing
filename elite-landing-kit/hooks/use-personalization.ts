'use client';

import * as React from 'react';

type PersonalizationOptions = {
  enabled?: boolean;
  defaultCta?: string;
  engagedCta?: string;
};

type PersonalizationState = {
  ctaText: string;
  intentScore: number;
  scrollDepth: number;
};

const STORAGE_KEY = 'elite-landing-kit:signals';

export function usePersonalization({
  enabled = true,
  defaultCta = 'Request a demo',
  engagedCta = 'Get a custom walkthrough'
}: PersonalizationOptions = {}): PersonalizationState {
  const [state, setState] = React.useState<PersonalizationState>({
    ctaText: defaultCta,
    intentScore: 0,
    scrollDepth: 0
  });

  React.useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as PersonalizationState;
        setState((prev) => ({ ...prev, ...parsed }));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    let maxScroll = 0;
    const sections = Array.from(document.querySelectorAll('[data-track-section]'));
    sections.forEach((section, index) => section.setAttribute('data-track-index', `${index}`));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.trackIndex ?? 0);
            const total = Math.max(1, sections.length);
            const depth = Math.round(((index + entry.intersectionRatio) / total) * 100);
            maxScroll = Math.max(maxScroll, depth);
            setState((prev) => ({
              ...prev,
              scrollDepth: maxScroll
            }));
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [enabled]);

  React.useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    let hoverTime = 0;
    let rafId = 0;
    let lastTime = performance.now();

    const trackHover = () => {
      const now = performance.now();
      hoverTime += now - lastTime;
      lastTime = now;
      rafId = requestAnimationFrame(trackHover);
    };

    const onEnter = () => {
      lastTime = performance.now();
      rafId = requestAnimationFrame(trackHover);
    };

    const onLeave = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const cta = document.querySelector('[data-personalized-cta]');
    cta?.addEventListener('mouseenter', onEnter);
    cta?.addEventListener('mouseleave', onLeave);

    const computeIntent = async () => {
      try {
        const tf = await import('@tensorflow/tfjs');
        const input = tf.tensor2d([[hoverTime / 1000]]);
        const weights = tf.tensor2d([[0.8]]);
        const bias = tf.scalar(0.2);
        const prediction = input.matMul(weights).add(bias).dataSync()[0];
        const intentScore = Math.min(1, prediction / 10);
        setState((prev) => ({
          ...prev,
          intentScore,
          ctaText: intentScore > 0.4 ? engagedCta : defaultCta
        }));
      } catch {
        setState((prev) => ({
          ...prev,
          ctaText: prev.scrollDepth > 40 ? engagedCta : defaultCta
        }));
      }
    };

    const timer = window.setInterval(() => {
      computeIntent();
    }, 2000);

    return () => {
      cta?.removeEventListener('mouseenter', onEnter);
      cta?.removeEventListener('mouseleave', onLeave);
      window.clearInterval(timer);
      cancelAnimationFrame(rafId);
    };
  }, [defaultCta, enabled, engagedCta]);

  React.useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [enabled, state]);

  return state;
}
