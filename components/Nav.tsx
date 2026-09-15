"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";

/**
 * Kopfzeile.
 *
 * Seit 15.9.2026 (Abgleich mit hilisa-startseite-stand.docx) wieder zwei
 * Links: die Info-Seite und Für Einrichtungen — Enterprise kommt mit dem
 * neuen Zielgruppen-Teaser auf der Startseite zurück in die Hauptnavigation.
 * Mitarbeiten steht weiterhin bewusst nicht hier — das ist keine
 * Kundennavigation, sondern eine Bewerberinnen-Seite, und bleibt in der
 * Fußzeile (siehe layout.tsx).
 *
 * Auf der Startseite ersetzen die Abschnitts-Sprunglinks (ABSCHNITTE) die
 * beiden LINKS oben im selben Platz — bewusst kein zweiter Zeile darunter
 * (das sah wie zwei gestapelte Navigationsleisten aus). So funktioniert's/
 * Für Einrichtungen bleiben trotzdem erreichbar, nur eben über die Fußzeile,
 * solange man auf der Startseite ist. "Für wen" und "Wusstest du?" sind als
 * Pille hervorgehoben (echte Klickziele: Zielgruppen-Karten bzw.
 * Pflegekassen-Erklärung), die übrigen vier bleiben Textlinks.
 */

const LINKS = [
  { href: "/care", text: "So funktioniert's" },
  { href: "/fuer-betriebe", text: "Für Einrichtungen" },
];

const ABSCHNITTE = [
  { href: "#werteversprechen", text: "Warum Hi Lisa" },
  { href: "#leistungen", text: "Leistungen" },
  { href: "#zielgruppen", text: "Für wen", highlight: true },
  { href: "#vertrauen", text: "Vertrauen" },
  { href: "#wusstest-du", text: "Wusstest du?", highlight: true },
  { href: "#ablauf", text: "Ablauf" },
];

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
  const istStartseite = pfad === "/";

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
            {istStartseite
              ? ABSCHNITTE.map((a) => (
                  <a
                    key={a.href}
                    href={a.href}
                    className={a.highlight ? "abschnittsnav-link is-highlight" : "abschnittsnav-link"}
                  >
                    {a.text}
                  </a>
                ))
              : LINKS.map((n) => (
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
          {istStartseite
            ? ABSCHNITTE.map((a) => (
                <a
                  key={a.href}
                  href={a.href}
                  onClick={() => setOffen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: 56,
                    fontSize: 20,
                    fontWeight: a.highlight ? 800 : 700,
                    color: a.highlight ? "var(--olive-ink)" : undefined,
                    textDecoration: "none",
                    borderBottom: "1px solid var(--rule-soft)",
                  }}
                >
                  {a.text}
                </a>
              ))
            : LINKS.map((n) => (
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
