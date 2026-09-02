"use client";

import { useState } from "react";

/**
 * Rückrufformular — bewusst drei Felder.
 *
 * TODO vor dem Livegang:
 *   1. An ein Postfach oder CRM anbinden (Route Handler unter app/api/rueckruf/route.ts).
 *   2. Spam-Schutz ohne Cookies ergänzen (z. B. Honeypot + Rate Limit serverseitig).
 *   3. Einwilligungstext mit der Datenschutzerklärung abstimmen.
 * Solange das nicht steht, sagt das Formular ehrlich, dass es noch nichts versendet.
 */

export default function Rueckruf() {
  const [name, setName] = useState("");
  const [fon, setFon] = useState("");
  const [zeit, setZeit] = useState("");
  const [gesendet, setGesendet] = useState(false);
  const [fehler, setFehler] = useState("");

  function absenden(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) {
      setFehler("Bitte trag deinen Namen ein, damit wir dich ansprechen können.");
      return;
    }
    if (fon.replace(/\D/g, "").length < 6) {
      setFehler("Bitte trag eine Telefonnummer ein, unter der wir dich erreichen.");
      return;
    }
    setFehler("");
    setGesendet(true);
  }

  return (
    <form onSubmit={absenden} noValidate>
      <label className="field" htmlFor="name">
        Dein Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Vor- und Nachname"
      />

      <label className="field" htmlFor="fon">
        Deine Telefonnummer
      </label>
      <input
        id="fon"
        name="fon"
        type="tel"
        autoComplete="tel"
        value={fon}
        onChange={(e) => setFon(e.target.value)}
        placeholder="Für den Rückruf"
      />

      <label className="field" htmlFor="zeit">
        Wann passt es dir?
      </label>
      <select id="zeit" name="zeit" value={zeit} onChange={(e) => setZeit(e.target.value)}>
        <option value="">Egal, ruft einfach an</option>
        <option value="vormittags">Vormittags</option>
        <option value="nachmittags">Nachmittags</option>
        <option value="abends">Nach 17 Uhr</option>
      </select>

      {fehler && (
        <p
          role="alert"
          className="card card-rose"
          style={{ marginBottom: "var(--s6)", fontWeight: 500 }}
        >
          {fehler}
        </p>
      )}

      <button className="btn btn-primary" type="submit">
        Rückruf anfordern
      </button>

      {gesendet && (
        <p
          role="status"
          className="card card-quiet"
          style={{ marginTop: "var(--s6)", marginBottom: 0, fontWeight: 500 }}
        >
          Entwurfsseite — dieses Formular versendet noch nichts. Ruf uns bitte direkt an
          unter 089 — Nummer eintragen. Vor dem Livegang wird das Formular an ein Postfach
          angebunden.
        </p>
      )}

      <p className="hint" style={{ marginTop: "var(--s6)", marginBottom: 0 }}>
        Wir nutzen deine Angaben nur für den Rückruf und geben sie nicht weiter.
      </p>
    </form>
  );
}
