'use client';

import * as React from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

type MotionPresenceProps = {
  children: React.ReactNode;
};

export function MotionPresence({ children }: MotionPresenceProps) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
