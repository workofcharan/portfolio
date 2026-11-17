import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
interface BlurRevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}
const headings = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, span: motion.span };

export const BlurRevealText: React.FC<BlurRevealTextProps> = ({ text, className = '', delay = 0, as = 'h2' }) => {
  const reducedMotion = useReducedMotion();
  const Component = headings[as];
  return (
    <Component className={`editorial-heading ${className}`} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.035, delayChildren: reducedMotion ? 0 : delay } } }}>
      {text.split(' ').map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <motion.span className="inline-block" variants={{ hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 14 }, visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.45, ease: 'easeOut' } } }}>{word}</motion.span>{' '}
        </React.Fragment>
      ))}
    </Component>
  );
};
