'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';

type TransitionContextValue = {
  isExiting: boolean;
};

export const TransitionContext = createContext<TransitionContextValue>({
  isExiting: false,
});

export function useTransitionState() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isExiting, setIsExiting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const currentPath = useRef(pathname);

  // Keep currentPath ref in sync without triggering navigate re-creation
  currentPath.current = pathname;

  // When navigation completes, clear the exit state
  useEffect(() => {
    setIsExiting(false);
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (href === currentPath.current) return;
      clearTimeout(timer.current);
      setIsExiting(true);
      timer.current = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        router.push(href);
      }, 200); // matches --duration-page-exit
    },
    [router]
  );

  // Intercept all internal link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Pass through: external, new tab, hash, modifier keys, download
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download') ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('#')
      ) return;

      e.preventDefault();
      navigate(href);
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, [navigate]);

  return (
    <TransitionContext.Provider value={{ isExiting }}>
      {children}
    </TransitionContext.Provider>
  );
}
