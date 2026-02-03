import * as React from 'react';
import { MotionPresence } from '@/components/ui/motion-presence';

const EliteLandingTemplate = React.lazy(() =>
  import('@/templates/elite-landing-template').then((mod) => ({ default: mod.EliteLandingTemplate }))
);

export default function HomePage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-12">
      <React.Suspense fallback={<div className="text-white/70">Loading elite experience...</div>}>
        <MotionPresence>
          <EliteLandingTemplate variant="enterprise" />
        </MotionPresence>
      </React.Suspense>
    </div>
  );
}
