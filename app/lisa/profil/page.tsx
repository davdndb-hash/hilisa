import type { Metadata } from "next";
import Link from "next/link";
import { ZurueckLink } from "@/components/concierge/ZurueckLink";
import { Abmelden } from "@/components/concierge/Abmelden";
import { Profilformular } from "@/components/concierge/Profilformular";
import { getAssignedCompanion, getCustomer } from "@/lib/concierge-data";
import { serverClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Profil" };

/**
 * Konto der Familie — nicht der betreuten Person.
 *
 * Seit dem Pivot vom 23.09.2026 ist Hi Lisa für Kundinnen reiner
 * Selbstzahler-Dienst. Pflegekasse, Pflegegrad und Budget kommen hier
 * deshalb gar nicht mehr vor — nicht „später", sondern nicht mehr.
 * Enterprise (/fuer-betriebe) rechnet weiter mit der Kasse ab, das ist ein
 * eigener Zweig und nicht Teil dieser App.
 */
export default async function ProfilSeite() {
  const supabase = await serverClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const kunde = await getCustomer(supabase, user.id);
  const begleiterin = await getAssignedCompanion(supabase, user.id);

  return (
    <div className="lisa-inhalt">
      <ZurueckLink />
      <h1 style={{ fontSize: "clamp(24px, 4vw, 30px)" }}>Profil</h1>

      <div className="card" style={{ marginBottom: "var(--s6)" }}>
        {kunde ? (
          <Profilformular kunde={kunde} />
        ) : (
          <p style={{ margin: 0 }}>
            Dein Konto wird gerade angelegt. Lad die Seite in einem Moment noch einmal.
          </p>
        )}
      </div>

      {/* Zwei Angaben, die die Familie nicht selbst ändern kann: die E-Mail
          gehört zur Anmeldung, die Begleiterin weist Hi Lisa zu. */}
      <div
        className="card card-quiet"
        style={{ boxShadow: "none", display: "flex", flexDirection: "column", gap: "var(--s4)" }}
      >
        <div>
          <span className="label" style={{ marginBottom: 2 }}>
            E-Mail
          </span>
          <p style={{ margin: 0, fontSize: 19 }}>{user.email}</p>
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
            <p style={{ margin: 0, fontSize: 19, color: "var(--ink-55)" }}>
              Noch keine zugewiesen
            </p>
          )}
        </div>
      </div>

      <div style={{ marginTop: "var(--s6)" }}>
        <Abmelden />
      </div>
    </div>
  );
}
