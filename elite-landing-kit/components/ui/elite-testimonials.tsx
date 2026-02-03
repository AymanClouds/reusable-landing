'use client';

import * as React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    quote: 'EliteLanding Kit delivered 2x faster launch cycles with premium visuals.',
    name: 'Ava Torres',
    role: 'VP Growth, CloudAtlas'
  },
  {
    quote: 'Our enterprise pipeline doubled after switching to the modular template system.',
    name: 'Jon Park',
    role: 'Head of Marketing, NovaBridge'
  },
  {
    quote: 'The AI personalization hooks let us tailor the CTA without engineering overhead.',
    name: 'Mia Chen',
    role: 'Product Lead, HorizonWare'
  }
];

type EliteTestimonialsProps = {
  className?: string;
};

export function EliteTestimonials({ className }: EliteTestimonialsProps) {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className={cn('space-y-6', className)} data-track-section>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-white">Trusted by high-growth teams</h2>
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={cn(
                'h-2 w-6 rounded-full transition',
                active === index ? 'bg-white' : 'bg-white/30'
              )}
              aria-label={`Show testimonial ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
      <LazyMotion features={domAnimation}>
        <m.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/10 bg-slate-950/70 p-8 text-white shadow-xl"
        >
          <p className="text-lg text-slate-100">“{testimonials[active].quote}”</p>
          <div className="mt-4 text-sm text-slate-300">
            <span className="font-semibold text-white">{testimonials[active].name}</span> —
            {` ${testimonials[active].role}`}
          </div>
        </m.div>
      </LazyMotion>
    </section>
  );
}
