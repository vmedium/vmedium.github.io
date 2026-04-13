"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ui/ThemeProvider";
import styles from "./Nav.module.css";

const links = [
  { href: "/work",        label: "Work" },
  { href: "/projects",    label: "Projects" },
  { href: "/experiments", label: "Experiments" },
  { href: "/blog",        label: "Writing" },
  { href: "/about",       label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <header className={`${styles.header}${scrolled ? ` ${styles.scrolled}` : ""}`}>
      <nav className={`${styles.nav} container`}>
        <Link href="/" className={styles.logo}>
          JT DiMartile
        </Link>

        <ul className={styles.links}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.link} ${pathname.startsWith(href) ? styles.active : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={styles.modeToggle}
          onClick={toggle}
          aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
        >
          {resolvedTheme === "dark" ? "Light" : "Dark"}
        </button>
      </nav>
    </header>
  );
}
