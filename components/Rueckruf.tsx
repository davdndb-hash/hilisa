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

/* Kleine einfarbige Glyphen fürs Formularfeld — bewusst kein Kreis-Badge wie
   die Icons.tsx-Icons, die wären hier zu laut. Nur Dekoration, aria-hidden. */
function FeldIconPerson() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="5.5" r="3" stroke="var(--ink-55)" strokeWidth="1.5" />
      <path d="M3 16c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" stroke="var(--ink-55)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function FeldIconTelefon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M4 3.2c.4-.3 2-.6 2.4.2l.9 2c.2.5 0 1-.4 1.3l-1 .8c.6 1.6 1.9 2.9 3.5 3.5l.8-1c.3-.4.8-.6 1.3-.4l2 .9c.8.4.5 2 .2 2.4-.8 1-2 1.5-3.2 1.2-3.5-.9-6.4-3.8-7.3-7.3-.3-1.2.2-2.4 1.2-3.2z"
        stroke="var(--ink-55)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function FeldIconUhr() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6.5" stroke="var(--ink-55)" strokeWidth="1.5" />
      <path d="M9 5.5V9l3 1.8" stroke="var(--ink-55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
      <div className="field-icon-wrap">
        <FeldIconPerson />
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Vor- und Nachname"
        />
      </div>

      <label className="field" htmlFor="fon">
        Deine Telefonnummer
      </label>
      <div className="field-icon-wrap">
        <FeldIconTelefon />
        <input
          id="fon"
          name="fon"
          type="tel"
          autoComplete="tel"
          value={fon}
          onChange={(e) => setFon(e.target.value)}
          placeholder="Für den Rückruf"
        />
      </div>

      <label className="field" htmlFor="zeit">
        Wann passt es dir?
      </label>
      <div className="field-icon-wrap">
        <FeldIconUhr />
        <select id="zeit" name="zeit" value={zeit} onChange={(e) => setZeit(e.target.value)}>
          <option value="">Egal, ruft einfach an</option>
          <option value="vormittags">Vormittags</option>
          <option value="nachmittags">Nachmittags</option>
          <option value="abends">Nach 17 Uhr</option>
        </select>
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
