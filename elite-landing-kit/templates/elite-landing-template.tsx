'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { EliteHero } from '@/components/ui/elite-hero';
import { ElitePricing } from '@/components/ui/elite-pricing';
import { EliteTestimonials } from '@/components/ui/elite-testimonials';
import { EliteConfettiCta } from '@/components/ui/elite-confetti-cta';

const Elite3DCard = dynamic(() => import('@/components/ui/elite-3d-card').then((mod) => mod.Elite3DCard), {
  ssr: false
});

type EliteLandingTemplateProps = {
  variant?: 'default' | 'enterprise';
  className?: string;
};

export function EliteLandingTemplate({ variant = 'default', className }: EliteLandingTemplateProps) {
  const heroSubtitle =
    variant === 'enterprise'
      ? 'Composable landing experiences with enterprise-grade personalization and security.'
      : 'Launch elite landing pages with modular templates, AI personalization, and motion-first design.';

  return (
    <main className={cn('space-y-16', className)}>
      <EliteHero
        title="EliteLanding Kit"
        subtitle={heroSubtitle}
        personalized={variant !== 'default'}
      />
      <section className="grid gap-6 md:grid-cols-2" data-track-section>
        <Elite3DCard
          title="Immersive 3D blocks"
          description="Motion-powered cards with parallax depth, sanitized SVG overlays, and responsive scaling."
          svgMarkup={`<svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'><path fill='rgba(59,130,246,0.4)' d='M0 120 Q80 60 160 120 T320 120 T400 80 V200 H0 Z'/></svg>`}
        />
        <Elite3DCard
          title="Adaptive motion systems"
          description="Micro-interactions, glow accents, and scroll reveals composed through a unified API."
          svgMarkup={`<svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'><circle cx='120' cy='100' r='70' fill='rgba(99,102,241,0.35)' /><circle cx='260' cy='80' r='50' fill='rgba(14,165,233,0.35)' /></svg>`}
        />
      </section>
      <ElitePricing />
      <EliteConfettiCta className="py-6" />
      <EliteTestimonials />
    </main>
  );
}
