"use client";

import Link from "next/link";
import { useState } from "react";
import { ZWEIGE, type ZweigId } from "@/lib/zweige";

/**
 * Modell-Finder.
 *
 * Drei Zweige sind für eine Besucherin zwei zu viel. Der Finder stellt zwei
 * Fragen und nennt dann einen Weg — nicht drei Optionen mit Vergleichstabelle.
 *
 * Bedienung: echte Radioschaltflächen in einer fieldset/legend-Gruppe, damit
 * Pfeiltasten und Vorleseprogramme funktionieren. Kein Klick-Div.
 * Das Ergebnis erscheint in einem Bereich mit aria-live, damit es auch
 * angekündigt wird, wenn man es nicht sehen kann.
 */

type FuerWen = "" | "angehoeriger" | "selbst" | "betrieb";
type Grad = "" | "ja" | "beantragt" | "nein" | "unklar";

const OPTIONEN_WEN: { wert: Exclude<FuerWen, "">; text: string; hilfe: string }[] = [
  { wert: "angehoeriger", text: "Für meine Mutter, meinen Vater oder Angehörige", hilfe: "Der häufigste Fall." },
  { wert: "selbst", text: "Für mich selbst", hilfe: "Du suchst Begleitung für dich." },
  { wert: "betrieb", text: "Für einen Betrieb oder eine Einrichtung", hilfe: "Betreutes Wohnen, Genossenschaft, Klinik, Pflegedienst." },
];

const OPTIONEN_GRAD: { wert: Exclude<Grad, "">; text: string }[] = [
  { wert: "ja", text: "Ja, es gibt einen Pflegegrad" },
  { wert: "beantragt", text: "Beantragt, noch keine Entscheidung" },
  { wert: "nein", text: "Nein, keinen" },
  { wert: "unklar", text: "Weiß ich nicht" },
];

function ergebnis(wen: FuerWen, grad: Grad): { zweig: ZweigId; grund: string } | null {
  if (wen === "betrieb") {
    return {
      zweig: "enterprise",
      grund:
        "Sie wollen Begleitung für mehrere Menschen an einem Ort organisieren. Das ist Enterprise — Sie stellen Ihr Personal ein, wir bringen Konzept, Schulung und Anerkennung.",
    };
  }
  if (wen === "" || grad === "") return null;

  if (grad === "ja") {
    return {
      zweig: "care",
      grund:
        "Mit Pflegegrad stehen mindestens 131 Euro im Monat zur Verfügung, die die Kasse zahlt. Fang damit an — es kostet dich nichts. Wenn mehr Stunden gebraucht werden, buchst du sie später privat dazu.",
    };
  }
  if (grad === "beantragt" || grad === "unklar") {
    return {
      zweig: "care",
      grund:
        "Vermutlich Care. Wir prüfen im Erstgespräch, ob ein Antrag Sinn ergibt oder schon läuft — schon Pflegegrad 1 reicht für das Geld der Kasse. Bis zur Entscheidung kannst du privat starten.",
    };
  }
  return {
    zweig: "privat",
    grund:
      "Ohne Pflegegrad zahlt die Kasse nichts. Bei Privat brauchst du keinen Antrag und keine Begutachtung — du buchst die Stunden, die du willst, und kannst monatlich kündigen.",
  };
}

const boxStil: React.CSSProperties = {
  border: 0,
  padding: 0,
  margin: "0 0 var(--s9)",
};

function Auswahl({
  name,
  legende,
  optionen,
  wert,
  setWert,
  nummer,
}: {
  name: string;
  legende: string;
  optionen: { wert: string; text: string; hilfe?: string }[];
  wert: string;
  setWert: (w: string) => void;
  nummer: number;
}) {
  return (
    <fieldset style={boxStil}>
      <legend style={{ padding: 0, marginBottom: "var(--s4)" }}>
        <span className="label" style={{ marginBottom: 4 }}>
          Frage {nummer}
        </span>
        <span style={{ fontWeight: 800, fontSize: 21, lineHeight: 1.3, display: "block" }}>
          {legende}
        </span>
      </legend>

      <div style={{ display: "grid", gap: "var(--s3)" }}>
        {optionen.map((o) => {
          const gewaehlt = wert === o.wert;
          return (
            <label
              key={o.wert}
              style={{
                display: "grid",
                gridTemplateColumns: "28px 1fr",
                gap: "var(--s3)",
                alignItems: "start",
                minHeight: 56,
                padding: "var(--s4)",
                cursor: "pointer",
                background: gewaehlt ? "var(--light-olive)" : "var(--paper)",
                border: `2px solid ${gewaehlt ? "var(--olive)" : "var(--rule)"}`,
                borderRadius: "var(--r-control)",
              }}
            >
              <input
                type="radio"
                name={name}
                value={o.wert}
                checked={gewaehlt}
                onChange={() => setWert(o.wert)}
                style={{ width: 22, height: 22, minHeight: 0, margin: "3px 0 0", accentColor: "var(--olive)" }}
              />
              <span>
                <span style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.4 }}>{o.text}</span>
                {o.hilfe ? (
                  <span style={{ display: "block", fontSize: 16, color: "var(--ink-55)", marginTop: 2 }}>
                    {o.hilfe}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function ModellFinder() {
  const [wen, setWen] = useState<FuerWen>("");
  const [grad, setGrad] = useState<Grad>("");

  const gradNoetig = wen === "angehoeriger" || wen === "selbst";
  const treffer = ergebnis(wen, gradNoetig ? grad : "ja");
  const zeigen = wen === "betrieb" || (gradNoetig && grad !== "");

  return (
    <div className="card" style={{ padding: "clamp(20px, 4vw, 36px)" }}>
      <h3 style={{ fontSize: 22, marginBottom: "var(--s2)" }}>Welches Modell passt?</h3>
      <p style={{ color: "var(--ink-70)", fontSize: 18, marginBottom: "var(--s9)" }}>
        Zwei Fragen. Danach weißt du, welcher der drei Wege gemeint ist — und was er kostet.
      </p>

      <Auswahl
        nummer={1}
        name="finder-wen"
        legende="Für wen suchst du Begleitung?"
        optionen={OPTIONEN_WEN}
        wert={wen}
        setWert={(w) => {
          setWen(w as FuerWen);
          if (w === "betrieb") setGrad("");
        }}
      />

      {gradNoetig ? (
        <Auswahl
          nummer={2}
          name="finder-grad"
          legende="Gibt es einen Pflegegrad?"
          optionen={OPTIONEN_GRAD}
          wert={grad}
          setWert={(w) => setGrad(w as Grad)}
        />
      ) : null}

      <div aria-live="polite" aria-atomic="true">
        {zeigen && treffer ? (
          <div
            className="surface-olive"
            style={{ padding: "clamp(20px, 4vw, 32px)", borderRadius: "var(--r-card)" }}
          >
            <span className="label on-olive">Unser Vorschlag</span>
            <p
              className="display"
              style={{
                color: "var(--paper)",
                fontSize: "clamp(26px, 4vw, 34px)",
                lineHeight: 1.15,
                margin: "0 0 var(--s4)",
              }}
            >
              {ZWEIGE[treffer.zweig].name}
            </p>
            <p style={{ color: "var(--on-olive-soft)", fontSize: 18 }}>{treffer.grund}</p>
            <div className="stack-cta" style={{ marginTop: "var(--s6)" }}>
              <Link className="btn btn-accent" href={ZWEIGE[treffer.zweig].href}>
                {ZWEIGE[treffer.zweig].name} ansehen
              </Link>
              <a
                className="btn btn-outline"
                href="tel:+4989000000"
                style={{ color: "var(--paper)", borderColor: "var(--paper)" }}
              >
                Lieber anrufen
              </a>
            </div>
            <p
              style={{
                marginTop: "var(--s6)",
                marginBottom: 0,
                fontSize: 16,
                color: "var(--on-olive-soft)",
              }}
            >
              Das ist ein Vorschlag, keine Zusage. Am Telefon rechnen wir es für den
              konkreten Fall durch.
            </p>
          </div>
        ) : (
          <p style={{ color: "var(--ink-55)", fontSize: 17, marginBottom: 0 }}>
            Sobald beide Fragen beantwortet sind, steht hier der Vorschlag.
          </p>
        )}
      </div>
    </div>
  );
}
