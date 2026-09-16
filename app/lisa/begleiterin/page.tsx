import type { Metadata } from "next";
import { ZurueckLink } from "@/components/concierge/ZurueckLink";
import { Begleiterinkarte, BegleiterinGesucht } from "@/components/concierge/Begleiterinkarte";
import { getAssignedCompanion, getNextAppointment } from "@/lib/concierge-data";
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

  return (
    <div className="lisa-inhalt">
      <ZurueckLink />
      <h1 style={{ fontSize: "clamp(24px, 4vw, 30px)" }}>Begleiterin finden</h1>
      {begleiterin ? (
        <Begleiterinkarte begleiterin={begleiterin} naechsterTermin={termin} />
      ) : (
        <BegleiterinGesucht />
      )}
    </div>
  );
}
