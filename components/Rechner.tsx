"use client";

import { useState } from "react";

/**
 * Der Rechner ist der wichtigste Baustein der Seite: Er macht aus einem
 * abstrakten Anspruch eine Zahl, die man sieht.
 *
 * Sprache nach Brand Guide 05: Duzen, kurze Sätze, keine Fachbegriffe.
 * Also „Deine Pflegekasse zahlt 131 Euro im Monat" — nicht die Paragrafen.
 */

const PRO_MONAT = 131;
const PRO_JAHR = PRO_MONAT * 12; // 1.572

type Grad = "" | "keiner" | "unbekannt" | "1" | "2" | "3" | "4" | "5";
type Seit = "" | "dieses-jahr" | "letztes-jahr" | "laenger";
type Genutzt = "" | "nie" | "manchmal" | "regelmaessig";

function euro(n: number) {
  return n.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " €";
}

export default function Rechner() {
  const [grad, setGrad] = useState<Grad>("");
  const [seit, setSeit] = useState<Seit>("");
  const [genutzt, setGenutzt] = useState<Genutzt>("");

  const fertig = grad !== "" && seit !== "" && genutzt !== "";
  const hatGrad = ["1", "2", "3", "4", "5"].includes(grad);

  // Was in diesem Jahr noch offen ist
  const anteilOffen = genutzt === "nie" ? 1 : genutzt === "manchmal" ? 0.5 : 0.15;
  const diesesJahr = Math.round((PRO_JAHR * anteilOffen) / 10) * 10;

  // Guthaben aus dem Vorjahr verfällt am 30. Juni
  const vorjahrMoeglich = genutzt === "nie" && (seit === "letztes-jahr" || seit === "laenger");
  const vorjahr = vorjahrMoeglich ? PRO_JAHR : 0;

  const gesamt = diesesJahr + vorjahr;
  const mehrAbGrad2 = ["2", "3", "4", "5"].includes(grad);

  return (
    <div className="card" style={{ borderRadius: "var(--r-surface)", padding: "var(--s9)" }}>
      <span className="label">In 30 Sekunden</span>
      <h2>Was zahlt die Pflegekasse für dich?</h2>
      <p style={{ color: "var(--ink-70)" }}>
        Drei Fragen. Wir speichern nichts davon.
      </p>

      <div style={{ marginTop: "var(--s6)" }}>
        <label className="field" htmlFor="grad">
          1. Hat die Person, um die es geht, einen Pflegegrad?
        </label>
        <select id="grad" value={grad} onChange={(e) => setGrad(e.target.value as Grad)}>
          <option value="">Bitte auswählen</option>
          <option value="1">Pflegegrad 1</option>
          <option value="2">Pflegegrad 2</option>
          <option value="3">Pflegegrad 3</option>
          <option value="4">Pflegegrad 4</option>
          <option value="5">Pflegegrad 5</option>
          <option value="keiner">Noch keinen</option>
          <option value="unbekannt">Weiß ich nicht</option>
        </select>

        <label className="field" htmlFor="seit">
          2. Seit wann gibt es den Pflegegrad?
        </label>
        <select id="seit" value={seit} onChange={(e) => setSeit(e.target.value as Seit)}>
          <option value="">Bitte auswählen</option>
          <option value="dieses-jahr">Seit diesem Jahr</option>
          <option value="letztes-jahr">Seit letztem Jahr</option>
          <option value="laenger">Schon länger</option>
        </select>

        <label className="field" htmlFor="genutzt">
          3. Habt ihr das Geld für Betreuung schon genutzt?
        </label>
        <select
          id="genutzt"
          value={genutzt}
          onChange={(e) => setGenutzt(e.target.value as Genutzt)}
        >
          <option value="">Bitte auswählen</option>
          <option value="nie">Nein, noch nie</option>
          <option value="manchmal">Ab und zu</option>
          <option value="regelmaessig">Ja, regelmäßig</option>
        </select>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={fertig ? "card-quiet card" : ""}
        style={fertig ? { marginTop: "var(--s4)" } : { marginTop: 0 }}
      >
        {!fertig && (
          <p className="hint" style={{ margin: 0 }}>
            Beantworte alle drei Fragen, dann rechnen wir.
          </p>
        )}

        {fertig && hatGrad && (
          <>
            <span className="big-number mono-num" style={{ color: "var(--ink)" }}>
              bis zu {euro(gesamt)}
            </span>
            <p style={{ marginTop: "var(--s3)", fontWeight: 500 }}>
              stehen dir gerade zur Verfügung. Deine Pflegekasse zahlt {PRO_MONAT} Euro im
              Monat für Begleitung und Hilfe im Haushalt.
            </p>
            {vorjahr > 0 && (
              <p style={{ fontWeight: 800 }}>
                Davon sind {euro(vorjahr)} aus dem letzten Jahr. Dieses Guthaben verfällt am
                30. Juni.
              </p>
            )}
            {mehrAbGrad2 && (
              <p style={{ marginBottom: 0 }}>
                Ab Pflegegrad 2 kommt oft noch deutlich mehr dazu. Das rechnen wir dir im
                Gespräch genau aus.
              </p>
            )}
          </>
        )}

        {fertig && grad === "keiner" && (
          <>
            <h3>Ohne Pflegegrad zahlt die Kasse noch nichts.</h3>
            <p style={{ marginBottom: 0 }}>
              Ein Antrag lohnt sich öfter, als die meisten denken. Wir sagen dir am Telefon
              ehrlich, ob es bei euch Sinn ergibt — und du kannst uns in der Zwischenzeit
              privat buchen.
            </p>
          </>
        )}

        {fertig && grad === "unbekannt" && (
          <>
            <h3>Das finden wir gemeinsam heraus.</h3>
            <p style={{ marginBottom: 0 }}>
              Ein Anruf bei der Pflegekasse genügt meistens. Wir sagen dir, was du fragen musst.
            </p>
          </>
        )}
      </div>

      {fertig && (
        <div className="stack-cta" style={{ marginTop: "var(--s6)" }}>
          <a className="btn btn-primary" href="#rueckruf">
            Rückruf anfordern
          </a>
          <a className="btn btn-outline" href="tel:+4989000000">
            089 — Nummer eintragen
          </a>
        </div>
      )}

      <p className="hint" style={{ marginTop: "var(--s6)", marginBottom: 0 }}>
        Das ist eine Schätzung, keine Zusage. Was wirklich für euch drin ist, prüfen wir im
        Gespräch mit der Pflegekasse.
      </p>
    </div>
  );
}
