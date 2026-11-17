import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const PullCordSwitch: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  return (
    <div className="room-switch fixed top-0 right-2 sm:right-4 z-50 flex flex-col items-center">
      <span className="room-switch-mount" aria-hidden="true" />
      <span className="room-switch-cord" aria-hidden="true" />
      <motion.button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Turn background lights on' : 'Turn background lights off'}
        aria-pressed={!isDark}
        title={isDark ? 'Turn background lights on' : 'Turn background lights off'}
        className="room-switch-button"
        whileTap={reducedMotion ? undefined : { y: 8 }}
        transition={{ duration: reducedMotion ? 0 : 0.15 }}
      >
        <Lightbulb size={20} strokeWidth={1.6} aria-hidden="true" />
      </motion.button>
      <span className="room-switch-label" aria-hidden="true">{isDark ? 'LIGHTS OFF' : 'LIGHTS ON'}</span>
      <span className="sr-only" role="status">{isDark ? 'Background lighting is off' : 'Background lighting is on'}</span>
    </div>
  );
};
