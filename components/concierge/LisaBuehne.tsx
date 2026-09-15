"use client";

import { useState } from "react";
import { LisaAvatar, type LisaZustand } from "@/components/concierge/LisaAvatar";
import { Vorschlagschips } from "@/components/concierge/Vorschlagschips";
import { Eingabeleiste } from "@/components/concierge/Eingabeleiste";

/**
 * Der Startbildschirm unter /lisa: Avatar, Begrüßung, die beiden Einstiege
 * und der Sprechen/Tippen-Umschalter. Eine Client-Insel, weil der Zustand
 * (ruhig/hört/denkt) zwischen Avatar und Eingabeleiste geteilt wird — der
 * Rest der Seite (Kopf, Menü) bleibt außerhalb dieser Komponente.
 */
export function LisaBuehne() {
  const [zustand, setZustand] = useState<LisaZustand>("ruhig");
  const [antwort, setAntwort] = useState<string | null>(null);

  return (
    <div className="lisa-buehne">
      <div aria-live="polite" aria-atomic="true" style={{ display: "contents" }}>
        <LisaAvatar zustand={zustand} />
      </div>

      <div className="lisa-sprechblase">
        <p style={{ margin: 0, fontSize: 19 }}>
          Hallo! Ich bin Lisa. Ich helfe dir, eine Begleiterin zu finden oder eine neue
          Anfrage zu stellen.
        </p>
        <Vorschlagschips />
      </div>

      <Eingabeleiste
        onZustandChange={setZustand}
        onAntwort={(t) => setAntwort(t)}
      />

      <div aria-live="polite" aria-atomic="true">
        {antwort ? <p className="lisa-antwort">{antwort}</p> : null}
      </div>
    </div>
  );
}
