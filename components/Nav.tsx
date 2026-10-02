"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { KONTAKT } from "@/lib/kontakt";

/**
 * Kopfzeile.
 *
 * Neuplanung 22.9.2026 (HiLisa_Startseite und Navigation.docx): Reihenfolge
 * und Auswahl kommen jetzt komplett aus dem Dokument statt aus einer eigenen
 * Abwägung — Leistungen (was bieten wir an?) → Begleiter finden (Hauptpfad,
 * führt zu Umsatz) → Über uns (Vertrauensanker kurz vor der Entscheidung) →
 * Begleiter werden (andere Zielgruppe, konkurriert nicht mit dem CTA, bleibt
 * aber auffindbar). Für Einrichtungen ist damit aus der Hauptnavigation raus
 * (weiterhin über die Fußzeile erreichbar, siehe layout.tsx) — das Dokument
 * nennt keinen Enterprise-Punkt mehr.
 *
 * Alle vier Ziele sind mit führendem "/" verlinkt (auch die Anker), damit
 * dieselbe Nav auf jeder Seite funktioniert: von der Startseite aus ein
 * normaler Sprung, von einer Unterseite aus Navigation zur Startseite plus
 * Sprung zum Anker. Das ersetzt den früheren Umschalter zwischen ABSCHNITTE
 * (nur Startseite) und LINKS (nur Unterseiten) — eine Struktur für beide
 * Fälle statt zwei parallele.
 *
 * "Über uns" zeigt vorerst auf eine Platzhalter-Section (siehe app/page.tsx,
 * #ueber-uns) — das Dokument selbst nennt den Ziel-Anker als offenen Punkt
 * ("Ziel-Anker der Nav-Links klären") und verschiebt Wording auf später
 * ("Struktur zuerst, Wording danach").
 */

const NAV_LINKS = [
  { href: "/#leistungen", text: "Leistungen" },
  { href: "/#rueckruf", text: "Begleiter finden" },
  { href: "/#ueber-uns", text: "Über uns" },
  { href: "/mitarbeiten", text: "Begleiter werden" },
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

  const aktiv = (href: string) => !href.includes("#") && href !== "/" && pfad.startsWith(href);

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
            {NAV_LINKS.map((n) => (
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

          {/* CTA in der Nav (Dokument: "beide zeigen") — Rückruf anfordern ist jetzt
              der primäre, auffällige Button; die Nummer daneben eine dezentere
              Zweitoption für alle, die lieber direkt anrufen. Auf dem Telefon bleibt
              aus Platzgründen nur der Rückruf-Button in der Kopfzeile (bei 390 px passen
              Marke, zwei Buttons und Menütaste nicht in eine Zeile) — die Nummer steht
              dort weiterhin oben im aufklappbaren Menü, einen Tap entfernt. */}
          <a className="btn btn-accent" href="/#rueckruf" style={{ whiteSpace: "nowrap" }}>
            <span className="tel-lang">Rückruf anfordern</span>
            <span className="tel-kurz">Rückruf</span>
          </a>
          <a
            href={KONTAKT.telefonHref}
            aria-label={`Anrufen: ${KONTAKT.telefonAnzeige}`}
            className="nav-tel-sekundaer"
          >
            <span aria-hidden="true" style={{ marginRight: 6 }}>
              ✆
            </span>
            {KONTAKT.telefonKurz}
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
            href={KONTAKT.telefonHref}
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
            {KONTAKT.telefonAnzeige}
          </a>
          {NAV_LINKS.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={aktiv(n.href) ? "page" : undefined}
              onClick={() => setOffen(false)}
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
