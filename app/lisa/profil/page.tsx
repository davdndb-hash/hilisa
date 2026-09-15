import type { Metadata } from "next";
import Link from "next/link";
import { ZurueckLink } from "@/components/concierge/ZurueckLink";
import { CURRENT_CUSTOMER_ID, getAssignedCompanion, getCustomer } from "@/lib/concierge-data";

export const metadata: Metadata = { title: "Profil" };

/**
 * Konto der Familie — nicht der betreuten Person. Bewusst ohne
 * Pflegekasse-Status oder Budget: diese Baustelle (inkl. was passiert, wenn
 * das Kassenbudget im Monat aufgebraucht ist) ist noch offen, siehe
 * lib/concierge-data.ts. Rein lesend — Bearbeiten ergibt ohne Backend noch
 * keinen Sinn.
 */
export default function ProfilSeite() {
  const kunde = getCustomer(CURRENT_CUSTOMER_ID);
  const begleiterin = getAssignedCompanion(CURRENT_CUSTOMER_ID);

  return (
    <div className="lisa-inhalt">
      <ZurueckLink />
      <h1 style={{ fontSize: "clamp(24px, 4vw, 30px)" }}>Profil</h1>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--s4)" }}>
        <div>
          <span className="label" style={{ marginBottom: 2 }}>
            Name
          </span>
          <p style={{ margin: 0, fontSize: 19 }}>{kunde?.name ?? "—"}</p>
        </div>
        <div>
          <span className="label" style={{ marginBottom: 2 }}>
            Telefon
          </span>
          <p style={{ margin: 0, fontSize: 19 }}>{kunde?.telefon ?? "—"}</p>
        </div>
        <div>
          <span className="label" style={{ marginBottom: 2 }}>
            Betreute Person
          </span>
          <p style={{ margin: 0, fontSize: 19 }}>{kunde?.betreutePerson ?? "—"}</p>
        </div>
        <div>
          <span className="label" style={{ marginBottom: 2 }}>
            Begleiterin
          </span>
          {begleiterin ? (
            <p style={{ margin: 0, fontSize: 19 }}>
              {begleiterin.name} — <Link href="/lisa/begleiterin">Details ansehen</Link>
            </p>
          ) : (
            <p style={{ margin: 0, fontSize: 19, color: "var(--ink-55)" }}>Noch keine zugewiesen</p>
          )}
        </div>
      </div>

      <div className="card card-quiet" style={{ boxShadow: "none", marginTop: "var(--s6)" }}>
        <h3>Pflegekasse</h3>
        <p style={{ marginBottom: 0, fontSize: 17 }}>
          Kommt in einem späteren Schritt — inklusive der Frage, was passiert, wenn das
          Kassenbudget im Monat aufgebraucht ist.
        </p>
      </div>
    </div>
  );
}
