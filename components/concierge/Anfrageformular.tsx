"use client";

import { useId, useState } from "react";
import { CURRENT_CUSTOMER_ID, createRequest, type Appointment } from "@/lib/concierge-data";

const ANLAESSE = ["Arzttermin", "Einkauf", "Spaziergang", "Sonstiges"] as const;

/**
 * Neue Anfrage — strukturiertes Formular, an das Familienmitglied gerichtet,
 * nicht an die betreute Person selbst. Kein Freitext-Chat: die Bühne (/lisa)
 * deckt das "sich unterhalten"-Gefühl schon ab, hier soll es schnell und
 * eindeutig gehen.
 *
 * Es gibt noch kein Backend — createRequest() legt die Anfrage nur für diese
 * Sitzung im Fixture ab (siehe lib/concierge-data.ts). Die Bestätigung ist
 * trotzdem ehrlich gemeint: das Formular tut, was es sagt, nur bleibt es
 * nicht über einen Neustart hinaus erhalten. Gleicher Ton wie
 * components/Rueckruf.tsx.
 */
export function Anfrageformular({ betreutePerson }: { betreutePerson: string }) {
  const gruppenName = useId();
  const [wann, setWann] = useState("");
  const [uhrzeit, setUhrzeit] = useState("");
  const [anlass, setAnlass] = useState<(typeof ANLAESSE)[number] | "">("");
  const [anlassSonstiges, setAnlassSonstiges] = useState("");
  const [notiz, setNotiz] = useState("");
  const [fehler, setFehler] = useState("");
  const [angelegt, setAngelegt] = useState<Appointment | null>(null);

  function absenden(e: React.FormEvent) {
    e.preventDefault();
    if (wann.trim().length === 0) {
      setFehler("Bitte trag ein, an welchem Tag es sein soll.");
      return;
    }
    if (uhrzeit.trim().length === 0) {
      setFehler("Bitte trag eine Uhrzeit ein.");
      return;
    }
    if (anlass === "") {
      setFehler("Bitte wähl aus, worum es geht.");
      return;
    }
    if (anlass === "Sonstiges" && anlassSonstiges.trim().length === 0) {
      setFehler("Bitte beschreib kurz, worum es geht.");
      return;
    }
    setFehler("");
    const termin = createRequest(CURRENT_CUSTOMER_ID, {
      datum: wann.trim(),
      uhrzeit,
      anlass: anlass === "Sonstiges" ? anlassSonstiges.trim() : anlass,
      notiz: notiz.trim() || undefined,
    });
    setAngelegt(termin);
  }

  if (angelegt) {
    return (
      <div className="card card-quiet" style={{ boxShadow: "none" }} role="status">
        <h3>Danke, angekommen!</h3>
        <p style={{ fontSize: 18 }}>
          {angelegt.datum}, {angelegt.anlass}, {angelegt.uhrzeit} Uhr — für {betreutePerson}.
        </p>
        <p style={{ marginBottom: 0, fontSize: 16, color: "var(--ink-70)" }}>
          Entwurfsseite — diese Bestätigung siehst nur du hier, sie erscheint noch nicht
          bei „Begleiterin finden" oder sonst irgendwo. Mit echtem Backend bekommt eure
          Begleiterin automatisch Bescheid und der Termin taucht überall auf.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={absenden} noValidate>
      <label className="field">Für wen</label>
      <p style={{ marginTop: 0 }}>{betreutePerson}</p>

      <label className="field" htmlFor="lisa-wann">
        An welchem Tag?
      </label>
      <input
        id="lisa-wann"
        type="text"
        value={wann}
        onChange={(e) => setWann(e.target.value)}
        placeholder="z. B. Dienstag"
      />

      <label className="field" htmlFor="lisa-uhrzeit">
        Um wie viel Uhr?
      </label>
      <input
        id="lisa-uhrzeit"
        type="time"
        value={uhrzeit}
        onChange={(e) => setUhrzeit(e.target.value)}
      />

      <fieldset style={{ border: 0, padding: 0, margin: "0 0 var(--s6)" }}>
        <legend className="field" style={{ padding: 0 }}>
          Worum geht es?
        </legend>
        <div className="lisa-anlass-gruppe">
          {ANLAESSE.map((a) => (
            <label key={a} className="lisa-anlass-option">
              <input
                type="radio"
                name={gruppenName}
                value={a}
                checked={anlass === a}
                onChange={() => setAnlass(a)}
              />
              {a}
            </label>
          ))}
        </div>
      </fieldset>

      {anlass === "Sonstiges" ? (
        <>
          <label className="field" htmlFor="lisa-anlass-frei">
            Kurz beschrieben
          </label>
          <input
            id="lisa-anlass-frei"
            type="text"
            value={anlassSonstiges}
            onChange={(e) => setAnlassSonstiges(e.target.value)}
            placeholder="z. B. Friseurtermin"
          />
        </>
      ) : null}

      <label className="field" htmlFor="lisa-notiz">
        Notiz (optional)
      </label>
      <textarea
        id="lisa-notiz"
        value={notiz}
        onChange={(e) => setNotiz(e.target.value)}
        placeholder="Alles, was die Begleiterin vorher wissen sollte."
      />

      {fehler && (
        <p role="alert" className="card card-rose" style={{ marginBottom: "var(--s6)", fontWeight: 500 }}>
          {fehler}
        </p>
      )}

      <button className="btn btn-primary" type="submit">
        Anfrage senden
      </button>
    </form>
  );
}
