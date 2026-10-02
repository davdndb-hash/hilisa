"use client";

import { useState } from "react";
import { updateCustomer, type Customer } from "@/lib/concierge-data";
import { browserClient } from "@/lib/supabase/client";

/**
 * Die Familie trägt ihre eigenen Angaben ein.
 *
 * Bis zum 2.10.2026 war /lisa/profil nur eine Anzeige. Wer seinen Namen oder
 * die betreute Person eintragen wollte, konnte das gar nicht — es ging nur
 * über Personal oder direkt in der Datenbank. Entsprechend standen bei allen
 * vier Testkonten überall leere Felder.
 *
 * Bewusst nicht hier: die zugewiesene Begleiterin. Die darf nur Personal
 * ändern, dafür sorgt ein Trigger in der Datenbank — ein Feld anzubieten, das
 * beim Speichern eine Fehlermeldung wirft, wäre schlechter als keins.
 */
export function Profilformular({ kunde }: { kunde: Customer }) {
  const [name, setName] = useState(kunde.name);
  const [telefon, setTelefon] = useState(kunde.telefon);
  const [betreutePerson, setBetreutePerson] = useState(kunde.betreute_person);
  const [stand, setStand] = useState<"ruht" | "speichert" | "gespeichert" | "fehler">("ruht");

  const geaendert =
    name !== kunde.name ||
    telefon !== kunde.telefon ||
    betreutePerson !== kunde.betreute_person;

  async function speichern(e: React.FormEvent) {
    e.preventDefault();
    setStand("speichert");
    try {
      await updateCustomer(browserClient(), kunde.id, {
        name: name.trim(),
        telefon: telefon.trim(),
        betreute_person: betreutePerson.trim(),
      });
      setStand("gespeichert");
    } catch {
      setStand("fehler");
    }
  }

  return (
    <form onSubmit={speichern}>
      <label className="field" htmlFor="profil-name">
        Dein Name
      </label>
      <input
        id="profil-name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setStand("ruht");
        }}
        placeholder="Vor- und Nachname"
      />

      <label className="field" htmlFor="profil-telefon">
        Telefon
      </label>
      <input
        id="profil-telefon"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        value={telefon}
        onChange={(e) => {
          setTelefon(e.target.value);
          setStand("ruht");
        }}
        placeholder="Für Rückfragen zum Termin"
      />

      <label className="field" htmlFor="profil-betreute-person">
        Betreute Person
      </label>
      <input
        id="profil-betreute-person"
        type="text"
        value={betreutePerson}
        onChange={(e) => {
          setBetreutePerson(e.target.value);
          setStand("ruht");
        }}
        placeholder="Wen begleiten wir?"
      />
      <p className="hint">
        Wenn du für dich selbst buchst, trag hier deinen eigenen Namen ein.
      </p>

      <button className="btn btn-primary" type="submit" disabled={stand === "speichert" || !geaendert}>
        {stand === "speichert" ? "Wird gespeichert …" : "Änderungen speichern"}
      </button>

      {/* role="status" statt role="alert": eine gelungene Speicherung soll
          Vorleseprogramme nicht unterbrechen. Der Fehlerfall darunter schon. */}
      <p role="status" style={{ marginTop: "var(--s3)", marginBottom: 0, minHeight: 24 }}>
        {stand === "gespeichert" ? "Gespeichert." : null}
      </p>
      {stand === "fehler" && (
        <p role="alert" className="card card-rose" style={{ marginTop: "var(--s3)", fontWeight: 500 }}>
          Das hat gerade nicht geklappt. Bitte nochmal versuchen.
        </p>
      )}
    </form>
  );
}
