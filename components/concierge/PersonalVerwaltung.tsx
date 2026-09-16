"use client";

import { useState } from "react";
import {
  assignCompanion,
  createCompanion,
  type Companion,
  type Customer,
} from "@/lib/concierge-data";
import { browserClient } from "@/lib/supabase/client";

function Kundenzeile({
  kunde,
  begleiterinnen,
}: {
  kunde: Customer;
  begleiterinnen: Companion[];
}) {
  const [wert, setWert] = useState(kunde.assigned_companion_id ?? "");
  const [status, setStatus] = useState<"ruhig" | "speichert" | "gespeichert" | "fehler">("ruhig");

  async function geaendert(neu: string) {
    setWert(neu);
    setStatus("speichert");
    try {
      const supabase = browserClient();
      await assignCompanion(supabase, kunde.id, neu || null);
      setStatus("gespeichert");
    } catch {
      setStatus("fehler");
    }
  }

  return (
    <tr>
      <td style={{ padding: "var(--s3) var(--s2)", borderBottom: "1px solid var(--rule-soft)" }}>
        <div>{kunde.email}</div>
        {kunde.betreute_person ? (
          <div style={{ fontSize: 15, color: "var(--ink-55)" }}>für {kunde.betreute_person}</div>
        ) : null}
      </td>
      <td style={{ padding: "var(--s3) var(--s2)", borderBottom: "1px solid var(--rule-soft)" }}>
        <select value={wert} onChange={(e) => geaendert(e.target.value)} style={{ margin: 0 }}>
          <option value="">— keine —</option>
          {begleiterinnen.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </td>
      <td style={{ padding: "var(--s3) var(--s2)", borderBottom: "1px solid var(--rule-soft)", fontSize: 15 }}>
        {status === "speichert" && "speichert …"}
        {status === "gespeichert" && "gespeichert"}
        {status === "fehler" && <span style={{ color: "#8d2b6b" }}>fehlgeschlagen</span>}
      </td>
    </tr>
  );
}

function NeueBegleiterin({ onAngelegt }: { onAngelegt: (b: Companion) => void }) {
  const [name, setName] = useState("");
  const [seit, setSeit] = useState("");
  const [kurzprofil, setKurzprofil] = useState("");
  const [fehler, setFehler] = useState("");
  const [sendet, setSendet] = useState(false);

  async function absenden(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length === 0) {
      setFehler("Bitte einen Namen eintragen.");
      return;
    }
    setFehler("");
    setSendet(true);
    try {
      const supabase = browserClient();
      const neu = await createCompanion(supabase, {
        name: name.trim(),
        seit: seit.trim(),
        kurzprofil: kurzprofil.trim(),
      });
      onAngelegt(neu);
      setName("");
      setSeit("");
      setKurzprofil("");
    } catch {
      setFehler("Anlegen hat nicht geklappt.");
    } finally {
      setSendet(false);
    }
  }

  return (
    <form onSubmit={absenden} className="card" style={{ marginTop: "var(--s9)" }}>
      <h3>Neue Begleiterin</h3>
      <label className="field" htmlFor="pv-name">
        Name
      </label>
      <input id="pv-name" type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label className="field" htmlFor="pv-seit">
        Seit wann
      </label>
      <input
        id="pv-seit"
        type="text"
        value={seit}
        onChange={(e) => setSeit(e.target.value)}
        placeholder="z. B. September 2026"
      />

      <label className="field" htmlFor="pv-kurzprofil">
        Kurzprofil
      </label>
      <textarea id="pv-kurzprofil" value={kurzprofil} onChange={(e) => setKurzprofil(e.target.value)} />

      {fehler && (
        <p role="alert" className="card card-rose" style={{ marginBottom: "var(--s6)" }}>
          {fehler}
        </p>
      )}

      <button className="btn btn-primary" type="submit" disabled={sendet}>
        {sendet ? "Wird angelegt …" : "Begleiterin anlegen"}
      </button>
    </form>
  );
}

export function PersonalVerwaltung({
  anfangsKunden,
  anfangsBegleiterinnen,
}: {
  anfangsKunden: Customer[];
  anfangsBegleiterinnen: Companion[];
}) {
  const [begleiterinnen, setBegleiterinnen] = useState(anfangsBegleiterinnen);

  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "var(--s6)" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "var(--s2)" }}>Kundin</th>
              <th style={{ textAlign: "left", padding: "var(--s2)" }}>Begleiterin</th>
              <th style={{ textAlign: "left", padding: "var(--s2)" }}></th>
            </tr>
          </thead>
          <tbody>
            {anfangsKunden.map((k) => (
              <Kundenzeile key={k.id} kunde={k} begleiterinnen={begleiterinnen} />
            ))}
          </tbody>
        </table>
      </div>
      {anfangsKunden.length === 0 && <p style={{ color: "var(--ink-55)" }}>Noch keine Kundinnen.</p>}

      <NeueBegleiterin onAngelegt={(b) => setBegleiterinnen((bisherige) => [...bisherige, b])} />
    </div>
  );
}
