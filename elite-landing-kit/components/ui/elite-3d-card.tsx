'use client';

import * as React from 'react';
import { LazyMotion, domAnimation, m, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { sanitizeMarkup } from '@/lib/sanitize';

type Elite3DCardProps = {
  title: string;
  description: string;
  svgMarkup: string;
  className?: string;
};

export function Elite3DCard({ title, description, svgMarkup, className }: Elite3DCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const sanitized = React.useMemo(() => sanitizeMarkup(svgMarkup), [svgMarkup]);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY }}
        className={cn(
          'relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-white shadow-2xl backdrop-blur',
          'transition-transform duration-300 will-change-transform',
          className
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden
          dangerouslySetInnerHTML={{ __html: sanitized }}
        />
        <div className="relative space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-slate-200">{description}</p>
        </div>
      </m.div>
    </LazyMotion>
  );
}
