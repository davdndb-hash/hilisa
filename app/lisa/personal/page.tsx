import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ZurueckLink } from "@/components/concierge/ZurueckLink";
import { PersonalVerwaltung } from "@/components/concierge/PersonalVerwaltung";
import { istPersonal, listCompanions, listCustomersForStaff } from "@/lib/concierge-data";
import { serverClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Personal" };

/**
 * Interner Bereich für Hi-Lisa-Personal: Begleiterinnen anlegen und
 * Kundinnen zuweisen. Nicht in der Kunden-Navigation (Schiebemenue)
 * verlinkt — nur über die direkte URL erreichbar, wie /lisa/anmelden es
 * für nicht angemeldete Personen ist. Wer nicht in public.staff steht,
 * wird zur Bühne zurückgeschickt, nicht zur Anmeldung — die Person ist ja
 * angemeldet, ihr fehlt nur die Berechtigung.
 */
export default async function PersonalSeite() {
  const supabase = await serverClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const berechtigt = await istPersonal(supabase, user.id);
  if (!berechtigt) redirect("/lisa");

  const [kunden, begleiterinnen] = await Promise.all([
    listCustomersForStaff(supabase),
    listCompanions(supabase),
  ]);

  return (
    <div className="lisa-inhalt" style={{ maxWidth: 880 }}>
      <ZurueckLink />
      <h1 style={{ fontSize: "clamp(24px, 4vw, 30px)" }}>Personal</h1>
      <p className="lead" style={{ fontSize: 18 }}>
        Begleiterinnen anlegen und Kundinnen zuweisen.
      </p>
      <PersonalVerwaltung anfangsKunden={kunden} anfangsBegleiterinnen={begleiterinnen} />
    </div>
  );
}
