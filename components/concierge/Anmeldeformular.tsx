"use client";

import { useState } from "react";
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
    <form onSubmit={absenden} noValidate style={{ width: "100%", maxWidth: "26rem" }}>
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
        {modus === "anmelden" ? "Anmelden" : "Konto erstellen"}
      </button>

      <button
        type="button"
        className="lisa-tippen-btn"
        style={{ marginTop: "var(--s4)" }}
        onClick={() => {
          setModus((m) => (m === "anmelden" ? "registrieren" : "anmelden"));
          setFehler("");
          setHinweis("");
        }}
      >
        {modus === "anmelden" ? "Noch kein Konto? Registrieren" : "Schon ein Konto? Anmelden"}
      </button>
    </form>
  );
}
