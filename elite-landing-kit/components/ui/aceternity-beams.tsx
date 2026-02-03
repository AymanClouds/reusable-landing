'use client';

import * as React from 'react';

type BeamsModule = { BackgroundBeams?: React.ComponentType<{ className?: string }> };

export function AceternityBeams({ className }: { className?: string }) {
  const [Beams, setBeams] = React.useState<React.ComponentType<{ className?: string }> | null>(null);

  React.useEffect(() => {
    let mounted = true;
    import('aceternity-ui')
      .then((mod: BeamsModule) => {
        if (mounted && mod.BackgroundBeams) {
          setBeams(() => mod.BackgroundBeams as React.ComponentType<{ className?: string }>);
        }
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, []);

  if (!Beams) {
    return <div className={className} aria-hidden />;
  }

  return <Beams className={className} />;
}
