import type { Metadata } from "next";
import { Schiebemenue } from "@/components/concierge/Schiebemenue";

export const metadata: Metadata = {
  title: "Ask Lisa",
};

/**
 * Eigene Schale für den Ask-Lisa-Bereich — kein Marketing-Header, keine
 * Fußzeile (siehe .lisa-schale in globals.css, gleiche Technik wie .blatt).
 * Persistent auf jedem /lisa/…-Bildschirm: das Schiebemenü unten rechts.
 *
 * Das Referenzmuster hat oben rechts zusätzlich einen Verlauf vergangener
 * Gespräche mit dem Assistenten selbst (getrennt vom Chat mit der
 * Begleiterin). Bewusst nicht gebaut — war nicht Teil der fünf verabredeten
 * Bildschirme, und ein Icon-Button ohne Ziel lässt sich nicht sauber
 * barrierefrei als "bald verfügbar" markieren (kein Platz für eine sichtbare
 * Bildunterschrift wie beim Radar-Eintrag im Menü). Kommt mit einem echten
 * Verlauf-Bildschirm nach, nicht vorher.
 */
export default function LisaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lisa-schale">
      {children}
      <Schiebemenue />
    </div>
  );
}
