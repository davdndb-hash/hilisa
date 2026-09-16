import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/types";

/**
 * Supabase-Verbindung für Client-Komponenten (Browser). Nutzt den
 * veröffentlichbaren Schlüssel — sicher im Browser sichtbar, die
 * Row-Level-Security-Regeln in der Datenbank entscheiden, was jede
 * Nutzerin tatsächlich sehen oder schreiben darf.
 */
export function browserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
