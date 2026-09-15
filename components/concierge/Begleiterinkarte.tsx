import Link from "next/link";
import type { Appointment, Companion } from "@/lib/concierge-data";

function Initialen({ name }: { name: string }) {
  const buchstabe = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <span className="lisa-initialen" aria-hidden="true">
      {buchstabe}
    </span>
  );
}

/**
 * Zeigt die zugewiesene Begleiterin. Kein echtes Foto — nur ein
 * Initialen-Kreis, bis es eins gibt (siehe Icons.tsx für denselben
 * Platzhalter-Gedanken bei fehlender Illustration).
 */
export function Begleiterinkarte({
  begleiterin,
  naechsterTermin,
}: {
  begleiterin: Companion;
  naechsterTermin: Appointment | null;
}) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--s4)" }}>
      <div style={{ display: "flex", gap: "var(--s4)", alignItems: "center" }}>
        <Initialen name={begleiterin.name} />
        <div>
          <h3 style={{ marginBottom: 2 }}>{begleiterin.name}</h3>
          <p style={{ margin: 0, fontSize: 16, color: "var(--ink-55)" }}>{begleiterin.seit}</p>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 18 }}>{begleiterin.kurzprofil}</p>

      {naechsterTermin ? (
        <div className="card card-quiet" style={{ boxShadow: "none" }}>
          <span className="label" style={{ marginBottom: 4 }}>
            Nächster Termin
          </span>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 19 }}>
            {naechsterTermin.datum}, {naechsterTermin.anlass}, {naechsterTermin.uhrzeit} Uhr
          </p>
          {naechsterTermin.notiz ? (
            <p style={{ margin: "var(--s2) 0 0", fontSize: 16, color: "var(--ink-70)" }}>
              {naechsterTermin.notiz}
            </p>
          ) : null}
        </div>
      ) : (
        <p style={{ margin: 0, color: "var(--ink-55)" }}>Noch kein Termin geplant.</p>
      )}

      <Link className="btn btn-primary" href="/lisa/chats" style={{ alignSelf: "flex-start" }}>
        Nachricht schreiben
      </Link>
    </div>
  );
}

/** Zustand, solange noch keine Begleiterin zugewiesen ist. */
export function BegleiterinGesucht() {
  return (
    <div className="card card-quiet" style={{ boxShadow: "none" }}>
      <h3>Wir suchen gerade die passende Begleiterin</h3>
      <p style={{ marginBottom: 0, fontSize: 18 }}>
        Sobald jemand feststeht, erscheint sie hier — mit Foto, Kurzprofil und dem
        nächsten Termin.
      </p>
    </div>
  );
}
