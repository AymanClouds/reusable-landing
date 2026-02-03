'use client';

import * as React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { cn } from '@/lib/utils';

const tiers = [
  {
    name: 'Launch',
    price: '$29k',
    description: 'For teams launching their first enterprise landing system.',
    features: ['2 templates', 'Design tokens', 'Launch analytics']
  },
  {
    name: 'Scale',
    price: '$59k',
    description: 'For companies scaling multi-product experiences.',
    features: ['6 templates', 'A/B testing', 'AI personalization']
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Custom workflows, SLAs, and global teams.',
    features: ['Unlimited templates', 'Dedicated support', 'Security review']
  }
];

type ElitePricingProps = {
  className?: string;
};

export function ElitePricing({ className }: ElitePricingProps) {
  return (
    <section className={cn('space-y-8', className)} data-track-section>
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-white">Pricing that scales with your ambition</h2>
        <p className="mt-2 text-slate-300">
          Modular tiers with immersive effects, glow treatments, and 3D tilt.
        </p>
      </div>
      <LazyMotion features={domAnimation}>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <m.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-white shadow-xl"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_70%)]" />
              </div>
              <div className="relative space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{tier.name}</h3>
                  <p className="text-3xl font-bold">{tier.price}</p>
                </div>
                <p className="text-sm text-slate-300">{tier.description}</p>
                <ul className="space-y-2 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-500" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-4 w-full rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  type="button"
                >
                  Choose {tier.name}
                </button>
              </div>
            </m.div>
          ))}
        </div>
      </LazyMotion>
    </section>
  );
}
