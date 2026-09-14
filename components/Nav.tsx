"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";

/**
 * Kopfzeile.
 *
 * Seit 14.9.2026 Care-only: nur noch ein Link zur Info-Seite. Mitarbeiten steht
 * bewusst nicht mehr hier — das ist keine Kundennavigation, sondern eine
 * Bewerberinnen-Seite, und findet sich in der Fußzeile.
 *
 * Bedienregeln: Schaltfläche 52 px hoch, aria-expanded, Escape schließt,
 * Klick außerhalb schließt, der Fokus bleibt sichtbar. Kein Overlay über den
 * ganzen Bildschirm — das verwirrt mehr, als es hilft.
 */

const LINKS = [{ href: "/care", text: "So funktioniert's" }];

export default function Nav() {
  const [offen, setOffen] = useState(false);
  const pfad = usePathname();
  const box = useRef<HTMLDivElement>(null);

  // Seitenwechsel schließt das Menü
  useEffect(() => setOffen(false), [pfad]);

  useEffect(() => {
    if (!offen) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOffen(false);
    };
    const draussen = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOffen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("mousedown", draussen);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("mousedown", draussen);
    };
  }, [offen]);

  const aktiv = (href: string) => href !== "/" && pfad.startsWith(href);

  return (
    <header
      ref={box}
      style={{
        borderBottom: "1px solid var(--rule)",
        background: "var(--paper)",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--s4)",
          paddingTop: "var(--s3)",
          paddingBottom: "var(--s3)",
        }}
      >
        <Link href="/" aria-label="Hi Lisa — Startseite" style={{ textDecoration: "none" }}>
          <Logo variant="paper" size={38} />
        </Link>

        <nav aria-label="Hauptnavigation" style={{ display: "flex", gap: "var(--s4)", alignItems: "center" }}>
          <span className="nav-links">
            {LINKS.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={aktiv(n.href) ? "page" : undefined}
                style={{
                  fontSize: 17,
                  fontWeight: aktiv(n.href) ? 800 : 500,
                  textDecoration: aktiv(n.href) ? "underline" : "none",
                  textDecorationColor: "var(--olive)",
                  textDecorationThickness: 3,
                }}
              >
                {n.text}
              </Link>
            ))}
          </span>

          {/* Bei 390 px Breite passen Marke, volle Nummer und Menütaste nicht in eine
              Zeile — die Menütaste rutschte aus dem Bild. Auf dem Telefon steht daher
              „Anrufen" auf der Taste; die Nummer selbst steht im Menü und gleich
              darunter im ersten Block, also ohne Scrollen. Der Anruf löst in beiden
              Fällen dieselbe tel:-Verknüpfung aus. */}
          <a
            className="btn btn-accent"
            href="tel:+4989000000"
            aria-label="Anrufen: 089 — Nummer eintragen"
            style={{ whiteSpace: "nowrap" }}
          >
            <span aria-hidden="true" style={{ marginRight: 8, fontSize: 18 }}>
              ✆
            </span>
            <span className="tel-lang">089 — Nummer</span>
            <span className="tel-kurz">Anrufen</span>
          </a>

          {/* Nur auf dem Telefon: das Menü. Am Rechner stehen die Links offen da. */}
          <button
            type="button"
            className="btn btn-outline nav-toggle"
            aria-expanded={offen}
            aria-controls="menue"
            onClick={() => setOffen((o) => !o)}
            style={{ paddingLeft: "var(--s4)", paddingRight: "var(--s4)" }}
          >
            <span aria-hidden="true" style={{ fontSize: 20, lineHeight: 1 }}>
              {offen ? "✕" : "☰"}
            </span>
            <span className="sr-only">{offen ? "Menü schließen" : "Menü öffnen"}</span>
          </button>
        </nav>
      </div>

      {/* Das Menü liegt unter der Kopfzeile, nicht darüber. */}
      <div
        id="menue"
        hidden={!offen}
        className="nav-panel"
        style={{ borderTop: "1px solid var(--rule)", background: "var(--paper)" }}
      >
        <div className="wrap" style={{ paddingTop: "var(--s3)", paddingBottom: "var(--s6)" }}>
          <a
            href="tel:+4989000000"
            style={{
              display: "flex",
              alignItems: "center",
              minHeight: 56,
              fontSize: 20,
              fontWeight: 800,
              textDecoration: "none",
              borderBottom: "1px solid var(--rule-soft)",
            }}
          >
            <span aria-hidden="true" style={{ marginRight: 10 }}>
              ✆
            </span>
            089 — Nummer eintragen
          </a>
          {LINKS.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={aktiv(n.href) ? "page" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: 56,
                fontSize: 20,
                fontWeight: 700,
                textDecoration: "none",
                borderBottom: "1px solid var(--rule-soft)",
              }}
            >
              {n.text}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
