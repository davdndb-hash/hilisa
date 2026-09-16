import type { Metadata } from "next";
import { ZurueckLink } from "@/components/concierge/ZurueckLink";
import { Chatverlauf } from "@/components/concierge/Chatverlauf";
import { getAssignedCompanion, listMessages } from "@/lib/concierge-data";
import { serverClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Chats" };

export default async function ChatsSeite() {
  const supabase = await serverClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const begleiterin = await getAssignedCompanion(supabase, user.id);
  const nachrichten = await listMessages(supabase, user.id);

  return (
    <div className="lisa-inhalt">
      <ZurueckLink />
      <h1 style={{ fontSize: "clamp(24px, 4vw, 30px)" }}>
        {begleiterin ? begleiterin.name : "Chats"}
      </h1>
      <Chatverlauf customerId={user.id} anfangsnachrichten={nachrichten} />
    </div>
  );
}
