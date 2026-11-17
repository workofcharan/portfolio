import React from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 35 });
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-white pointer-events-none" style={{ scaleX }} />;
}
