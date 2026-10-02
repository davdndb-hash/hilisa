import type { Metadata } from "next";
import { ZurueckLink } from "@/components/concierge/ZurueckLink";
import { Begleiterinkarte, BegleiterinGesucht } from "@/components/concierge/Begleiterinkarte";
import { Terminliste } from "@/components/concierge/Terminliste";
import { getAssignedCompanion, getNextAppointment, listAppointments } from "@/lib/concierge-data";
import { serverClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Begleiterin finden" };

export default async function BegleiterinSeite() {
  const supabase = await serverClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const begleiterin = await getAssignedCompanion(supabase, user.id);
  const termin = begleiterin ? await getNextAppointment(supabase, user.id) : null;
  const termine = await listAppointments(supabase, user.id);

  return (
    <div className="lisa-inhalt">
      <ZurueckLink />
      <h1 style={{ fontSize: "clamp(24px, 4vw, 30px)" }}>Begleiterin finden</h1>
      {begleiterin ? (
        <Begleiterinkarte begleiterin={begleiterin} naechsterTermin={termin} />
      ) : (
        <BegleiterinGesucht />
      )}

      {/* Der Stand jeder einzelnen Anfrage. Bis zum 2.10.2026 war eine
          abgeschickte Anfrage von hier aus unsichtbar — man sah nur den
          nächsten Termin in der Karte oben, und auch nur, wenn schon eine
          Begleiterin zugewiesen war. */}
      <h2 style={{ fontSize: "clamp(20px, 3vw, 24px)", marginTop: "var(--s12)" }}>Eure Termine</h2>
      <Terminliste anfangsTermine={termine} />
    </div>
  );
}
