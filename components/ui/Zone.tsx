'use client';
import { motion, useReducedMotion } from 'motion/react';
import { duration, ease, stagger } from '@/lib/motion';

interface ZoneProps {
  children: React.ReactNode;
  /** Stagger index — maps to --stagger-1 through --stagger-4 delays */
  index?: 1 | 2 | 3 | 4;
  className?: string;
}

export function Zone({ children, index = 1, className }: ZoneProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0.01 : duration.pageEnter,
        ease: ease.move,
        delay: reduced ? 0 : stagger[index],
      }}
    >
      {children}
    </motion.div>
  );
}
