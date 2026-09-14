"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Kleine Client-Insel nur für den Hero-Titel der Startseite. Der Rest von
 * Hero/Bausteine.tsx bleibt Server Component — nur dieser Titel braucht
 * einen Browser-Effekt (IntersectionObserver gibt es nicht serverseitig).
 *
 * Löst einmalig ein kurzes Auftauch-Effekt aus, sobald "Hi Lisa!" in den
 * sichtbaren Bereich kommt (Laden der Seite zählt dafür, weil der Hero ganz
 * oben steht). Kein Dauerloop, kein Zurücksetzen beim Wegscrollen — einmal
 * gesehen, bleibt es sichtbar. .hero-title-pop selbst kümmert sich um
 * prefers-reduced-motion (siehe globals.css).
 */
export function HeroTitlePop({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`hero-title-pop${visible ? " is-visible" : ""}`}>
      {children}
    </span>
  );
}
