import type { Metadata } from "next";
import { ZurueckLink } from "@/components/concierge/ZurueckLink";
import { Anfrageformular } from "@/components/concierge/Anfrageformular";
import { CURRENT_CUSTOMER_ID, getCustomer } from "@/lib/concierge-data";

export const metadata: Metadata = { title: "Neue Anfrage" };

export default function NeueAnfrageSeite() {
  const kunde = getCustomer(CURRENT_CUSTOMER_ID);

  return (
    <div className="lisa-inhalt">
      <ZurueckLink />
      <h1 style={{ fontSize: "clamp(24px, 4vw, 30px)" }}>Neue Anfrage</h1>
      <p className="lead" style={{ fontSize: 18 }}>
        Ein Termin, ein Anlass, eine Uhrzeit — mehr braucht Lisa erstmal.
      </p>
      <Anfrageformular betreutePerson={kunde?.betreutePerson ?? "—"} />
    </div>
  );
}
