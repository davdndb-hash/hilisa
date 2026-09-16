"use client";

import { useId, useState } from "react";
import { createRequest, type Appointment } from "@/lib/concierge-data";
import { browserClient } from "@/lib/supabase/client";

const ANLAESSE = ["Arzttermin", "Einkauf", "Spaziergang", "Sonstiges"] as const;

/**
 * Neue Anfrage — strukturiertes Formular, an das Familienmitglied gerichtet,
 * nicht an die betreute Person selbst. Kein Freitext-Chat: die Bühne (/lisa)
 * deckt das "sich unterhalten"-Gefühl schon ab, hier soll es schnell und
 * eindeutig gehen.
 *
 * Speichert jetzt echt in Supabase — die Anfrage erscheint danach auch bei
 * „Begleiterin finden". Was noch fehlt: eine automatische Nachricht an die
 * Begleiterin selbst (E-Mail/SMS/App) — das ist ein eigener, noch offener
 * Ausbauschritt, kein Bug hier.
 */
export function Anfrageformular({
  customerId,
  betreutePerson,
}: {
  customerId: string;
  betreutePerson: string;
}) {
  const gruppenName = useId();
  const [wann, setWann] = useState("");
  const [uhrzeit, setUhrzeit] = useState("");
  const [anlass, setAnlass] = useState<(typeof ANLAESSE)[number] | "">("");
  const [anlassSonstiges, setAnlassSonstiges] = useState("");
  const [notiz, setNotiz] = useState("");
  const [fehler, setFehler] = useState("");
  const [sendet, setSendet] = useState(false);
  const [angelegt, setAngelegt] = useState<Appointment | null>(null);

  async function absenden(e: React.FormEvent) {
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
    setSendet(true);
    try {
      const supabase = browserClient();
      const termin = await createRequest(supabase, customerId, {
        datum: wann.trim(),
        uhrzeit,
        anlass: anlass === "Sonstiges" ? anlassSonstiges.trim() : anlass,
        notiz: notiz.trim() || undefined,
      });
      setAngelegt(termin);
    } catch {
      setFehler("Das hat gerade nicht geklappt. Bitte nochmal versuchen.");
      setSendet(false);
    }
  }

  if (angelegt) {
    return (
      <div className="card card-quiet" style={{ boxShadow: "none" }} role="status">
        <h3>Danke, angekommen!</h3>
        <p style={{ fontSize: 18 }}>
          {angelegt.datum}, {angelegt.anlass}, {angelegt.uhrzeit} Uhr — für {betreutePerson}.
        </p>
        <p style={{ marginBottom: 0, fontSize: 16, color: "var(--ink-70)" }}>
          Gespeichert — der Termin erscheint jetzt auch bei „Begleiterin finden". Eure
          Begleiterin bekommt davon noch keine automatische Nachricht, das kommt mit
          einem späteren Ausbauschritt.
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

      <button className="btn btn-primary" type="submit" disabled={sendet}>
        {sendet ? "Wird gesendet …" : "Anfrage senden"}
      </button>
    </form>
  );
}
