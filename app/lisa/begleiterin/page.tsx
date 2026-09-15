import type { Metadata } from "next";
import { ZurueckLink } from "@/components/concierge/ZurueckLink";
import { Begleiterinkarte, BegleiterinGesucht } from "@/components/concierge/Begleiterinkarte";
import {
  CURRENT_CUSTOMER_ID,
  getAssignedCompanion,
  getNextAppointment,
} from "@/lib/concierge-data";

export const metadata: Metadata = { title: "Begleiterin finden" };

export default function BegleiterinSeite() {
  const begleiterin = getAssignedCompanion(CURRENT_CUSTOMER_ID);
  const termin = getNextAppointment(CURRENT_CUSTOMER_ID);

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
