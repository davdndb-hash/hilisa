import type { Metadata } from "next";
import { ZurueckLink } from "@/components/concierge/ZurueckLink";
import { Anfrageformular } from "@/components/concierge/Anfrageformular";
import { getCustomer } from "@/lib/concierge-data";
import { serverClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Neue Anfrage" };

export default async function NeueAnfrageSeite() {
  const supabase = await serverClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const kunde = await getCustomer(supabase, user.id);

  return (
    <div className="lisa-inhalt">
      <ZurueckLink />
      <h1 style={{ fontSize: "clamp(24px, 4vw, 30px)" }}>Neue Anfrage</h1>
      <p className="lead" style={{ fontSize: 18 }}>
        Ein Termin, ein Anlass, eine Uhrzeit — mehr braucht Lisa erstmal.
      </p>
      <Anfrageformular customerId={user.id} betreutePerson={kunde?.betreute_person || "—"} />
    </div>
  );
}
