import type { Metadata } from "next";
import { ZurueckLink } from "@/components/concierge/ZurueckLink";
import { Chatverlauf } from "@/components/concierge/Chatverlauf";
import { CURRENT_CUSTOMER_ID, getAssignedCompanion, listMessages } from "@/lib/concierge-data";

export const metadata: Metadata = { title: "Chats" };

export default function ChatsSeite() {
  const begleiterin = getAssignedCompanion(CURRENT_CUSTOMER_ID);
  const nachrichten = listMessages(CURRENT_CUSTOMER_ID);

  return (
    <div className="lisa-inhalt">
      <ZurueckLink />
      <h1 style={{ fontSize: "clamp(24px, 4vw, 30px)" }}>
        {begleiterin ? begleiterin.name : "Chats"}
      </h1>
      <Chatverlauf anfangsnachrichten={nachrichten} />
    </div>
  );
}
