'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type ConfettiModule = { Confetti?: React.ComponentType<{ active: boolean }> };

export function EliteConfettiCta({ className }: { className?: string }) {
  const [active, setActive] = React.useState(false);
  const [Confetti, setConfetti] = React.useState<React.ComponentType<{ active: boolean }> | null>(null);

  React.useEffect(() => {
    let mounted = true;
    import('magic-ui')
      .then((mod: ConfettiModule) => {
        if (mounted && mod.Confetti) {
          setConfetti(() => mod.Confetti as React.ComponentType<{ active: boolean }>);
        }
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      {Confetti ? <Confetti active={active} /> : null}
      <button
        type="button"
        onClick={() => {
          setActive(true);
          window.setTimeout(() => setActive(false), 2000);
        }}
        className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        Celebrate launch
      </button>
    </div>
  );
}
