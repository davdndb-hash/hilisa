"use client";

import { useId, useMemo, useState } from "react";
import { createRequest, type Appointment } from "@/lib/concierge-data";
import { browserClient } from "@/lib/supabase/client";
import { STATUS_TEXT, ZONE, dauerText, terminLang } from "@/lib/termine";
import { ZWEIGE } from "@/lib/zweige";

const ANLAESSE = ["Arzttermin", "Einkauf", "Spaziergang", "Sonstiges"] as const;

/** Mindestbuchung sind zwei Stunden (lib/zweige.ts, /privat, DB-Constraint). */
const DAUERN = [120, 180, 240, 300] as const;

/** Heute in Münchner Zeit als "2026-10-02" — die untere Grenze des Datumsfelds. */
function heuteInMuenchen(): string {
  // en-CA formatiert als JJJJ-MM-TT, genau das Format, das ein Datumsfeld
  // erwartet. Umweg über die Locale statt über toISOString(), weil letzteres
  // in UTC rechnet und spätabends schon den nächsten Tag anzeigen würde.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/**
 * Neue Anfrage — strukturiertes Formular, an das Familienmitglied gerichtet,
 * nicht an die betreute Person selbst. Kein Freitext-Chat: die Bühne (/lisa)
 * deckt das Gesprächsgefühl schon ab, hier soll es schnell und eindeutig
 * gehen.
 *
 * Tag und Uhrzeit waren bis zum 2.10.2026 freier Text („z. B. Dienstag").
 * Damit ließ sich nichts sortieren, nichts erinnern und keine Überschneidung
 * erkennen. Jetzt ein echtes Datum plus Dauer, das als Zeitpunkt in der
 * Datenbank landet.
 *
 * Was weiterhin fehlt: eine Nachricht an die Begleiterin. Die Anfrage wird
 * gespeichert und bekommt den Status „angefragt", aber niemand erfährt
 * automatisch davon — das braucht einen Versanddienst und die
 * Begleiterinnen-Ansicht.
 */
export function Anfrageformular({
  customerId,
  betreutePerson,
}: {
  customerId: string;
  betreutePerson: string;
}) {
  const gruppenName = useId();
  const [datum, setDatum] = useState("");
  const [uhrzeit, setUhrzeit] = useState("");
  const [dauer, setDauer] = useState<number>(120);
  const [anlass, setAnlass] = useState<(typeof ANLAESSE)[number] | "">("");
  const [anlassSonstiges, setAnlassSonstiges] = useState("");
  const [notiz, setNotiz] = useState("");
  const [fehler, setFehler] = useState("");
  const [sendet, setSendet] = useState(false);
  const [angelegt, setAngelegt] = useState<Appointment | null>(null);

  const heute = useMemo(heuteInMuenchen, []);
  const stundenpreis = Number(ZWEIGE.privat.zahl.replace(/[^\d]/g, ""));
  const summe = (dauer / 60) * stundenpreis;

  async function absenden(e: React.FormEvent) {
    e.preventDefault();
    if (datum === "") {
      setFehler("Bitte wähl einen Tag aus.");
      return;
    }
    if (datum < heute) {
      setFehler("Der Tag liegt in der Vergangenheit. Bitte wähl einen späteren.");
      return;
    }
    if (uhrzeit === "") {
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
        datum,
        uhrzeit,
        dauerMinuten: dauer,
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
          {angelegt.starts_at
            ? terminLang(angelegt.starts_at)
            : `${angelegt.datum}, ${angelegt.uhrzeit} Uhr`}
          {" — "}
          {angelegt.anlass}, {dauerText(angelegt.dauer_minuten)}
          {betreutePerson ? `, für ${betreutePerson}` : null}.
        </p>
        <p style={{ marginBottom: 0, fontSize: 16, color: "var(--ink-70)" }}>
          {STATUS_TEXT[angelegt.status].lang} Den Stand siehst du jederzeit unter
          „Begleiterin finden". Eine automatische Nachricht an die Begleiterin gibt es
          noch nicht — das kommt mit einem späteren Ausbauschritt.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={absenden} noValidate>
      <label className="field">Für wen</label>
      <p style={{ marginTop: 0 }}>
        {betreutePerson || (
          <span style={{ color: "var(--ink-55)" }}>
            Noch nicht eingetragen — im Profil nachtragen
          </span>
        )}
      </p>

      <label className="field" htmlFor="lisa-datum">
        An welchem Tag?
      </label>
      <input
        id="lisa-datum"
        type="date"
        min={heute}
        value={datum}
        onChange={(e) => setDatum(e.target.value)}
      />

      <label className="field" htmlFor="lisa-uhrzeit">
        Um wie viel Uhr?
      </label>
      <input
        id="lisa-uhrzeit"
        type="time"
        step={900}
        value={uhrzeit}
        onChange={(e) => setUhrzeit(e.target.value)}
      />

      <label className="field" htmlFor="lisa-dauer">
        Wie lange?
      </label>
      <select id="lisa-dauer" value={dauer} onChange={(e) => setDauer(Number(e.target.value))}>
        {DAUERN.map((d) => (
          <option key={d} value={d}>
            {dauerText(d)}
          </option>
        ))}
      </select>

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

      {/* Der Stundensatz kommt aus lib/zweige.ts und steht so auf /privat —
          hier wird nur gerechnet, nichts neu festgelegt. Die
          Anfahrtspauschale ist noch nicht entschieden und bleibt deshalb
          Platzhalter, nach derselben Regel wie die Nummer in
          lib/kontakt.ts. */}
      <div
        className="card card-quiet"
        style={{ boxShadow: "none", marginBottom: "var(--s6)" }}
        aria-live="polite"
      >
        <span className="label" style={{ marginBottom: 4 }}>
          Was das kostet
        </span>
        <p style={{ margin: 0, fontSize: 19, fontWeight: 700 }}>
          {dauerText(dauer)} × {stundenpreis} € = {summe.toLocaleString("de-DE")} €
        </p>
        <p style={{ margin: "var(--s2) 0 0", fontSize: 16, color: "var(--ink-70)" }}>
          Dazu kommt eine Anfahrtspauschale — Preis eintragen. Abgerechnet wird{" "}
          {ZWEIGE.privat.zahlText}.
        </p>
      </div>

      {fehler && (
        <p
          role="alert"
          className="card card-rose"
          style={{ marginBottom: "var(--s6)", fontWeight: 500 }}
        >
          {fehler}
        </p>
      )}

      <button className="btn btn-primary" type="submit" disabled={sendet}>
        {sendet ? "Wird gesendet …" : "Anfrage senden"}
      </button>
    </form>
  );
}
