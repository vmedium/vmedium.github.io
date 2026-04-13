'use client';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { useTransitionState } from './TransitionProvider';
import styles from './PageTransition.module.css';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isExiting } = useTransitionState();
  const displayed = useRef(children);

  // Synchronous ref update — only advances when not mid-exit.
  // Prevents new content flashing inside the .exiting div before isExiting clears.
  if (!isExiting) {
    displayed.current = children;
  }

  return (
    <div
      key={isExiting ? 'exit' : pathname}
      className={isExiting ? styles.exiting : styles.entering}
    >
      {displayed.current}
    </div>
  );
}
