'use client';

import * as React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePersonalization } from '@/hooks/use-personalization';
import { AceternityBeams } from '@/components/ui/aceternity-beams';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 }
};

type EliteHeroProps = {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  personalized?: boolean;
  className?: string;
};

export function EliteHero({
  title,
  subtitle,
  ctaLabel = 'Book a strategy call',
  personalized = true,
  className
}: EliteHeroProps) {
  const { ctaText } = usePersonalization({
    enabled: personalized,
    defaultCta: ctaLabel
  });

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-16 text-white shadow-2xl',
        className
      )}
      data-track-section
    >
      <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(circle,white,transparent_70%)]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_#3b82f6,_transparent_55%)]" />
        <AceternityBeams className="absolute inset-0 opacity-60" />
      </div>
      <LazyMotion features={domAnimation}>
        <m.div
          className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 text-center"
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          variants={{}}
        >
          <m.h1 className="text-4xl font-semibold tracking-tight md:text-6xl" variants={fadeUp}>
            {title}
          </m.h1>
          <m.p className="max-w-2xl text-base text-slate-200 md:text-lg" variants={fadeUp}>
            {subtitle}
          </m.p>
          <m.button
            data-personalized-cta
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            variants={fadeUp}
            type="button"
          >
            {ctaText}
          </m.button>
        </m.div>
      </LazyMotion>
    </section>
  );
}
