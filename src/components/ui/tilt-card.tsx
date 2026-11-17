import React from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(y, { stiffness: 200, damping: 25 });
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div className={cn('relative', className)}
      style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={event => {
        if (reducedMotion || event.pointerType !== 'mouse') return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((0.5 - (event.clientY - rect.top) / rect.height) * 6);
        y.set(((event.clientX - rect.left) / rect.width - 0.5) * 6);
      }} onPointerLeave={reset} onPointerCancel={reset}>
      {children}
    </motion.div>
  );
}
