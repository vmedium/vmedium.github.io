"use client";

import { useState, useEffect } from "react";
import { Zone } from "@/components/ui/Zone";
import styles from "./page.module.css";

const SESSION_KEY = "private_auth";

export function PrivateGate() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = process.env.NEXT_PUBLIC_PRIVATE_PASSWORD;
    if (!expected) {
      console.warn("NEXT_PUBLIC_PRIVATE_PASSWORD is not set.");
      return;
    }
    if (password === expected) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  // Avoid hydration mismatch
  if (!mounted) return null;

  if (authed) {
    return (
      <div className="container">
        <Zone index={1}>
        <div className={styles.content}>
          <header className={styles.header}>
            <span className={styles.label}>Private</span>
            <h1 className={styles.title}>Archive</h1>
          </header>
          <p className={styles.note}>
            Private content goes here. Add sections below.
          </p>
          <button
            onClick={handleSignOut}
            style={{
              marginBlockStart: "var(--space-6)",
              fontSize: "var(--text-xs)",
              letterSpacing: "var(--tracking-widest)",
              textTransform: "uppercase",
              color: "var(--color-text-subtle)",
            }}
          >
            Sign out
          </button>
        </div>
        </Zone>
      </div>
    );
  }

  return (
    <div className="container">
      <Zone index={1}>
      <div className={styles.gate}>
        <header className={styles.gateHeader}>
          <span className={styles.label}>Private</span>
          <h1 className={styles.gateTitle}>Access Required</h1>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.formLabel} htmlFor="password">
            Password
          </label>
          <div className={styles.formRow}>
            <input
              id="password"
              name="password"
              type="password"
              className={styles.input}
              autoComplete="current-password"
              autoFocus
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby={error ? "pw-error" : undefined}
            />
            <button type="submit" className={styles.submit}>
              Enter
            </button>
          </div>
          {error && (
            <p id="pw-error" className={styles.error} role="alert">
              Incorrect password.
            </p>
          )}
        </form>
      </div>
      </Zone>
    </div>
  );
}
