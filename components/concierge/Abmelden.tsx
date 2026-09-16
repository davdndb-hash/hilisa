"use client";

import { useRouter } from "next/navigation";
import { browserClient } from "@/lib/supabase/client";

export function Abmelden() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="btn btn-outline"
      onClick={async () => {
        await browserClient().auth.signOut();
        router.push("/lisa/anmelden");
        router.refresh();
      }}
    >
      Abmelden
    </button>
  );
}
