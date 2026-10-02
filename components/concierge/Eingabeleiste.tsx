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
  // Derselbe Zustand, der nach oben gemeldet wird, nochmal lokal — der
  // Sprechknopf färbt sich darüber ein (.lisa-sprich-btn[data-zustand]).
  // Die Regel stand schon im CSS, nur hat sie nie jemand gesetzt.
  const [zustand, setZustand] = useState<LisaZustand>("ruhig");
  const [text, setText] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  function melden(neu: LisaZustand) {
    setZustand(neu);
    onZustandChange(neu);
  }

  function ablaufStarten(nachHoeren: boolean, quelle: string) {
    setBeschaeftigt(true);
    const antwortText =
      quelle.trim().length > 0
        ? `Angekommen: „${quelle.trim()}“. Beantworten kann Lisa das noch nicht — für eine echte Anfrage unten „Neue Anfrage“ antippen.`
        : `So soll sich Sprechen mit Lisa später anfühlen. Für eine echte Anfrage unten „Neue Anfrage“ antippen.`;

    if (nachHoeren) {
      melden("hoert");
      timers.current.push(
        setTimeout(() => {
          melden("denkt");
          timers.current.push(
            setTimeout(() => {
              melden("ruhig");
              onAntwort(antwortText);
              setBeschaeftigt(false);
            }, 900)
          );
        }, 1100)
      );
    } else {
      melden("denkt");
      timers.current.push(
        setTimeout(() => {
          melden("ruhig");
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
            data-zustand={zustand}
            aria-label="Vorschau antippen — Sprechen ist noch nicht eingebaut"
            disabled={beschaeftigt}
            onClick={() => ablaufStarten(true, "")}
          >
            <span aria-hidden="true">🎙️</span>
          </button>
          {/* Der Knopf sah bis zum 2.10.2026 aus wie ein funktionierendes
              Mikrofon und hieß auch so. Er nimmt aber nichts auf: es gibt
              keinen Mikrofonzugriff, keine Spracherkennung und kein Modell
              dahinter, nur eine zeitgesteuerte Abfolge. Dass das eine
              Vorschau ist, muss sichtbar dastehen und nicht nur im
              aria-label — sonst wartet jemand darauf, dass Lisa antwortet. */}
          <p className="lisa-vorschau-hinweis">
            Sprechen ist noch nicht eingebaut — das hier zeigt nur, wie es
            später aussehen soll.
          </p>
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
