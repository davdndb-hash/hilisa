"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Persistente Navigation für /lisa/…, als Schiebemenü von rechts — dieselbe
 * Bedienung wie das mobile Menü in components/Nav.tsx: Escape schließt,
 * Klick außerhalb schließt, der Fokus bleibt sichtbar.
 *
 * "Radar" ist hier absichtlich deaktiviert. Was das für unser Modell (feste
 * Begleiterin statt Nachbarschafts-Umkreis) bedeuten soll, ist noch offen —
 * siehe Rückfrage an den Auftraggeber. Kein Tooltip-only-Hinweis: der Text
 * "Bald verfügbar" steht sichtbar da, nicht nur im Hover, damit er auch am
 * Telefon und für Vorleseprogramme ankommt.
 */
export function Schiebemenue() {
  const [offen, setOffen] = useState(false);
  const pfad = usePathname();
  const box = useRef<HTMLDivElement>(null);

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

  const aktiv = (href: string) => pfad.startsWith(href);

  // Auf der Anmeldeseite gibt es noch kein Konto, für das Profil/Chats/
  // Neue Anfrage einen Sinn ergäben.
  if (pfad === "/lisa/anmelden") return null;

  return (
    <div ref={box}>
      <button
        type="button"
        className="lisa-rund-btn lisa-rund-btn-menue"
        aria-expanded={offen}
        aria-controls="lisa-menue"
        onClick={() => setOffen((o) => !o)}
      >
        <span aria-hidden="true" style={{ fontSize: 20 }}>
          {offen ? "✕" : "☰"}
        </span>
        <span className="sr-only">{offen ? "Menü schließen" : "Menü öffnen"}</span>
      </button>

      <div className="lisa-menue-overlay" data-offen={offen} aria-hidden="true" />

      <nav
        id="lisa-menue"
        aria-label="Hi Lisa Navigation"
        className="lisa-menue-panel"
        data-offen={offen}
        hidden={!offen}
      >
        <span className="label" style={{ marginTop: "var(--s3)" }}>
          Hi Lisa
        </span>

        <Link
          href="/lisa/profil"
          className="lisa-menue-item"
          aria-current={aktiv("/lisa/profil") ? "page" : undefined}
        >
          Profil
        </Link>

        <span className="lisa-menue-item" aria-disabled="true">
          Radar
          <span className="lisa-menue-item-hinweis">Bald verfügbar</span>
        </span>

        <Link
          href="/lisa/chats"
          className="lisa-menue-item"
          aria-current={aktiv("/lisa/chats") ? "page" : undefined}
        >
          Chats
        </Link>

        <Link
          href="/lisa/neu"
          className="lisa-menue-item"
          aria-current={aktiv("/lisa/neu") ? "page" : undefined}
        >
          Neue Anfrage
        </Link>
      </nav>
    </div>
  );
}
