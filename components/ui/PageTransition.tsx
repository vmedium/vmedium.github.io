'use client';
import { motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { useTransitionState } from './TransitionProvider';
import { duration, ease } from '@/lib/motion';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isExiting } = useTransitionState();
  const displayed = useRef(children);
  const reduced = useReducedMotion();

  // Only advance displayed content when not mid-exit.
  // Prevents new content flashing inside the fading-out wrapper.
  if (!isExiting) {
    displayed.current = children;
  }

  return (
    <motion.div
      // No key prop — removing the key is the flash fix.
      // Previously, key switching (pathname → 'exit') caused React to remount children,
      // restarting CSS animations from opacity:0 while the exit fade was also running.
      animate={
        isExiting
          ? {
              opacity: 0,
              transition: {
                duration: reduced ? 0.01 : duration.pageExit,
                ease: ease.fade,
              },
            }
          : {
              opacity: 1,
              y: 0,
              transition: {
                duration: reduced ? 0.01 : duration.pageEnter,
                ease: ease.move,
              },
            }
      }
      initial={{ opacity: 0, y: reduced ? 0 : 10 }}
      style={{ pointerEvents: isExiting ? 'none' : 'auto' }}
    >
      {displayed.current}
    </motion.div>
  );
}
