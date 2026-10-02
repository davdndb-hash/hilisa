"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { browserClient } from "@/lib/supabase/client";

/**
 * Anmelden/Registrieren in einem Formular. E-Mail + Passwort — die
 * einfachste Option, die Supabase Auth ohne weitere Einrichtung anbietet.
 * Registrieren legt automatisch eine leere customers-Zeile an (Trigger in
 * der Datenbank, siehe Migration), das Formular selbst muss sich darum
 * nicht kümmern.
 */
export function Anmeldeformular() {
  const [modus, setModus] = useState<"anmelden" | "registrieren">("anmelden");
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [fehler, setFehler] = useState("");
  const [laedt, setLaedt] = useState(false);
  const [hinweis, setHinweis] = useState("");
  const router = useRouter();

  async function absenden(e: React.FormEvent) {
    e.preventDefault();
    setFehler("");
    setHinweis("");
    setLaedt(true);
    const supabase = browserClient();

    if (modus === "anmelden") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: passwort });
      setLaedt(false);
      if (error) {
        setFehler("E-Mail oder Passwort stimmt nicht.");
        return;
      }
      router.push("/lisa");
      router.refresh();
      return;
    }

    const { error, data } = await supabase.auth.signUp({ email, password: passwort });
    setLaedt(false);
    if (error) {
      setFehler(error.message.includes("Password") ? "Passwort braucht mindestens 6 Zeichen." : "Registrierung hat nicht geklappt.");
      return;
    }
    if (data.session) {
      router.push("/lisa");
      router.refresh();
      return;
    }
    setHinweis("Fast geschafft — bitte den Bestätigungslink in deiner E-Mail öffnen.");
  }

  return (
    <div className="lisa-anmelde-karte card">
      <div className="lisa-anmelde-avatar">
        <Image src="/marke/lisa-avatar.jpg" alt="" fill sizes="72px" style={{ objectFit: "cover" }} priority />
      </div>

      <span className="label center" style={{ display: "block" }}>
        Hi Lisa
      </span>
      <h1 style={{ fontSize: "clamp(22px, 4vw, 28px)", textAlign: "center", marginBottom: "var(--s2)" }}>
        {modus === "anmelden" ? "Schön, dass du wieder da bist" : "Willkommen bei Hi Lisa"}
      </h1>
      <p className="lead center" style={{ fontSize: 17, marginBottom: "var(--s6)" }}>
        {modus === "anmelden"
          ? "Melde dich an, um Begleiterin, Termine und Nachrichten zu sehen."
          : "Ein Konto reicht, um Anfragen zu stellen und mit eurer Begleiterin in Kontakt zu bleiben."}
      </p>

      <form onSubmit={absenden} noValidate>
        <label className="field" htmlFor="lisa-email">
          E-Mail
        </label>
        <input
          id="lisa-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="field" htmlFor="lisa-passwort">
          Passwort
        </label>
        <input
          id="lisa-passwort"
          type="password"
          autoComplete={modus === "anmelden" ? "current-password" : "new-password"}
          required
          minLength={6}
          value={passwort}
          onChange={(e) => setPasswort(e.target.value)}
        />

        {fehler && (
          <p role="alert" className="card card-rose" style={{ marginBottom: "var(--s6)", fontWeight: 500 }}>
            {fehler}
          </p>
        )}
        {hinweis && (
          <p role="status" className="card card-quiet" style={{ marginBottom: "var(--s6)" }}>
            {hinweis}
          </p>
        )}

        <button className="btn btn-primary" type="submit" disabled={laedt} style={{ width: "100%" }}>
          {laedt ? "Einen Moment …" : modus === "anmelden" ? "Anmelden" : "Konto erstellen"}
        </button>
      </form>

      <button
        type="button"
        className="lisa-anmelde-wechsel"
        onClick={() => {
          setModus((m) => (m === "anmelden" ? "registrieren" : "anmelden"));
          setFehler("");
          setHinweis("");
        }}
      >
        {modus === "anmelden" ? "Noch kein Konto? Registrieren" : "Schon ein Konto? Anmelden"}
      </button>
    </div>
  );
}
