"use client";

import { useEffect, useRef, useState } from "react";
import type { LisaZustand } from "@/components/concierge/LisaAvatar";

/**
 * Sprechen/Tippen-Umschalter unter dem Avatar.
 *
 * Reiner UI-Entwurf: kein Mikrofonzugriff, keine Spracherkennung, kein
 * Sprachausgabe-Aufruf. "Antippen zum Sprechen" durchläuft nur eine
 * zeitgesteuerte Abfolge hört zu → denkt nach → ruhig, damit sich die
 * Bühne schon so anfühlt, wie sie sich später anfühlen soll. Echte
 * Sprach-Ein-/Ausgabe ist eine eigene, noch offene Entscheidung.
 *
 * Anders als im Referenzmuster: die Textzeile sendet sowohl über die
 * Eingabetaste als auch über den Pfeil — kein Grund, Enter wirkungslos
 * zu lassen.
 */
export function Eingabeleiste({
  onZustandChange,
  onAntwort,
}: {
  onZustandChange: (zustand: LisaZustand) => void;
  onAntwort: (text: string) => void;
}) {
  const [modus, setModus] = useState<"sprache" | "text">("sprache");
  const [beschaeftigt, setBeschaeftigt] = useState(false);
  const [text, setText] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  function ablaufStarten(nachHoeren: boolean, quelle: string) {
    setBeschaeftigt(true);
    const antwortText =
      quelle.trim().length > 0
        ? `Danke, angekommen: „${quelle.trim()}“. So fühlt sich Sprechen mit Lisa an — für eine echte Anfrage oben „Neue Anfrage“ antippen.`
        : `So fühlt sich Sprechen mit Lisa an — für eine echte Anfrage oben „Neue Anfrage“ antippen.`;

    if (nachHoeren) {
      onZustandChange("hoert");
      timers.current.push(
        setTimeout(() => {
          onZustandChange("denkt");
          timers.current.push(
            setTimeout(() => {
              onZustandChange("ruhig");
              onAntwort(antwortText);
              setBeschaeftigt(false);
            }, 900)
          );
        }, 1100)
      );
    } else {
      onZustandChange("denkt");
      timers.current.push(
        setTimeout(() => {
          onZustandChange("ruhig");
          onAntwort(antwortText);
          setBeschaeftigt(false);
        }, 700)
      );
    }
  }

  function textAbsenden() {
    if (beschaeftigt || text.trim().length === 0) return;
    const wert = text;
    setText("");
    ablaufStarten(false, wert);
  }

  return (
    <div className="lisa-eingabe">
      {modus === "sprache" ? (
        <>
          <button
            type="button"
            className="lisa-sprich-btn"
            aria-label="Antippen zum Sprechen"
            disabled={beschaeftigt}
            onClick={() => ablaufStarten(true, "")}
          >
            <span aria-hidden="true">🎙️</span>
          </button>
          <button
            type="button"
            className="lisa-tippen-btn"
            onClick={() => setModus("text")}
          >
            Stattdessen tippen
          </button>
        </>
      ) : (
        <>
          <form
            className="lisa-textzeile"
            onSubmit={(e) => {
              e.preventDefault();
              textAbsenden();
            }}
          >
            <label htmlFor="lisa-text" className="sr-only">
              An Lisa schreiben
            </label>
            <input
              id="lisa-text"
              type="text"
              placeholder="An Lisa schreiben …"
              value={text}
              disabled={beschaeftigt}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              className="lisa-textzeile-senden"
              aria-label="Senden"
              disabled={beschaeftigt || text.trim().length === 0}
            >
              <span aria-hidden="true">➤</span>
            </button>
          </form>
          <button type="button" className="lisa-tippen-btn" onClick={() => setModus("sprache")}>
            Zum Sprechen wechseln
          </button>
        </>
      )}
    </div>
  );
}
