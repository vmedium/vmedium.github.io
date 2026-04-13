"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./DebugPanel.module.css";

interface Measurement {
  label: string;
  width: number;
  height?: number;
  span?: number;
  x?: number;
  extra?: string;
}

function getProp(prop: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(prop)
    .trim();
}

function pxToNum(val: string): number {
  const el = document.createElement("div");
  el.style.width = val;
  el.style.position = "absolute";
  el.style.visibility = "hidden";
  document.body.appendChild(el);
  const w = el.getBoundingClientRect().width;
  document.body.removeChild(el);
  return w;
}

function measure(): Measurement[] {
  const results: Measurement[] = [];
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  results.push({ label: "Viewport", width: vw, height: vh });

  // Container
  const containers = document.querySelectorAll<HTMLElement>(".container");
  if (containers.length > 0) {
    const r = containers[0].getBoundingClientRect();
    const marginInline = (vw - r.width) / 2;
    results.push({
      label: "Container",
      width: Math.round(r.width),
      extra: `margin ${Math.round(marginInline)}px each side`,
    });
  }

  // Computed grid values from tokens
  const gutterRaw = getProp("--grid-gutter");
  const gutter = pxToNum(gutterRaw);
  const containerWidth = containers.length > 0
    ? containers[0].getBoundingClientRect().width
    : vw;
  const colWidth = (containerWidth - 11 * gutter) / 12;

  results.push({
    label: "Grid gutter",
    width: Math.round(gutter * 100) / 100,
    extra: `token: ${gutterRaw}`,
  });
  results.push({
    label: "1 column",
    width: Math.round(colWidth * 100) / 100,
    extra: `(container − 11×gutter) ÷ 12`,
  });

  // Span widths
  [3, 4, 6, 8, 12].forEach((span) => {
    const w = colWidth * span + gutter * (span - 1);
    results.push({
      label: `${span}-col span`,
      width: Math.round(w * 100) / 100,
      span,
    });
  });

  // All project cards
  const cards = document.querySelectorAll<HTMLElement>("[data-span]");
  if (cards.length > 0) {
    results.push({ label: "── Cards ──", width: 0 });
    cards.forEach((card) => {
      const r = card.getBoundingClientRect();
      const span = card.dataset.span;
      const titleEl = card.querySelector("h2");
      const title = titleEl?.textContent?.slice(0, 24) ?? "card";
      results.push({
        label: title,
        width: Math.round(r.width),
        height: Math.round(r.height),
        span: span ? parseInt(span) : undefined,
        x: Math.round(r.left),
      });
    });
  }

  return results;
}

export function DebugPanel() {
  const [open, setOpen] = useState(false);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [ghostOpacity, setGhostOpacity] = useState(5);
  const [overlayOpacity, setOverlayOpacity] = useState(100);
  const rafRef = useRef<number | null>(null);

  const refresh = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setMeasurements(measure());
    });
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--debug-ghost-opacity",
      String(ghostOpacity / 100)
    );
  }, [ghostOpacity]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--debug-overlay-opacity",
      String(overlayOpacity / 100)
    );
  }, [overlayOpacity]);

  useEffect(() => {
    if (open) {
      document.documentElement.setAttribute("data-debug", "");
    } else {
      document.documentElement.removeAttribute("data-debug");
    }
    if (!open) return;
    refresh();
    const ro = new ResizeObserver(refresh);
    ro.observe(document.documentElement);
    window.addEventListener("scroll", refresh, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", refresh);
      document.documentElement.removeAttribute("data-debug");
    };
  }, [open, refresh]);

  return (
    <>
      {/* Permanent ghost grid — always visible, gutter hairlines only */}
      {/* Each hairline explicitly placed in a gutter track (even tracks: 2,4,6...22) */}
      <div className={styles.ghostGrid} aria-hidden="true">
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className={styles.ghostGutter}
            style={{ gridColumn: (i + 1) * 2 }}
          />
        ))}
      </div>

      {/* Toggle button */}
      <button
        className={`${styles.trigger} ${open ? styles.triggerActive : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle debug panel"
      >
        GRID
      </button>

      {/* Panel */}
      {open && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Debug</span>
            <button className={styles.refreshBtn} onClick={refresh}>
              Refresh
            </button>
          </div>

          <div className={styles.sliders}>
            <div className={styles.sliderRow}>
              <div className={styles.sliderLabel}>
                <span>Background grid</span>
                <span className={styles.sliderValue}>{ghostOpacity}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={ghostOpacity}
                onChange={(e) => setGhostOpacity(Number(e.target.value))}
                className={styles.sliderInput}
              />
            </div>
            <div className={styles.sliderRow}>
              <div className={styles.sliderLabel}>
                <span>Card overlay grid</span>
                <span className={styles.sliderValue}>{overlayOpacity}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                className={styles.sliderInput}
              />
            </div>
          </div>

          <div className={styles.table}>
            {measurements.map((m, i) => {
              const isSeparator = m.width === 0 && m.label.startsWith("──");
              if (isSeparator) {
                return (
                  <div key={i} className={styles.separator}>
                    {m.label}
                  </div>
                );
              }
              return (
                <div key={i} className={styles.row}>
                  <span className={styles.rowLabel}>
                    {m.label}
                    {m.span !== undefined && (
                      <span className={styles.spanBadge}>×{m.span}</span>
                    )}
                  </span>
                  <span className={styles.rowValue}>
                    {m.width}
                    {m.height !== undefined ? ` × ${m.height}` : ""}
                    <span className={styles.unit}>px</span>
                    {m.extra && (
                      <span className={styles.rowExtra}>{m.extra}</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
